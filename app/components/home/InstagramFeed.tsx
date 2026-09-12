"use client";

import { useEffect, useState } from "react";

const JUICER_FEED_ID = "my-feed-84c14c30-2cbf-4420-9e62-60bf9c9f469b";
// ?per=3 is Juicer's documented mechanism: 3 posts show initially, then
// Juicer's own Load More button reveals the rest.
const JUICER_SCRIPT_SRC = `https://www.juicer.io/embed/${JUICER_FEED_ID}/embed-code.js?per=3`;
const INSTAGRAM_URL = "https://www.instagram.com/thehimalayanshire/?hl=en";

export function InstagramFeed() {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (document.querySelector(`script[src="${JUICER_SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = JUICER_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onerror = () => setFailed(true);
    document.body.appendChild(script);
  }, []);

  if (failed) {
    return (
      <div className="px-4 py-10 text-center">
        <p className="text-base leading-[1.9] text-emerald-950/65">
          Our Instagram feed could not be loaded right now.
        </p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="luxe-button mt-6 inline-flex"
        >
          Follow @thehimalayanshire
        </a>
      </div>
    );
  }

  return (
    <div className="relative">
      <ul
        className="juicer-feed"
        data-feed-id={JUICER_FEED_ID}
        data-per="3"
      />
      <div className="pb-2 pt-6 text-center">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800 transition-colors hover:text-gold-700"
        >
          Follow @thehimalayanshire on Instagram
        </a>
      </div>
    </div>
  );
}
