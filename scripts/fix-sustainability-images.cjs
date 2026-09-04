const { PrismaClient } = require("@prisma/client");

async function main() {
  const prisma = new PrismaClient();
  
  const row = await prisma.pageContent.findUnique({
    where: { pageKey: "sustainability" },
  });
  
  if (!row) {
    console.log("No sustainability record found");
    await prisma.$disconnect();
    return;
  }
  
  const data = JSON.parse(row.data);
  console.log("Current featured images:");
  if (data.featured) {
    data.featured.forEach((f, i) => console.log(`  [${i}] src: ${f.src}`));
  }
  
  // Set correct paths
  data.featured = [
    { src: "/sust/Sustainability1.png", title: "From Kitchen to Garden", caption: "From Kitchen to Garden" },
    { src: "/sust/Sustainability2.png", title: "Harvesting the Himalayan Rain", caption: "Harvesting the Himalayan Rain" },
  ];
  
  await prisma.pageContent.update({
    where: { pageKey: "sustainability" },
    data: { data: JSON.stringify(data) },
  });
  
  console.log("\nUpdated to:");
  data.featured.forEach((f, i) => console.log(`  [${i}] src: ${f.src}`));
  
  await prisma.$disconnect();
}

main().catch(console.error);
