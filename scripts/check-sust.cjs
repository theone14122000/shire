require("dotenv").config({ path: ".env.local" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

async function main() {
  const r = await p.pageContent.findUnique({ where: { pageKey: "sustainability" } });
  const d = JSON.parse(r.data);
  console.log("featured:");
  d.featured?.forEach((f, i) => console.log(i, f.src, "|", f.title));
  console.log("approach.heading:", d.approach?.heading);
  console.log("approach.kicker:", d.approach?.kicker);
}

main().then(() => p.$disconnect());
