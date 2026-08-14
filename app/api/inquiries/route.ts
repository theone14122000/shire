import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const INQUIRY_TO_EMAIL = "himalayanashire@gmail.com";

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  phone: z.string().trim().min(1, "Phone number is required"),
  email: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || "")
    .refine((value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
      message: "Email address is invalid",
    }),
  checkInDate: z.string().trim().min(1, "Check-in date is required"),
  checkOutDate: z.string().trim().min(1, "Check-out date is required"),
  adults: z.coerce.number().int().min(1, "At least one adult is required"),
  children: z.coerce.number().int().min(0, "Children cannot be negative"),
});

export async function POST(req: NextRequest) {
  let payload: unknown;

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please complete all required fields.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const inquiry = parsed.data;
  const message = formatInquiryMessage(inquiry);

  try {
    await prisma.contactMessage.create({
      data: {
        name: inquiry.name,
        email: inquiry.email || "",
        subject: "Website inquiry form",
        message,
      },
    });
  } catch (error) {
    console.error("inquiries: contactMessage create failed:", error);
  }

  const emailResult = await sendInquiryEmail({
    to: INQUIRY_TO_EMAIL,
    replyTo: inquiry.email || undefined,
    subject: `Website inquiry from ${inquiry.name}`,
    text: message,
  });

  if (!emailResult.sent) {
    return NextResponse.json(
      {
        error: emailResult.reason,
        delivered: false,
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}

function formatInquiryMessage(inquiry: z.infer<typeof inquirySchema>) {
  return [
    "New website inquiry",
    "",
    `Name: ${inquiry.name}`,
    `Phone: ${inquiry.phone}`,
    `Email: ${inquiry.email || "Not provided"}`,
    `Check-in date: ${inquiry.checkInDate}`,
    `Check-out date: ${inquiry.checkOutDate}`,
    `Adults (8 yrs and above): ${inquiry.adults}`,
    `Children (7 yrs and below): ${inquiry.children}`,
  ].join("\n");
}

async function sendInquiryEmail({
  to,
  replyTo,
  subject,
  text,
}: {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
}): Promise<{ sent: true } | { sent: false; reason: string }> {
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const resendKey = process.env.RESEND_API_KEY;

  if (smtpUser && smtpPassword) {
    return sendViaSmtp({ to, replyTo, subject, text, smtpUser, smtpPassword });
  }

  if (resendKey) {
    return sendViaResend({ to, replyTo, subject, text, resendKey });
  }

  return {
    sent: false,
    reason:
      "Email delivery is not configured. Set SMTP_USER + SMTP_PASSWORD (or RESEND_API_KEY) to send inquiry emails.",
  };
}

async function sendViaSmtp({
  to,
  replyTo,
  subject,
  text,
  smtpUser,
  smtpPassword,
}: {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  smtpUser: string;
  smtpPassword: string;
}): Promise<{ sent: true } | { sent: false; reason: string }> {
  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: { user: smtpUser, pass: smtpPassword },
  });

  try {
    await transporter.sendMail({
      from: `The Himalayan Shire <${smtpUser}>`,
      to,
      replyTo,
      subject,
      text,
    });
    return { sent: true };
  } catch (error) {
    return {
      sent: false,
      reason:
        error instanceof Error ? `Email delivery failed: ${error.message}` : "Email delivery failed.",
    };
  }
}

async function sendViaResend({
  to,
  replyTo,
  subject,
  text,
  resendKey,
}: {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  resendKey: string;
}): Promise<{ sent: true } | { sent: false; reason: string }> {
  const from = process.env.INQUIRY_FROM_EMAIL || "The Himalayan Shire <onboarding@resend.dev>";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
        reply_to: replyTo,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return {
        sent: false,
        reason: `Email provider rejected the inquiry: ${detail}`,
      };
    }

    return { sent: true };
  } catch (error) {
    return {
      sent: false,
      reason: error instanceof Error ? error.message : "Email delivery failed.",
    };
  }
}
