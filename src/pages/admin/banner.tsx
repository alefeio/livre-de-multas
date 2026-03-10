import { useSession } from 'next-auth/react';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminPageWrapper from '../../components/admin/AdminPageWrapper';
import BannerForm from '../../components/admin/BannerForm';
import Link from 'next/link';

export default function AdminBannerPage() {
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
      <AdminPageWrapper title="Banner" subtitle="Gerencie os banners exibidos no site.">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <BannerForm />
        </div>
      </AdminPageWrapper>
    </AdminLayout>
  );
}