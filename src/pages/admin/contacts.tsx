import { PrismaClient } from '@prisma/client';
import AdminLayout from 'components/admin/AdminLayout';
import AdminPageWrapper from 'components/admin/AdminPageWrapper';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  serviceOfInterest: string | null;
  message: string;
  createdAt: string;
}

interface ContactsPageProps {
  contacts: Contact[];
}

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps<ContactsPageProps> = async () => {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return {
    props: {
      contacts: JSON.parse(JSON.stringify(contacts)),
    },
  };
};

export default function ContactsPage({ contacts }: ContactsPageProps) {
  const { data: session, status } = useSession();
  const [selected, setSelected] = useState<Contact | null>(null);

  if (status === 'loading') {
    return (
      <AdminLayout>
        <p>Verificando autenticação...</p>
      </AdminLayout>
    );
  }

  if (status === 'authenticated' && (session?.user as any)?.role !== 'ADMIN') {
    return (
      <AdminLayout>
        <p className="text-red-500 text-center mt-8">Acesso negado. Apenas administradores podem visualizar os contatos.</p>
        <Link href="/api/auth/signin" className="text-center block mt-4 text-orange-500 font-bold">
          Fazer Login
        </Link>
      </AdminLayout>
    );
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const serviceLabels: Record<string, string> = {
    DETRAN_PA: 'Multa / notificação DETRAN-PA',
    SEMOB_SEGBEL: 'Multa SEMOB / SEGBEL',
    CNH_PROVISORIA: 'Multa na CNH provisória',
    BAFOMETRO: 'Bafômetro / Recusa',
    SUSPENSAO: 'Suspensão da CNH',
    EXCESSO_50: 'Excesso acima de 50%',
    MANOBRA_PERIGOSA: 'Manobra perigosa / racha',
    SEM_CAPACETE: 'Multa sem capacete',
    OUTRO: 'Outro',
  };

  return (
    <AdminLayout>
      <AdminPageWrapper
        title="Contatos (Analisar meu caso)"
        subtitle="Mensagens enviadas pelo formulário da seção Analisar meu caso na home."
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {contacts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Nenhum contato registrado ainda.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      E-mail
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Telefone
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Caso
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Mensagem
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {contacts.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                        {formatDate(c.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                        {c.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                        <a href={`mailto:${c.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                          {c.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                        {c.phone || '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                        {c.serviceOfInterest ? serviceLabels[c.serviceOfInterest] || c.serviceOfInterest : '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 max-w-xs">
                        <span className="line-clamp-2">
                          {c.message || '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setSelected(c)}
                          className="rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-orange-600"
                        >
                          Ver mensagem
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </AdminPageWrapper>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Mensagem completa</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Data</dt>
                <dd className="text-gray-900 dark:text-gray-100">{formatDate(selected.createdAt)}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Nome</dt>
                <dd className="text-gray-900 dark:text-gray-100">{selected.name}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">E-mail</dt>
                <dd>
                  <a href={`mailto:${selected.email}`} className="text-blue-600 hover:underline dark:text-blue-400">
                    {selected.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Telefone</dt>
                <dd className="text-gray-900 dark:text-gray-100">{selected.phone || '—'}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Caso</dt>
                <dd className="text-gray-900 dark:text-gray-100">
                  {selected.serviceOfInterest
                    ? serviceLabels[selected.serviceOfInterest] || selected.serviceOfInterest
                    : '—'}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500 dark:text-gray-400">Mensagem</dt>
                <dd className="mt-1 whitespace-pre-wrap break-words rounded-lg bg-gray-50 p-3 text-gray-900 dark:bg-gray-700 dark:text-gray-100">
                  {selected.message || '—'}
                </dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-6 w-full rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
