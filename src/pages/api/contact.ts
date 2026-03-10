// pages/api/contact.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '../../../lib/prisma';
import { Resend } from 'resend';
import { authOptions } from './auth/[...nextauth]';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const session = await getServerSession(req, res, authOptions);
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return res.status(401).json({ message: 'Acesso não autorizado.' });
    }
    try {
      const contacts = await prisma.contact.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json(contacts);
    } catch (error) {
      console.error('Erro ao listar contatos:', error);
      return res.status(500).json({ message: 'Erro ao listar contatos.' });
    }
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, email, phone, serviceOfInterest, message } = req.body;

  // Validação básica dos campos obrigatórios
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Nome, e-mail e mensagem são obrigatórios.' });
  }

  try {
    // 1. Salva no banco (prioridade: garantir que a mensagem fique guardada)
    const newContact = await prisma.contact.create({
      data: {
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        phone: phone ? String(phone).trim() : null,
        serviceOfInterest: serviceOfInterest ? String(serviceOfInterest).trim() : null,
        message: String(message).trim(),
      },
    });

    // 2. Tenta enviar e-mail de confirmação (não bloqueia a resposta de sucesso)
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Livre de Multas <livresdemultasoficial@gmail.com>",
          to: String(email).trim(),
          subject: `Confirmação de Recebimento - ${name}`,
          html: `
            <!DOCTYPE html><html><head><meta charset="utf-8"><title>Confirmação de Contato</title></head><body style="font-family:sans-serif;line-height:1.6;color:#333;">
            <div style="max-width:600px;margin:20px auto;padding:20px;border:1px solid #ddd;border-radius:8px;">
              <div style="text-align:center;border-bottom:1px solid #eee;padding-bottom:10px;margin-bottom:20px;"><h1 style="color:#0c1a26;">Livre de Multas</h1></div>
              <p>Olá, ${String(name)}!</p>
              <p>Agradecemos o seu contato. Recebemos a sua mensagem com sucesso e nossa equipe já está analisando as suas informações. Em breve, entraremos em contato.</p>
              <p>Atenciosamente,<br/>Equipe Livre de Multas.</p>
              <p style="text-align:center;font-size:12px;color:#777;margin-top:20px;">E-mail automático. Por favor, não responda.</p>
            </div></body></html>
          `,
        });
      } catch (emailErr: any) {
        console.error('[contact] E-mail de confirmação não enviado:', emailErr?.message || emailErr);
      }
    }

    return res.status(201).json({ success: true, contact: newContact, message: 'Mensagem enviada com sucesso!' });
  } catch (error: any) {
    console.error('Erro ao salvar contato no banco de dados:', error);
    return res.status(500).json({ success: false, message: 'Erro ao salvar sua mensagem. Tente novamente.' });
  }
}