import { prisma } from "./prisma";

export async function getHomepageSections(): Promise<Record<string, any>> {
  try {
    const sections = await prisma.homepageContent.findMany({
      orderBy: { section: "asc" },
    });

    const data: Record<string, any> = {};
    for (const section of sections) {
      try {
        data[section.section] = JSON.parse(section.data);
      } catch {
        data[section.section] = {};
      }
    }
    return data;
  } catch {
    return {};
  }
}
