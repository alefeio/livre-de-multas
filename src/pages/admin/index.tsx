import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminPageWrapper from "../../components/admin/AdminPageWrapper";
import {
  MdContactMail,
  MdReviews,
  MdHelpOutline,
  MdMenu,
  MdViewCarousel,
  MdPalette,
  MdAssignment,
  MdPhotoLibrary,
  MdArticle,
  MdTrendingUp,
} from "react-icons/md";

interface DashboardStats {
  contacts: number;
  contactsRecent: { id: string; name: string; createdAt: string }[];
  testimonials: number;
  faqs: number;
  blogPosts: number;
  projetos: number;
  tasksPendente: number;
  tasksEmAndamento: number;
  tasksConcluida: number;
  pageViewsTotal: number;
  pageViewsToday: number;
  pageViewsMonth: number;
}

const prisma = new PrismaClient();

function getStartOfTodayUTC() {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}
function getStartOfMonthUTC() {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
}

export const getServerSideProps: GetServerSideProps<{ stats: DashboardStats }> = async () => {
  try {
    const startOfToday = getStartOfTodayUTC();
    const startOfMonth = getStartOfMonthUTC();

    const [
      contactsCount,
      contactsRecent,
      testimonialsCount,
      faqsCount,
      blogCount,
      projetosCount,
      tasksPendente,
      tasksEmAndamento,
      tasksConcluida,
      pageViewsTotal,
      pageViewsToday,
      pageViewsMonth,
    ] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, createdAt: true },
      }),
      prisma.testimonial.count(),
      prisma.fAQ.count(),
      prisma.blog.count({ where: { publico: true } }),
      prisma.projetos.count(),
      prisma.task.count({ where: { status: "PENDENTE", deletedAt: null } }),
      prisma.task.count({ where: { status: "EM_ANDAMENTO", deletedAt: null } }),
      prisma.task.count({ where: { status: "CONCLUIDA", deletedAt: null } }),
      prisma.pageView.count(),
      prisma.pageView.count({ where: { createdAt: { gte: startOfToday } } }),
      prisma.pageView.count({ where: { createdAt: { gte: startOfMonth } } }),
    ]);

    const stats: DashboardStats = {
      contacts: contactsCount,
      contactsRecent: contactsRecent.map((c) => ({
        id: c.id,
        name: c.name,
        createdAt: c.createdAt.toISOString(),
      })),
      testimonials: testimonialsCount,
      faqs: faqsCount,
      blogPosts: blogCount,
      projetos: projetosCount,
      tasksPendente,
      tasksEmAndamento,
      tasksConcluida,
      pageViewsTotal,
      pageViewsToday,
      pageViewsMonth,
    };

    return { props: { stats: JSON.parse(JSON.stringify(stats)) } };
  } catch (e) {
    console.error("[Admin Dashboard] Erro ao buscar estatísticas:", e);
    return {
      props: {
        stats: {
          contacts: 0,
          contactsRecent: [],
          testimonials: 0,
          faqs: 0,
          blogPosts: 0,
          projetos: 0,
          tasksPendente: 0,
          tasksEmAndamento: 0,
          tasksConcluida: 0,
          pageViewsTotal: 0,
          pageViewsToday: 0,
          pageViewsMonth: 0,
        },
      },
    };
  } finally {
    await prisma.$disconnect();
  }
};

function StatCard({
  title,
  value,
  href,
  icon: Icon,
  subtitle,
}: {
  title: string;
  value: number | string;
  href: string;
  icon: React.ElementType;
  subtitle?: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:border-[#fec655]/40 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtitle && (
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
        <div className="rounded-lg bg-[#fec655]/10 p-2 text-[#fec655]">
          <Icon className="text-2xl" />
        </div>
      </div>
    </Link>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminDashboard({ stats }: { stats: DashboardStats }) {
  return (
    <AdminLayout>
      <AdminPageWrapper
        title="Dashboard"
        subtitle="Visão geral do conteúdo e das mensagens do site."
      >
        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          <Link
            href="/admin/pageviews"
            className="block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:border-[#fec655]/40 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Acessos ao site</p>
                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{stats.pageViewsTotal.toLocaleString("pt-BR")}</p>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  Hoje: {stats.pageViewsToday.toLocaleString("pt-BR")} · Este mês: {stats.pageViewsMonth.toLocaleString("pt-BR")}
                </p>
                <p className="mt-2 text-sm font-medium text-[#fec655] hover:underline">
                  Ver detalhes →
                </p>
              </div>
              <div className="rounded-lg bg-[#fec655]/10 p-2 text-[#fec655]">
                <MdTrendingUp className="text-2xl" />
              </div>
            </div>
          </Link>
          <StatCard
            title="Contatos (Analisar meu caso)"
            value={stats.contacts}
            href="/admin/contacts"
            icon={MdContactMail}
            subtitle="Mensagens do formulário"
          />
          <StatCard
            title="Depoimentos"
            value={stats.testimonials}
            href="/admin/testimonials"
            icon={MdReviews}
          />
          <StatCard
            title="Perguntas (FAQ)"
            value={stats.faqs}
            href="/admin/faq"
            icon={MdHelpOutline}
          />
          <StatCard
            title="Artigos do blog"
            value={stats.blogPosts}
            href="/admin/blog"
            icon={MdArticle}
            subtitle="Posts públicos"
          />
          <StatCard
            title="Cases / Projetos"
            value={stats.projetos}
            href="/admin/projetos"
            icon={MdPalette}
          />
          <StatCard
            title="Tarefas pendentes"
            value={stats.tasksPendente}
            href="/admin/tasks"
            icon={MdAssignment}
            subtitle={`${stats.tasksEmAndamento} em andamento · ${stats.tasksConcluida} concluídas`}
          />
        </div>

        {/* Últimos contatos */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Últimas mensagens (Analisar meu caso)
            </h2>
            <Link
              href="/admin/contacts"
              className="text-sm font-medium text-[#fec655] hover:underline"
            >
              Ver todas →
            </Link>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {stats.contactsRecent.length === 0 ? (
              <p className="px-6 py-8 text-gray-500 dark:text-gray-400 text-center">
                Nenhuma mensagem recebida ainda.
              </p>
            ) : (
              stats.contactsRecent.map((c) => (
                <Link
                  key={c.id}
                  href="/admin/contacts"
                  className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <span className="font-medium text-gray-900 dark:text-white">{c.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(c.createdAt)}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Atalhos rápidos */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/admin/menu"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            <MdMenu /> Menu
          </Link>
          <Link
            href="/admin/banner"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            <MdViewCarousel /> Banner
          </Link>
          <Link
            href="/admin/files"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            <MdPhotoLibrary /> Arquivos
          </Link>
        </div>
      </AdminPageWrapper>
    </AdminLayout>
  );
}
