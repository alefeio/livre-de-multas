import prisma from "../../lib/prisma";
import { MenuData, LinkItem } from "../types/index";

export async function getMenuData(): Promise<MenuData | null> {
  try {
    const menus = await prisma.menu.findMany();
    const rawMenu = menus.length > 0 ? menus[0] : null;
    if (!rawMenu || !rawMenu.links || !Array.isArray(rawMenu.links)) return null;

    const links: LinkItem[] = (rawMenu.links as unknown as LinkItem[]).map((link) => ({
      id: link.id,
      text: link.text,
      url: link.url,
      target: link.target,
    }));

    return {
      logoUrl: rawMenu.logoUrl || "/images/logo.png",
      links,
    };
  } catch (error) {
    console.error("[getMenuData]", error);
    return null;
  }
}
