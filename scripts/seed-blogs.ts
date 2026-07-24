/**
 * Seed script — run once to populate data/blogs.json with existing posts.
 * Usage: npx tsx scripts/seed-blogs.ts
 */
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import type { BlogPost } from "../lib/blog-types";

const DATA_DIR = path.join(process.cwd(), "data");
const BLOGS_FILE = path.join(DATA_DIR, "blogs.json");

const SEED_POSTS: BlogPost[] = [
  {
    slug: "best-time-to-visit-fagu",
    title: "Best Time to Visit Fagu",
    author: "Rishabh Goel",
    date: "Sep 23, 2024",
    readTime: "8 min read",
    excerpt:
      "We often get asked what's the best time to visit The Himalayan Shire or visit Fagu in general. Every season has something unique and magical to offer.",
    image: "/images/blog-best-time-fagu.jpg",
    tag: "Travel Guide",
    featured: true,
    status: "published",
    createdAt: "2024-09-23T00:00:00.000Z",
    updatedAt: "2024-09-23T00:00:00.000Z",
    content: [
      {
        id: "p1",
        type: "paragraph",
        text: "We often get asked what's the best time to visit The Himalayan Shire or visit Fagu in general. While there is of course no one answer because the best time to visit here actually depends on your nature or liking rather than the place. Fagu is beautiful in all seasons. Every season has something unique and magical to offer. The question is what would you enjoy the most. For eg. can you handle very cold weather? Would you rather go at a time when there is very less crowd and no traffic? Do you want to sit at the property and enjoy a relaxing time or are you more of a sight seeing and going to the mall road kind of person?",
      },
      {
        id: "p2",
        type: "paragraph",
        text: "Also with climate change happening so rapidly, the effects of which might not be felt so strongly in a city, but in the mountains, the Himalayas have been strongly affected by climate change. It's hard to predict the weather or how a particular month is going to be like weather wise. The climate also can drastically change from morning to evening.",
      },
      {
        id: "p3",
        type: "paragraph",
        text: "But we have listed down month wise how the weather usually is or is expected to be, and how the vibe and the views change through the year.",
      },
      {
        id: "p4",
        type: "paragraph",
        text: "It is important to mention that Fagu itself is never crowded or has traffic jams. It is more of a rural town with less population, huge orchards and clear views. The crowd and traffic description is more for Shimla or on the way to Fagu.",
      },
      {
        id: "h1",
        type: "heading",
        text: "January – February",
        level: 2,
      },
      {
        id: "p5",
        type: "paragraph",
        text: "The Best Part: Snowfall. Heavenly and magical views of snow everywhere.\nTemperature: -5 to 5 degrees\nOverall Weather: Chilling. While we do get some nice warm sun during the day, the nights can be very cold.\nCrowd & Traffic: High during New Years and 26th January long weekend, but otherwise not too crowded.",
      },
      {
        id: "h2",
        type: "heading",
        text: "March – April",
        level: 2,
      },
      {
        id: "p6",
        type: "paragraph",
        text: "The Best Part: Very clear blue skies, clear night sky for stargazing. You can still enjoy the last of the snow at higher altitudes without having to deal much with the challenges of peak winters. Great for hiking.\nTemperature: 2 to 15 degrees\nOverall Weather: Still cold but comparatively warmer days.\nCrowd & Traffic: Very less crowd due to school exam time and financial year closing. No traffic jams. Great time to come for explorers.",
      },
      {
        id: "h3",
        type: "heading",
        text: "May – June",
        level: 2,
      },
      {
        id: "p7",
        type: "paragraph",
        text: "The Best Part: The weather is amazing. Not cold enough for warm clothes but not hot enough to need an AC either. Flowers start to bloom in May. Cherry Blossom season.\nTemperature: 10 – 30 degrees\nOverall Weather: Very pleasant weather. Cool winds, no AC required even during hottest days. Some nights in May might even be cold enough to enjoy a bonfire.\nCrowd & Traffic: Tourists start pouring in towards the end of May. June is very busy and you can expect traffic jams on the way specially during weekends. But once you are in Fagu, you leave the crowd behind to enjoy a peaceful and serene vacation.",
      },
      {
        id: "h4",
        type: "heading",
        text: "July – September",
        level: 2,
      },
      {
        id: "p8",
        type: "paragraph",
        text: "The Best Part: There are literally clouds in your room. Great time for photography and videography. The mountains are greenest during these months and flowers are blooming all around. It is also the apple harvesting season, so plenty of fresh apples to eat.\nTemperature: 12 – 28 degrees\nOverall Weather: This is of course the rainy season. Again very pleasant weather. More suited for travelers who want to relax at the property than roam around the entire day.\nCrowd & Traffic: After mid-July, the crowd starts reducing. This is also the time when media circulates mis-information regarding landslides, scaring the tourists away making it great time for travelers preferring long stays at cheap prices to visit Fagu.",
      },
      {
        id: "h5",
        type: "heading",
        text: "October – December",
        level: 2,
      },
      {
        id: "p9",
        type: "paragraph",
        text: "The Best Part: The Winter Line — you have to see it to believe it. Great panoramic views of the snow capped Greater Himalayas; they seem so close that you could almost touch them.\nTemperature: 0 – 18 degrees\nOverall Weather: Heaters and warm blankets come out. Great time to enjoy bonfires and outdoor dinners or picnics.\nCrowd & Traffic: Festival season. Oct-Nov is not very crowded with steady inflow and outflow of people. Towards the end of December, Christmas-New Year Holidays the prices go up.",
      },
    ],
  },
  {
    slug: "why-choose-the-himalayan-shire",
    title: "Why Choose The Himalayan Shire",
    author: "Rishabh Goel",
    date: "Jul 30, 2024",
    readTime: "6 min read",
    excerpt:
      "When planning your Himalayan adventure, the choice of accommodation can make all the difference. The Himalayan Shire, Fagu is exactly for travelers who want an overall experience.",
    image: "/images/blog-why-choose-shire.png",
    tag: "About Us",
    featured: false,
    status: "published",
    createdAt: "2024-07-30T00:00:00.000Z",
    updatedAt: "2024-07-30T00:00:00.000Z",
    content: [
      {
        id: "p1",
        type: "paragraph",
        text: "When planning your Himalayan adventure, the choice of accommodation can make all the difference. Some travelers seek only a decent budgeted room to stay the night and do not really care about the hospitality provided or the space outside of the rooms. But most travelers want an overall experience. They look for properties that are a complete package in themselves. The Himalayan Shire, Fagu is exactly for such travelers.",
      },
      {
        id: "h1",
        type: "heading",
        text: "Home Away from Home",
        level: 2,
      },
      {
        id: "p2",
        type: "paragraph",
        text: "At The Himalayan Shire, our aim is to make sure that everyone who comes at the Shire feels connected to the place. That, when they go back they don't think of it as just any regular hotel they stayed in, rather they go back with cherished memories of the place and a longing to return back soon. We do our best to make the guests feel at home and try not to have to say 'no' to any of their requests or demands. Our food is loved by all and if you go through our reviews you would definitely find a mention of our food being really nice and healthy.",
      },
      {
        id: "h2",
        type: "heading",
        text: "Unmatched Scenic Beauty",
        level: 2,
      },
      {
        id: "p3",
        type: "paragraph",
        text: "It is an east facing property which means if you are staying in one of our deluxe or premium rooms, you can enjoy the beautiful sunrise right from your bed. As the first lights of dawn, sieve through the night's darkness, you see so many colors in the sky as they slowly change hue as the sun rises from behind the mountains. Surrounded by apple orchards on all sides, and dense jungles just a walk away from the property, you will truly feel one with nature and experience the true Himalayan countryside. We have a very clear and uninterrupted view of the greater Himalayas and the valley in front of us.",
      },
      {
        id: "h3",
        type: "heading",
        text: "A Haven of Quiet and Calm",
        level: 2,
      },
      {
        id: "p4",
        type: "paragraph",
        text: "We are located 2kms away from the highway, and away from the noise. When you are here, you feel that you have come to a very off beat destination but just a 5 minutes drive will take you back to the bustling highway and the town market. You can hear nothing but the sweet chirping of birds throughout the day. It's an ideal getaway for anyone looking to take a breather from their hectic lifestyle. A great place for writer's retreat and authors to come and find the perfect environment to come up with some creative ideas.",
      },
      {
        id: "h4",
        type: "heading",
        text: "The Common Areas",
        level: 2,
      },
      {
        id: "p5",
        type: "paragraph",
        text: "When you book a stay at The Himalayan Shire, you are not just paying for the room. We have lots of common spaces, sitting areas for you to enjoy at the property. An approx 100sqft lawn area with a covered seating area is the place most people like to sit to soak in the sun and breathe fresh air outdoors. We have a low height Himachali style seating complete with a sigdi (indoor firewood heater). The entire 2nd floor is a big hall where guests spend most of their time. Whether you want to play a game of Table Tennis or slouch on the sofa as you watch a movie on our 65 inch smart TV or your whole group wants to gather together for a party, the second floor recreational area has it all. It also has an attached balcony with a two seater swing that overlooks the apple orchards on one side and the panoramic mountain ranges on the other.",
      },
    ],
  },
  {
    slug: "why-choose-fagu-for-your-next-holiday",
    title: "Why Should You Choose Fagu for Your Next Holiday Destination",
    author: "Rishabh Goel",
    date: "Jul 30, 2024",
    readTime: "7 min read",
    excerpt:
      "Fagu is a small town on the Shimla-Narkanda national highway, just 5kms ahead of Kufri and 20kms from Shimla. Here are the reasons why you should definitely put Fagu on your travel list.",
    image: "/images/blog-why-fagu.jpg",
    tag: "Destination",
    featured: false,
    status: "published",
    createdAt: "2024-07-30T00:00:00.000Z",
    updatedAt: "2024-07-30T00:00:00.000Z",
    content: [
      {
        id: "p1",
        type: "paragraph",
        text: "Fagu is a small town on the Shimla-Narkanda national highway. Fagu is just 5kms ahead of Kufri, and 20kms from Shimla (about 40 mins drive). You see some 6-7 small shops on both sides of the road and you know you have reached Fagu. Here are the reasons why you should definitely put Fagu on your travel list.",
      },
      {
        id: "h1",
        type: "heading",
        text: "Panoramic Views",
        level: 2,
      },
      {
        id: "p2",
        type: "paragraph",
        text: "While you might think that 'good views' is a selling point of a lot of hill stations, and that you can see views from Shimla itself, so why travel another 20kms to reach Fagu? Well if we have mentioned good views at the top of the list, it is with good reason. Fagu is located at 7500 ft above sea level and you know the higher you go the better views you get. On a clear day, the snow capped peaks of Greater Himalayas, the ones above 18-20k feet can be seen from Fagu. While in Fagu you feel at the top and all other hills the vast valleys are all below you and you get a very clear panoramic view all around. Most homestays or other tourist accommodations in Fagu are not very tightly packed and most have their own attached orchard space. So like The Himalayan Shire, in Fagu the view you get from your room itself will not be interrupted by other buildings or trees or electricity wire and you just get a very clear view from the room itself.",
      },
      {
        id: "h2",
        type: "heading",
        text: "Green",
        level: 2,
      },
      {
        id: "p3",
        type: "paragraph",
        text: "Fagu is a town in rural area, and it will give you a proper feel of Himachali countryside. Ditch the concrete jungle of Shimla and hotel culture of Kufri to experience local Himachali villages. Fagu is a very sweet spot as it is right on the main National Highway, very close to a developed city of Shimla with all amenities, hospitals and markets but in itself it is very quiet, very green and makes you feel like you are deep in pure nature. While commercialization is catching up in Fagu, it is still very peaceful and not densely populated as yet. Surrounded by dense forest of the majestic Deodar trees and Kail trees, a walk in the forests will rejuvenate you and make you feel so close to mother earth.",
      },
      {
        id: "h3",
        type: "heading",
        text: "Easy Access",
        level: 2,
      },
      {
        id: "p4",
        type: "paragraph",
        text: "Fagu is very approachable from Chandigarh, Delhi, Punjab and Haryana. Being so close to Shimla, you have a variety of transport modes to choose from. There is an Airport in Shimla with daily flights. From the Airport you can take a cab to Fagu. It will be a drive of about 2 hours and depending on the season and the number of pax, the cab will charge you somewhere around Rs. 2-3k.\n\nSecond option is to come by train or bus to Shimla and take a cab from there. From Shimla bus stand it's a drive of 1 hour and cab charges anywhere between 1500-2500 as of 2024. There are direct overnight volvo buses from Delhi to Shimla. You can also take the local bus from Shimla ISBT to Fagu, but you might have to check the timings for that local bus. Though some travelers do have it on their bucket list to travel in HRTC buses because it's an experience of its own.\n\nBut the mode we suggest is, unless of course you are driving in your personal vehicle, for tourists coming from far off like Mumbai or Bangalore, best is to book a flight to Chandigarh, and take a private cab from Chandigarh to Fagu. The driving distance is around 3.5-4 hrs and charges range from 3.5-5k depending on season and number of pax. But that will be the fastest way, although it might cost a bit more.",
      },
      {
        id: "h4",
        type: "heading",
        text: "Lovely Accommodations",
        level: 2,
      },
      {
        id: "p5",
        type: "paragraph",
        text: "Fagu has some really unique places to stay for all budget. We suggest that when you are travelling to the mountains, ditch the cliched hotel for a more unique stay like The Himalayan Shire. Starting from the lower budget of Rs. 2000-3000 per day, you can find various homestays like Vishisht homestay, which is built right in the middle of an apple orchard. Has plenty of parking space and is easy to reach. It's run by a local villager couple and you will not find anything lacking in their hospitality. They have really good views from the room and offer basic amenities.\n\nIf you are looking for a more comfortable, luxurious property then The Himalayan Shire offers a very unique stay. You can find all the amenities listed on our website, but we offer a comfort of a home, the vibe of a heritage cum modern mountain property, amenities more than what most hotels offer these days and hospitality of a 5 star hotel. Other than just offering a room like a hotel, we offer plenty of cozy corners and wide spaces to play around or sit and relax. Staying for a day or two will leave you wanting to stay longer to explore each part of the property.\n\nIf you are willing to spend even more, upward of 10k per night, then there are unique dome stays in Fagu area as well, like the GlamoHome or GalmoReo. They offer very unique dome tent stays with luxurious interiors and top class amenities.\n\nSo Fagu has a place for all kinds of travelers. If you go in more off beat places, you might find more raw accommodations but you will definitely find them lacking in amenities or hospitality, but Fagu offers a mix of both, unique spacious stays but without compromising on hospitality or amenities.",
      },
      {
        id: "h5",
        type: "heading",
        text: "Peace and Calm",
        level: 2,
      },
      {
        id: "p6",
        type: "paragraph",
        text: "Most people travel to hills for peace and quiet. But unfortunately main stream towns and hill stations have become overcrowded. You will be stuck in jams most of the times and can hear the honking all day. It's hard to find a peaceful quiet place to sit and relax while enjoying the cool breeze or with a view in front of you. Fagu offers just that. It is not densely populated. You will hardly hear any honking or any sound other than the breeze or the birds. You can find many many spots where you can be alone and enjoy the amazing views. Where you truly feel you have come to the mountains and have a moment to connect with nature.",
      },
    ],
  },
  {
    slug: "discover-our-standard-rooms",
    title: "Discover the Charm of Our Standard Rooms at The Himalayan Shire",
    author: "Rishabh Goel",
    date: "Jul 30, 2024",
    readTime: "4 min read",
    excerpt:
      "Our Standard Rooms – MOHRU and TOSH – offer the perfect blend of comfort and elegance, making them an ideal choice for travelers seeking simplicity without compromising on quality.",
    image: "/images/blog-standard-rooms.jpg",
    tag: "Rooms",
    featured: false,
    status: "published",
    createdAt: "2024-07-30T00:00:00.000Z",
    updatedAt: "2024-07-30T00:00:00.000Z",
    content: [
      {
        id: "p1",
        type: "paragraph",
        text: "When it comes to a peaceful retreat amidst the breathtaking beauty of the Himalayas, every detail at The Himalayan Shire has been thoughtfully crafted to provide an unforgettable stay. Our Standard Rooms – MOHRU and TOSH – offer the perfect blend of comfort and elegance, making them an ideal choice for travelers seeking simplicity without compromising on quality.",
      },
      {
        id: "h1",
        type: "heading",
        text: "MOHRU – Standard Room: A Cozy Haven",
        level: 2,
      },
      {
        id: "p2",
        type: "paragraph",
        text: "The MOHRU Standard Room is designed with a cozy ambiance that welcomes you with open arms. Featuring warm, earthy tones and comfortable furnishings, this room is your sanctuary after a day of exploring the picturesque Himalayan landscapes. The well-appointed amenities ensure that you have everything you need to relax and recharge, including a plush bed, modern bathroom, and stunning views of the surrounding mountains.",
      },
      {
        id: "h2",
        type: "heading",
        text: "TOSH – Standard Room: Simple Elegance",
        level: 2,
      },
      {
        id: "p3",
        type: "paragraph",
        text: "Similarly, the TOSH Standard Room combines simplicity with sophistication. Its minimalist design is accentuated by tasteful decor and natural light, creating a serene environment perfect for unwinding. The room's strategic positioning offers beautiful vistas and a sense of tranquility that only the Himalayas can provide.",
      },
      {
        id: "p4",
        type: "paragraph",
        text: "Whether you choose MOHRU or TOSH, our Standard Rooms promise a comfortable and memorable stay. Book your escape to The Himalayan Shire and experience the serene beauty and cozy charm of our Standard Rooms.",
      },
    ],
  },
];

async function seed() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }

  await writeFile(BLOGS_FILE, JSON.stringify(SEED_POSTS, null, 2), "utf-8");
  console.log(`Seeded ${SEED_POSTS.length} blog posts to ${BLOGS_FILE}`);
}

seed().catch(console.error);
