"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SiteNav } from "../../components/SiteNav";

const SECTIONS = [
  {
    heading: "Home Away from Home",
    body: "At The Himalayan Shire, our aim is to make sure that everyone who comes at the Shire feels connected to the place. That, when they go back they don't think of it as just any regular hotel they stayed in, rather they go back with cherished memories of the place and a longing to return back soon. We do our best to make the guests feel at home and try not to have to say 'no' to any of their requests or demands. Our food is loved by all and if you go through our reviews you would definitely find a mention of our food being really nice and healthy.",
  },
  {
    heading: "Unmatched Scenic Beauty",
    body: "It is an east facing property which means if you are staying in one of our deluxe or premium rooms, you can enjoy the beautiful sunrise right from your bed. As the first lights of dawn, sieve through the night's darkness, you see so many colors in the sky as they slowly change hue as the sun rises from behind the mountains. Surrounded by apple orchards on all sides, and dense jungles just a walk away from the property, you will truly feel one with nature and experience the true Himalayan countryside. We have a very clear and uninterrupted view of the greater Himalayas and the valley in front of us.",
  },
  {
    heading: "A Haven of Quiet and Calm",
    body: "We are located 2kms away from the highway, and away from the noise. When you are here, you feel that you have come to a very off beat destination but just a 5 minutes drive will take you back to the bustling highway and the town market. You can hear nothing but the sweet chirping of birds throughout the day. It's an ideal getaway for anyone looking to take a breather from their hectic lifestyle. A great place for writer's retreat and authors to come and find the perfect environment to come up with some creative ideas.",
  },
  {
    heading: "The Common Areas",
    body: "When you book a stay at The Himalayan Shire, you are not just paying for the room. We have lots of common spaces, sitting areas for you to enjoy at the property. An approx 100sqft lawn area with a covered seating area is the place most people like to sit to soak in the sun and breathe fresh air outdoors. We have a low height Himachali style seating complete with a sigdi (indoor firewood heater). The entire 2nd floor is a big hall where guests spend most of their time. Whether you want to play a game of Table Tennis or slouch on the sofa as you watch a movie on our 65 inch smart TV or your whole group wants to gather together for a party, the second floor recreational area has it all. It also has an attached balcony with a two seater swing that overlooks the apple orchards on one side and the panoramic mountain ranges on the other.",
  },
];

export default function WhyChooseShirePage() {
  return (
    <main className="min-h-screen bg-[#f4faf5] font-sans text-black">
      <SiteNav />

      <article className="mx-auto max-w-4xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <Link href="/blog" className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 transition-colors hover:text-black">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-1"><path d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Back to Blog
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800">About Us</span>
          <h1 className="mt-4 font-display text-3xl font-black leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl">
            Why Choose The Himalayan Shire
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
            <span className="font-bold text-emerald-800">Rishabh Goel</span>
            <span>·</span>
            <span>Jul 30, 2024</span>
            <span>·</span>
            <span>6 min read</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-10 space-y-5 text-base leading-8 text-neutral-800 sm:text-lg">
          <p>When planning your Himalayan adventure, the choice of accommodation can make all the difference. Some travelers seek only a decent budgeted room to stay the night and do not really care about the hospitality provided or the space outside of the rooms. But most travelers want an overall experience. They look for properties that are a complete package in themselves. The Himalayan Shire, Fagu is exactly for such travelers.</p>
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
              <p className="mt-3 text-base leading-8 text-neutral-800 sm:text-lg">{section.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-lg">
          <h3 className="font-display text-xl font-black text-black sm:text-2xl">Book Your Himalayan Adventure</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-neutral-700 sm:text-base">
            The Himalayan Shire is more than just a place to stay – it's a gateway to a remarkable Himalayan experience. Whether you choose a Standard, Deluxe, or Premium Room, you'll find that every stay is tailored to offer the highest level of comfort and luxury.
          </p>
          <Link href="/#book" className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-xl">
            Book Your Stay
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" /></svg>
          </Link>
        </motion.div>
      </article>
    </main>
  );
}