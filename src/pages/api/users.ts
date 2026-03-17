import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '../../../lib/prisma';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return res.status(401).json({ message: 'Acesso não autorizado.' });
  }

  try {
    const prismaUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const users = prismaUsers.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role ?? 'USER',
      createdAt: u.createdAt.toISOString(),
    }));

    return res.status(200).json({ users });
  } catch (e: any) {
    console.error('Erro ao buscar usuários:', e);
    return res.status(500).json({ success: false, message: 'Falha ao carregar usuários.' });
  }
}
