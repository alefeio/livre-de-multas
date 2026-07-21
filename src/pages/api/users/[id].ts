import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "../../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

const ROLES = ["USER", "ADMIN"] as const;
const SUPER_ADMIN_EMAIL = "livredemultasads@gmail.com";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return res.status(401).json({ message: "Acesso não autorizado." });
  }

  const id = req.query.id;
  const userId = Array.isArray(id) ? id[0] : id;
  if (!userId) {
    return res.status(400).json({ message: "ID do usuário é obrigatório." });
  }

  if (req.method === "DELETE") {
    if ((session.user?.email ?? "").toLowerCase() !== SUPER_ADMIN_EMAIL.toLowerCase()) {
      return res.status(403).json({ message: "Apenas o usuário autorizado pode excluir usuários." });
    }
    const currentUserId = (session.user as any)?.id;
    if (currentUserId && currentUserId === userId) {
      return res.status(400).json({ message: "Você não pode excluir sua própria conta." });
    }
    try {
      await prisma.user.delete({ where: { id: userId } });
      return res.status(200).json({ success: true });
    } catch (e: any) {
      if (e?.code === "P2025") {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      console.error("Erro ao excluir usuário:", e);
      return res.status(500).json({ message: "Erro ao excluir usuário." });
    }
  }

  if (req.method !== "PATCH") {
    res.setHeader("Allow", ["PATCH", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const role = req.body?.role;
  if (!role || !ROLES.includes(role)) {
    return res.status(400).json({ message: "Perfil inválido. Use USER ou ADMIN." });
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: { id: true, email: true, name: true, role: true },
    });
    return res.status(200).json({ user });
  } catch (e: any) {
    if (e?.code === "P2025") {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    console.error("Erro ao atualizar perfil do usuário:", e);
    return res.status(500).json({ message: "Erro ao atualizar perfil." });
  }
}
