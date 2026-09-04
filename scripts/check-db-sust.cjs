const { PrismaClient } = require("@prisma/client");

async function main() {
  const prisma = new PrismaClient();
  const row = await prisma.pageContent.findUnique({
    where: { pageKey: "sustainability" },
  });
  if (!row) { console.log("No record"); await prisma.$disconnect(); return; }
  const data = JSON.parse(row.data);
  console.log("Featured images in DB:");
  if (data.featured) {
    data.featured.forEach((f, i) => console.log(`  [${i}] src: ${f.src}`));
  } else {
    console.log("  No featured array found");
    console.log("  Keys:", Object.keys(data));
  }
  await prisma.$disconnect();
}
main().catch(console.error);
