"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SiteNav } from "../../components/SiteNav";

const SECTIONS = [
  {
    heading: "Panoramic Views",
    body: "While you might think that 'good views' is a selling point of a lot of hill stations, and that you can see views from Shimla itself, so why travel another 20kms to reach Fagu? Well if we have mentioned good views at the top of the list, it is with good reason. Fagu is located at 7500 ft above sea level and you know the higher you go the better views you get. On a clear day, the snow capped peaks of Greater Himalayas, the ones above 18-20k feet can be seen from Fagu. While in Fagu you feel at the top and all other hills the vast valleys are all below you and you get a very clear panoramic view all around. Most homestays or other tourist accommodations in Fagu are not very tightly packed and most have their own attached orchard space. So like The Himalayan Shire, in Fagu the view you get from your room itself will not be interrupted by other buildings or trees or electricity wire and you just get a very clear view from the room itself.",
  },
  {
    heading: "Green",
    body: "Fagu is a town in rural area, and it will give you a proper feel of Himachali countryside. Ditch the concrete jungle of Shimla and hotel culture of Kufri to experience local Himachali villages. Fagu is a very sweet spot as it is right on the main National Highway, very close to a developed city of Shimla with all amenities, hospitals and markets but in itself it is very quiet, very green and makes you feel like you are deep in pure nature. While commercialization is catching up in Fagu, it is still very peaceful and not densely populated as yet. Surrounded by dense forest of the majestic Deodar trees and Kail trees, a walk in the forests will rejuvenate you and make you feel so close to mother earth.",
  },
  {
    heading: "Easy Access",
    body: "Fagu is very approachable from Chandigarh, Delhi, Punjab and Haryana. Being so close to Shimla, you have a variety of transport modes to choose from. There is an Airport in Shimla with daily flights. From the Airport you can take a cab to Fagu. It will be a drive of about 2 hours and depending on the season and the number of pax, the cab will charge you somewhere around Rs. 2-3k.\n\nSecond option is to come by train or bus to Shimla and take a cab from there. From Shimla bus stand it's a drive of 1 hour and cab charges anywhere between 1500-2500 as of 2024. There are direct overnight volvo buses from Delhi to Shimla. You can also take the local bus from Shimla ISBT to Fagu, but you might have to check the timings for that local bus. Though some travelers do have it on their bucket list to travel in HRTC buses because it's an experience of its own.\n\nBut the mode we suggest is, unless of course you are driving in your personal vehicle, for tourists coming from far off like Mumbai or Bangalore, best is to book a flight to Chandigarh, and take a private cab from Chandigarh to Fagu. The driving distance is around 3.5-4 hrs and charges range from 3.5-5k depending on season and number of pax. But that will be the fastest way, although it might cost a bit more.",
  },
  {
    heading: "Lovely Accommodations",
    body: "Fagu has some really unique places to stay for all budget. We suggest that when you are travelling to the mountains, ditch the cliched hotel for a more unique stay like The Himalayan Shire. Starting from the lower budget of Rs. 2000-3000 per day, you can find various homestays like Vishisht homestay, which is built right in the middle of an apple orchard. Has plenty of parking space and is easy to reach. It's run by a local villager couple and you will not find anything lacking in their hospitality. They have really good views from the room and offer basic amenities.\n\nIf you are looking for a more comfortable, luxurious property then The Himalayan Shire offers a very unique stay. You can find all the amenities listed on our website, but we offer a comfort of a home, the vibe of a heritage cum modern mountain property, amenities more than what most hotels offer these days and hospitality of a 5 star hotel. Other than just offering a room like a hotel, we offer plenty of cozy corners and wide spaces to play around or sit and relax. Staying for a day or two will leave you wanting to stay longer to explore each part of the property.\n\nIf you are willing to spend even more, upward of 10k per night, then there are unique dome stays in Fagu area as well, like the GlamoHome or GalmoReo. They offer very unique dome tent stays with luxurious interiors and top class amenities.\n\nSo Fagu has a place for all kinds of travelers. If you go in more off beat places, you might find more raw accommodations but you will definitely find them lacking in amenities or hospitality, but Fagu offers a mix of both, unique spacious stays but without compromising on hospitality or amenities.",
  },
  {
    heading: "Peace and Calm",
    body: "Most people travel to hills for peace and quiet. But unfortunately main stream towns and hill stations have become overcrowded. You will be stuck in jams most of the times and can hear the honking all day. It's hard to find a peaceful quiet place to sit and relax while enjoying the cool breeze or with a view in front of you. Fagu offers just that. It is not densely populated. You will hardly hear any honking or any sound other than the breeze or the birds. You can find many many spots where you can be alone and enjoy the amazing views. Where you truly feel you have come to the mountains and have a moment to connect with nature.",
  },
];

export default function WhyChooseFaguPage() {
  return (
    <main className="min-h-screen bg-[#f4faf5] font-sans text-black">
      <SiteNav />

      <article className="mx-auto max-w-4xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <Link href="/blog" className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 transition-colors hover:text-black">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-1"><path d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Back to Blog
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800">Destination</span>
          <h1 className="mt-4 font-display text-3xl font-black leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl">
            Why Should You Choose Fagu for Your Next Holiday Destination
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
            <span className="font-bold text-emerald-800">Rishabh Goel</span>
            <span>·</span>
            <span>Jul 30, 2024</span>
            <span>·</span>
            <span>7 min read</span>
          </div>
        </motion.div>

        {/* Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-200 via-green-100 to-emerald-300 shadow-lg"
        >
          <div className="relative flex aspect-[16/9] items-center justify-center">
            {/* Replace with <Image> when you add the file to /public/images/ */}
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
              </span>
              <p className="text-sm font-bold text-emerald-900">Image Placeholder</p>
              <p className="text-xs text-emerald-800/60">Add your image to /public/images/</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-10 space-y-5 text-base leading-8 text-neutral-800 sm:text-lg">
          <p>Fagu is a small town on the Shimla-Narkanda national highway. Fagu is just 5kms ahead of Kufri, and 20kms from Shimla (about 40 mins drive). You see some 6-7 small shops on both sides of the road and you know you have reached Fagu. Here are the reasons why you should definitely put Fagu on your travel list.</p>
        </motion.div>

        <div className="mt-12 space-y-10">
          {SECTIONS.map((section, idx) => (
            <motion.div
              key={section.heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="border-l-4 border-emerald-500 pl-6"
            >
              <h2 className="font-display text-xl font-black text-black sm:text-2xl">{section.heading}</h2>
              {section.body.split("\n\n").map((para, pIdx) => (
                <p key={pIdx} className="mt-3 text-base leading-8 text-neutral-800 sm:text-lg">{para}</p>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 text-center">
          <Link href="/#book" className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-xl">
            Book Your Stay at Fagu
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" /></svg>
          </Link>
        </motion.div>
      </article>
    </main>
  );
}