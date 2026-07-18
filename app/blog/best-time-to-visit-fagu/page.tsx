"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SiteNav } from "../../components/SiteNav";

const SEASONS = [
  {
    months: "January – February",
    best: "Snowfall. Heavenly and magical views of snow everywhere.",
    temp: "-5 to 5 degrees",
    weather: "Chilling. While we do get some nice warm sun during the day, the nights can be very cold.",
    crowd: "High during New Years and 26th January long weekend, but otherwise not too crowded.",
  },
  {
    months: "March – April",
    best: "Very clear blue skies, clear night sky for stargazing. You can still enjoy the last of the snow at higher altitudes without having to deal much with the challenges of peak winters. Great for hiking.",
    temp: "2 to 15 degrees",
    weather: "Still cold but comparatively warmer days.",
    crowd: "Very less crowd due to school exam time and financial year closing. No traffic jams. Great time to come for explorers.",
  },
  {
    months: "May – June",
    best: "The weather is amazing. Not cold enough for warm clothes but not hot enough to need an AC either. Flowers start to bloom in May. Cherry Blossom season.",
    temp: "10 – 30 degrees",
    weather: "Very pleasant weather. Cool winds, no AC required even during hottest days. Some nights in May might even be cold enough to enjoy a bonfire.",
    crowd: "Tourists start pouring in towards the end of May. June is very busy and you can expect traffic jams on the way specially during weekends. But once you are in Fagu, you leave the crowd behind to enjoy a peaceful and serene vacation.",
  },
  {
    months: "July – September",
    best: "There are literally clouds in your room. Great time for photography and videography. The mountains are greenest during these months and flowers are blooming all around. It is also the apple harvesting season, so plenty of fresh apples to eat.",
    temp: "12 – 28 degrees",
    weather: "This is of course the rainy season. Again very pleasant weather. More suited for travelers who want to relax at the property than roam around the entire day.",
    crowd: "After mid-July, the crowd starts reducing. This is also the time when media circulates mis-information regarding landslides, scaring the tourists away making it great time for travelers preferring long stays at cheap prices to visit Fagu.",
  },
  {
    months: "October – December",
    best: "The Winter Line — you have to see it to believe it. Great panoramic views of the snow capped Greater Himalayas; they seem so close that you could almost touch them.",
    temp: "0 – 18 degrees",
    weather: "Heaters and warm blankets come out. Great time to enjoy bonfires and outdoor dinners or picnics.",
    crowd: "Festival season. Oct-Nov is not very crowded with steady inflow and outflow of people. Towards the end of December, Christmas-New Year Holidays the prices go up.",
  },
];

export default function BestTimeToFaguPage() {
  return (
    <main className="min-h-screen bg-[#f4faf5] font-sans text-black">
      <SiteNav />

      <article className="mx-auto max-w-4xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        {/* Back */}
        <Link href="/blog" className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 transition-colors hover:text-black">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-1"><path d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Back to Blog
        </Link>

        {/* Meta */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800">Travel Guide</span>
          <h1 className="mt-4 font-display text-3xl font-black leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl">
            Best Time to Visit Fagu
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-600">
            <span className="font-bold text-emerald-800">Rishabh Goel</span>
            <span>·</span>
            <span>Sep 23, 2024</span>
            <span>·</span>
            <span>8 min read</span>
          </div>
        </motion.div>

        {/* YouTube Video Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-100/50 shadow-lg"
        >
          <div className="relative aspect-video flex items-center justify-center">
            {/* Replace the div below with your YouTube embed when ready:
                <iframe src="YOUR_YOUTUBE_LINK" className="absolute inset-0 h-full w-full" allowFullScreen />
            */}
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
              <p className="text-sm font-bold text-emerald-900">YouTube Video</p>
              <p className="text-xs text-emerald-800/60">Video link will be added here</p>
            </div>
          </div>
        </motion.div>

        {/* Intro */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="prose-custom mt-10 space-y-5 text-base leading-8 text-neutral-800 sm:text-lg">
          <p>We often get asked what's the best time to visit The Himalayan Shire or visit Fagu in general. While there is of course no one answer because the best time to visit here actually depends on your nature or liking rather than the place. Fagu is beautiful in all seasons. Every season has something unique and magical to offer. The question is what would you enjoy the most. For eg. can you handle very cold weather? Would you rather go at a time when there is very less crowd and no traffic? Do you want to sit at the property and enjoy a relaxing time or are you more of a sight seeing and going to the mall road kind of person?</p>

          <p>Also with climate change happening so rapidly, the effects of which might not be felt so strongly in a city, but in the mountains, the Himalayas have been strongly affected by climate change. It's hard to predict the weather or how a particular month is going to be like weather wise. The climate also can drastically change from morning to evening.</p>

          <p>But we have listed down month wise how the weather usually is or is expected to be, and how the vibe and the views change through the year.</p>

          <p className="font-semibold text-emerald-900">It is important to mention that Fagu itself is never crowded or has traffic jams. It is more of a rural town with less population, huge orchards and clear views. The crowd and traffic description is more for Shimla or on the way to Fagu.</p>
        </motion.div>

        {/* Season Cards */}
        <div className="mt-12 space-y-6">
          {SEASONS.map((season, idx) => (
            <motion.div
              key={season.months}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="overflow-hidden rounded-2xl border border-emerald-200/70 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5"
            >
              <div className="border-b border-emerald-100 bg-emerald-50/50 px-6 py-4">
                <h2 className="font-display text-xl font-black text-black sm:text-2xl">{season.months}</h2>
              </div>
              <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">The Best Part</p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-800">{season.best}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Temperature</p>
                  <p className="mt-1 text-sm font-bold text-black">{season.temp}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Overall Weather</p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-800">{season.weather}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Crowd & Traffic</p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-800">{season.crowd}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
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