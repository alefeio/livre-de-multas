import { ReactNode } from "react";

interface AdminPageWrapperProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/**
 * Layout padrão para páginas do painel admin: título, subtítulo opcional e área de conteúdo.
 */
export default function AdminPageWrapper({ title, subtitle, children }: AdminPageWrapperProps) {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
