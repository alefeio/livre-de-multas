import Artigos from "./Artigos";

interface BlogProps {
  /** Na home: exibir só os primeiros N posts */
  limit?: number;
  /** Na home: exibir botão "Ver todos" */
  showVerTodos?: boolean;
  /** Na página /blog: posts por página (ativa paginação) */
  perPage?: number;
}

export default function Blog({ limit, showVerTodos, perPage }: BlogProps) {
  return (
    <Artigos limit={limit} showVerTodos={showVerTodos} perPage={perPage} />
  );
}
