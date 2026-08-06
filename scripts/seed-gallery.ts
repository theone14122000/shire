/* ------------------------------------------------------------------ */
/*  Seed the gallery table with the existing /public/gallery images    */
/*  Idempotent: safe to run repeatedly.                                 */
/*  Usage: npm run seed:gallery                                         */
/* ------------------------------------------------------------------ */
import { PrismaClient } from "@prisma/client";
import { categoryFromFile, titleFromFile } from "../lib/gallery";

const prisma = new PrismaClient();

const GALLERY_FILES = [
  "attic-area-common.jpg",
  "bonfire.jpg",
  "common-balcony.jpg",
  "common-balcony-with-swing.jpg",
  "common-seating-first-floor.jpg",
  "decor.png",
  "dining-area.jpg",
  "enchanting-winter-views.jpg",
  "ground-floor-lobby.jpg",
  "himachali-style-seating.jpg",
  "indoor-games.jpeg",
  "lawn-with-outdoor-seating-1.jpg",
  "mesmerizing-views.jpg",
  "reception-area.png",
  "recreational-hall.jpg",
  "snow-view.jpg",
  "sunrise-view.png",
  "surrounded-by-greenery.jpg",
  "tv-lounge.jpg",
  "winters.jpg",
];

async function main() {
  let created = 0;
  let updated = 0;

  for (const [index, file] of GALLERY_FILES.entries()) {
    const src = `/gallery/${file}`;
    const existing = await prisma.galleryItem.findUnique({ where: { src } });
    const data = {
      title: titleFromFile(file),
      category: categoryFromFile(file),
      order: index,
      status: "published" as const,
    };
    if (existing) {
      await prisma.galleryItem.update({ where: { src }, data });
      updated += 1;
    } else {
      await prisma.galleryItem.create({ data: { ...data, src } });
      created += 1;
    }
  }

  console.log(`Gallery seeded — ${created} created, ${updated} updated.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
