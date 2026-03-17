import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * POST: registra uma visualização de página (path).
 * Chamado pelo frontend ao exibir uma página.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const path = typeof req.body?.path === "string" ? req.body.path.trim() : req.headers["referer"] ? new URL(req.headers["referer"] as string).pathname : "/";
  const safePath = path || "/";

  try {
    await prisma.pageView.create({
      data: { path: safePath },
    });
    return res.status(201).json({ ok: true });
  } catch (e) {
    console.error("[pageview] Erro ao registrar:", e);
    return res.status(500).json({ error: "Erro ao registrar acesso" });
  } finally {
    await prisma.$disconnect();
  }
}
