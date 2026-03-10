import { useSession } from 'next-auth/react';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminPageWrapper from '../../components/admin/AdminPageWrapper';
import MenuForm from '../../components/admin/MenuForm';
import Link from 'next/link';

export default function AdminMenuPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <AdminLayout><p>Verificando autenticação...</p></AdminLayout>;
  if (status === 'authenticated' && (session?.user as any)?.role !== 'ADMIN') {
    return (
      <AdminLayout>
        <p className="text-red-500 text-center mt-8">Acesso negado. Apenas administradores podem acessar.</p>
        <Link href="/api/auth/signin" className="text-center block mt-4 text-orange-500 font-bold">Fazer login</Link>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminPageWrapper title="Menu" subtitle="Edite o menu de navegação do site.">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <MenuForm />
        </div>
      </AdminPageWrapper>
    </AdminLayout>
  );
}