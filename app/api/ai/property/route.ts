/**
 * GET /api/ai/property
 *
 * Public, read-only, machine-readable description of The Himalayan Shire for
 * search engines, AI crawlers and other tools that want structured facts
 * about the property.
 *
 * Design rules:
 *   - Only public, already-published information (no admin, no customer data,
 *     no credentials, no unpublished content).
 *   - Room data comes from the CMS-backed merge (lib/room-content), i.e. the
 *     CMS stays the source of truth; static fallback if the DB is unreachable.
 *   - No prices, availability, awards or reviews are invented — none exist in
 *     the CMS, so none are exposed.
 *   - Cheap: two lightweight reads, no LLM calls, CDN cacheable.
 */

import { NextResponse } from "next/server";
import { FAQS } from "@/lib/faq";
import { getMergedRooms } from "@/lib/room-content";
import { rooms as staticRooms } from "@/lib/rooms";
import {
  amenityFeature,
  geo,
  nearbyPlaces,
  officialPages,
  property,
} from "@/lib/property";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET() {
  // CMS overlay with graceful degradation — never fail the endpoint.
  let roomList = staticRooms;
  try {
    roomList = await getMergedRooms();
  } catch {
    // DB unreachable: fall back to the published static room definitions.
  }

  const payload = {
    // Identity
    name: property.name,
    alternateName: property.alternateName,
    propertyType: property.propertyType,
    description: property.description,
    tagline: property.tagline,

    // Location
    location: {
      locality: property.addressParts.addressLocality,
      region: property.addressParts.addressRegion,
      country: "India",
      countryCode: property.addressParts.addressCountry,
      postalCode: property.addressParts.postalCode,
      streetAddress: property.addressParts.streetAddress,
      formattedAddress: property.address,
      geo: { latitude: geo.latitude, longitude: geo.longitude },
      altitude: property.altitude,
      distances: nearbyPlaces.map((place) => ({
        place: place.name,
        relation: place.relation,
      })),
      mapUrl: property.mapsUrl,
    },

    // Accommodation — CMS-backed, public rooms only
    roomCount: property.roomCount,
    rooms: roomList.map((room) => ({
      name: room.name,
      slug: room.slug,
      url: `${officialPages.home.replace(/\/$/, "")}/rooms/${room.slug}`,
      category: room.category,
      size: room.size,
      view: room.view,
      floor: room.floor,
      description: room.description,
      facilities: room.facilities,
      images: room.images,
    })),
    wholePropertyBooking: {
      available: true,
      description:
        "The entire property (all seven bedrooms) can be booked as a private villa for families and groups.",
      url: officialPages.privateVilla,
    },

    // Amenities (site-wide, published)
    amenities: amenityFeature.map((feature) => feature.name),

    // Policies
    policies: [
      {
        topic: "Pet policy",
        summary:
          "Pets allowed with pre-approval. Pets up to 6 kg generally welcome; larger breeds allowed when booking the entire villa or on low-occupancy days. Guests sign the pet policy at check-in. Fee: Rs. 500 per day.",
        urls: [officialPages.petPolicy, officialPages.petFriendlyStay],
      },
      {
        topic: "Parking",
        summary:
          "Drive-in property with private parking for up to 10 SUVs on a metalled road.",
      },
      {
        topic: "Housekeeping",
        summary:
          "Daily cleaning between 11am and 5pm; bedsheet change every alternate day (earlier changes may incur a cleaning fee).",
      },
      {
        topic: "Kitchen access",
        summary:
          "Kitchen is not generally accessible to guests; a kettle, microwave and hot plate are provided outside the kitchen.",
      },
    ],

    // Booking & contact
    bookingUrl: property.bookingUrl,
    officialWebsite: property.url,
    contact: {
      email: property.email,
      phone: property.phones,
      whatsapp: property.whatsapp,
      enquiryForm: officialPages.contact,
    },
    socialProfiles: property.socials,

    // AI-readable resources
    officialPages,
    faqs: FAQS.map((faq) => ({ question: faq.question, answer: faq.answerText })),

    // Provenance
    lastReviewed: new Date().toISOString(),
    disclaimers: [
      "Factual reference only. Prices, live availability and confirmations are not provided here — use the booking URL or enquiry form.",
      "Distances are as published by the property (Fagu-relative); travel times vary with road and weather conditions.",
    ],
  };

  return NextResponse.json(payload, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
