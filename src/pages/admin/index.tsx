import AdminLayout from "../../components/admin/AdminLayout";
import AdminPageWrapper from "../../components/admin/AdminPageWrapper";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <AdminPageWrapper
        title="Dashboard"
        subtitle="Bem-vindo ao painel de administração do site."
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-gray-600 dark:text-gray-400">
            Use o menu lateral para navegar e gerenciar o conteúdo do site.
          </p>
        </div>
      </AdminPageWrapper>
    </AdminLayout>
  );
}