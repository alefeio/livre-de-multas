import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminPageWrapper from "../../components/admin/AdminPageWrapper";
import { MdTrendingUp, MdArrowBack } from "react-icons/md";

interface PageViewRow {
  path: string;
  total: number;
}

interface PageViewsPageProps {
  viewsByPath: PageViewRow[];
  totalViews: number;
}

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps<PageViewsPageProps> = async () => {
  try {
    const [grouped, total] = await Promise.all([
      prisma.pageView.groupBy({
        by: ["path"],
        _count: { path: true },
        orderBy: { _count: { path: "desc" } },
      }),
      prisma.pageView.count(),
    ]);

    const viewsByPath: PageViewRow[] = grouped.map((g) => ({
      path: g.path,
      total: g._count.path,
    }));

    return {
      props: {
        viewsByPath: JSON.parse(JSON.stringify(viewsByPath)),
        totalViews: total,
      },
    };
  } catch (e) {
    console.error("[Admin PageViews] Erro:", e);
    return {
      props: {
        viewsByPath: [],
        totalViews: 0,
      },
    };
  } finally {
    await prisma.$disconnect();
  }
};

function pathLabel(path: string) {
  if (path === "/") return "Página inicial";
  const clean = path.replace(/^\//, "").trim() || "/";
  return clean === "/" ? "Página inicial" : path;
}

export default function PageViewsPage({ viewsByPath, totalViews }: PageViewsPageProps) {
  return (
    <AdminLayout>
      <AdminPageWrapper
        title="Detalhes dos acessos"
        subtitle="Visualizações por página do site."
      >
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#fec655] transition"
          >
            <MdArrowBack /> Voltar ao dashboard
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Páginas visualizadas
            </h2>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total geral: <strong className="text-gray-900 dark:text-white">{totalViews.toLocaleString("pt-BR")}</strong> visualizações
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Página
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right whitespace-nowrap">
                    Visualizações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {viewsByPath.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      Nenhuma visualização registrada ainda.
                    </td>
                  </tr>
                ) : (
                  viewsByPath.map((row) => (
                    <tr
                      key={row.path}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition"
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {pathLabel(row.path)}
                        </span>
                        <span className="block text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5">
                          {row.path}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {row.total.toLocaleString("pt-BR")}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </AdminPageWrapper>
    </AdminLayout>
  );
}
