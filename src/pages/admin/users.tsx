import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminPageWrapper from "../../components/admin/AdminPageWrapper";
import Link from "next/link";
import { MdArrowBack, MdDelete } from "react-icons/md";

const SUPER_ADMIN_EMAIL = "livredemultasads@gmail.com";

interface UserRow {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const canDeleteUsers = (session?.user?.email ?? "").toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
  const currentUserId = (session?.user as any)?.id;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      if (!res.ok) {
        setUsers([]);
        return;
      }
      const data = await res.json();
      setUsers(data.users ?? []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingId(userId);
    setMessage(null);
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.message || "Erro ao atualizar perfil." });
        return;
      }
      setMessage({ type: "success", text: "Perfil atualizado com sucesso." });
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch {
      setMessage({ type: "error", text: "Erro ao atualizar perfil." });
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleDelete = async (user: UserRow) => {
    if (!canDeleteUsers) return;
    if (!confirm(`Excluir o usuário ${user.email || user.name || user.id}? Esta ação não pode ser desfeita.`)) return;
    setDeletingId(user.id);
    setMessage(null);
    try {
      const res = await fetch(`/api/users/${user.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.message || "Erro ao excluir usuário." });
        return;
      }
      setMessage({ type: "success", text: "Usuário excluído." });
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch {
      setMessage({ type: "error", text: "Erro ao excluir usuário." });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout>
      <AdminPageWrapper
        title="Perfis de usuário"
        subtitle="Altere o perfil (USER ou ADMIN) dos usuários cadastrados."
      >
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#fec655] transition"
          >
            <MdArrowBack /> Voltar ao dashboard
          </Link>
        </div>

        {message && (
          <div
            className={`mb-6 rounded-lg px-4 py-3 text-sm ${
              message.type === "success"
                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Usuários cadastrados
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Novos usuários entram como USER. Altere para ADMIN para dar acesso ao painel.
              {canDeleteUsers && " Apenas você pode excluir usuários."}
            </p>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <p className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                Carregando…
              </p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Usuário
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      E-mail
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Cadastro
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Perfil
                    </th>
                    {canDeleteUsers && (
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right w-24">
                        Ações
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={canDeleteUsers ? 5 : 4} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                        Nenhum usuário encontrado.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition"
                      >
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {user.name || "—"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {user.email || "—"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            disabled={updatingId === user.id}
                            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 text-sm focus:ring-2 focus:ring-[#fec655]/50 focus:border-[#fec655] disabled:opacity-50"
                          >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                          {updatingId === user.id && (
                            <span className="ml-2 text-xs text-gray-500">Salvando…</span>
                          )}
                        </td>
                        {canDeleteUsers && (
                          <td className="px-6 py-4 text-right">
                            {currentUserId === user.id ? (
                              <span className="text-xs text-gray-500 dark:text-gray-400">—</span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleDelete(user)}
                                disabled={deletingId === user.id}
                                className="inline-flex items-center gap-1 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-3 py-2 text-sm font-medium text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 disabled:opacity-50 transition"
                                title="Excluir usuário"
                              >
                                <MdDelete className="text-lg" />
                                {deletingId === user.id ? "Excluindo…" : "Excluir"}
                              </button>
                            )}
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </AdminPageWrapper>
    </AdminLayout>
  );
}
