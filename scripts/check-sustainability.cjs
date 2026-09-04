require("dotenv").config({ path: ".env.local" });
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

async function main() {
  const r = await p.pageContent.findUnique({
    where: { pageKey: "sustainability" },
  });
  const d = JSON.parse(r.data);
  console.log("initiatives count:", d.initiatives?.length);
  d.initiatives?.forEach((item, i) =>
    console.log(i, "|", item.title?.substring(0, 50))
  );
  console.log("approach.body:", d.approach?.body?.substring(0, 80));
}

main()
  .then(() => p.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await p.$disconnect();
    process.exit(1);
  });
