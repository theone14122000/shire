import type { Metadata } from "next";
import { contactMetadata } from "../metadata";
import ContactPageContent from "./ContactPageContent";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return contactMetadata();
}

export default function ContactPage() {
  return <ContactPageContent />;
}
