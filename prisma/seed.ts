import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "mysql://root:uleywkvWxQaWImMlHYZkkIPQDFooKwXv@altaria.proxy.rlwy.net:40321/railway";

async function main() {
  console.log("Seeding database...");

  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        name: "Master Admin",
        email: adminEmail,
        password: hashedPassword,
        role: Role.MASTER_ADMIN,
        active: true,
      },
    });
    console.log("Master Admin created successfully.");
  } else {
    console.log("Master Admin already exists. Skipping.");
  }

  const defaultSettings = [
    { key: "site_name", value: "The Himalayan Shire", type: "string", group: "general" },
    { key: "site_logo", value: "/images/logo2.jpg", type: "string", group: "general" },
    { key: "site_favicon", value: "/favicon.ico", type: "string", group: "general" },
    { key: "site_email", value: "himalayanshire@gmail.com", type: "string", group: "contact" },
    { key: "site_phone", value: "+91 81698 98066", type: "string", group: "contact" },
    { key: "site_phone2", value: "+91 95184 18833", type: "string", group: "contact" },
    { key: "site_address", value: "Pagey, near Kalpa, Kinnaur, Himachal Pradesh, India", type: "string", group: "contact" },
    { key: "whatsapp_url", value: "https://wa.me/918169898066", type: "string", group: "contact" },
    { key: "instagram_url", value: "#", type: "string", group: "social" },
    { key: "facebook_url", value: "#", type: "string", group: "social" },
    { key: "youtube_url", value: "#", type: "string", group: "social" },
    { key: "google_analytics_id", value: "", type: "string", group: "seo" },
    { key: "meta_pixel_id", value: "", type: "string", group: "seo" },
    { key: "seo_title", value: "The Himalayan Shire — A Quiet Heritage Retreat in the Himalayas", type: "string", group: "seo" },
    { key: "seo_description", value: "A serene countryside escape in Pagey, near Kalpa. Surrounded by apple orchards, pine forests, and the Kinnaur Kailash range.", type: "string", group: "seo" },
  ];

  for (const setting of defaultSettings) {
    const existing = await prisma.setting.findUnique({
      where: { key: setting.key },
    });
    if (!existing) {
      await prisma.setting.create({
        data: setting as any,
      });
    }
  }
  console.log("Settings seeded.");

  const homepageSections = [
    { section: "hero", data: JSON.stringify({ eyebrow: "A boutique mountain stay in the Kinnaur Himalayas", headline: "The Himalayan Shire — a quiet place to rest, breathe, and stay.", sub: "A family-run retreat in Pagey, near Kalpa. Seven warm rooms, an in-house kitchen, and the Kailash range at the end of the orchard road.", primaryCtaLabel: "Book Your Stay", primaryCtaHref: "https://letsbook.me/booking/thehimalayanshire?checkin=2026-08-04&checkout=2026-08-05&adults=2&children=0", secondaryCtaLabel: "Take the Virtual Walkthrough", secondaryCtaHref: "#walkthrough" }) },
    { section: "about", data: JSON.stringify({ title: "A Heritage Mountain Retreat", description: "A family-run retreat in Pagey, near Kalpa. Seven warm rooms, an in-house kitchen, and the Kailash range at the end of the orchard road.", image: "/images/about.jpg" }) },
    { section: "services", data: JSON.stringify([]) },
    { section: "features", data: JSON.stringify([]) },
    { section: "testimonials", data: JSON.stringify([]) },
    { section: "footer", data: JSON.stringify({ copyright: "© 2026 The Himalayan Shire. All rights reserved.", socials: [{ label: "Instagram", href: "#" }, { label: "Facebook", href: "#" }, { label: "YouTube", href: "#" }] }) },
  ];

  for (const section of homepageSections) {
    const existing = await prisma.homepageContent.findUnique({
      where: { section: section.section },
    });
    if (!existing) {
      await prisma.homepageContent.create({
        data: section as any,
      });
    }
  }
  console.log("Homepage content seeded.");

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });