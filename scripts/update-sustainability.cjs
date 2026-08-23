require("dotenv").config({ path: ".env.local" });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const content = {
  hero: {
    kicker: "The Himalayan Shire",
    heading: "Sustainability at The Himalayan Shire",
    intro: "We care for the mountains we call home. Here's how we tread lightly:",
  },
  approach: {
    kicker: "Our Conscious Choices",
    heading: "Our Conscious Choices",
    body:
      "At The Himalayan Shire, sustainability begins with mindful details. We practice waste segregation - plastic, cardboard, paper, glass, and metals are sent for recycling. Plastic bottles are replaced with glass, and bathroom toiletries come in thoughtful dispensers instead of disposable plastics. Even the simple act of brushing is greener here, with bamboo toothbrushes in place of synthetic ones.",
  },
  featured: [
    {
      src: "/sust/Sustainability2.jpeg",
      title: "From Kitchen to Garden",
      caption: "From Kitchen to Garden",
    },
    {
      src: "/sust/Sustainability1.jpeg",
      title: "Harvesting the Himalayan Rain",
      caption: "Harvesting the Himalayan Rain",
    },
  ],
  initiatives: [
    {
      title: "From Kitchen to Garden",
      body:
        "What nourishes you also nourishes the land. All biodegradable waste, including kitchen scraps, is composted on-site and returned to the soil as rich manure. The result: a thriving lawn and garden that grow in harmony with the rhythms of nature.",
    },
    {
      title: "Harvesting the Himalayan Rain",
      body:
        "Blessed by Fagu's abundant rainfall, we capture and store rainwater to meet much of our property's needs. This practice allows us to cherish every drop while reducing dependence on external sources – keeping us aligned with the natural abundance around us.",
    },
  ],
  closing: {
    kicker: "",
    heading:
      "While we do not claim to be a 100% eco-paradise, we do believe in doing our bit – one glass bottle, compost pile, and rain shower at a time.",
    body: "",
    ctaLabel: "Plan Your Stay",
  },
};

async function main() {
  const existing = await prisma.pageContent.findUnique({
    where: { pageKey: "sustainability" },
  });
  if (existing) {
    await prisma.pageContent.update({
      where: { pageKey: "sustainability" },
      data: { data: JSON.stringify(content) },
    });
    console.log("UPDATED existing row key=sustainability");
  } else {
    await prisma.pageContent.create({
      data: { pageKey: "sustainability", data: JSON.stringify(content) },
    });
    console.log("CREATED new row key=sustainability");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
