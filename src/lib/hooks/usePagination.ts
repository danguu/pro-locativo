import { useMemo, useState } from "react";

export const usePagination = <T,>(items: T[], pageSize = 6) => {
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));

  const currentItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const goToPage = (nextPage: number) => {
    setPage(Math.min(Math.max(nextPage, 1), pageCount));
  };

  const reset = () => setPage(1);

  return { page, pageCount, currentItems, goToPage, reset };
};
