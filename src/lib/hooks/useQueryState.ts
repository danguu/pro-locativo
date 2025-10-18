import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const paramsToObject = (search: string) => {
  const searchParams = new URLSearchParams(search);
  const result: Record<string, string[]> = {};

  searchParams.forEach((value, key) => {
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(value);
  });

  return result;
};

export const useQueryState = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const current = paramsToObject(search);

  const setQuery = useCallback(
    (next: Record<string, string[] | undefined>) => {
      const searchParams = new URLSearchParams();

      Object.entries(next).forEach(([key, values]) => {
        if (!values || values.length === 0) return;
        values.forEach((value) => {
          searchParams.append(key, value);
        });
      });

      const nextSearch = searchParams.toString();
      navigate(`${pathname}${nextSearch ? `?${nextSearch}` : ""}`, { replace: true });
    },
    [navigate, pathname],
  );

  return { query: current, setQuery };
};
