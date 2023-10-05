"use client";
import { useCallback, useState } from "react";
import { Input } from "./ui/input";
import { useDebounce } from "use-debounce";
import { useDidUpdate } from "@/hooks/use-update";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SearchTodo = () => {
  const searchParams = useSearchParams()!;
  const [text, setText] = useState(searchParams.get("search")! || "");
  const router = useRouter();
  const pathname = usePathname();
  const [query] = useDebounce(text, 500);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useDidUpdate(() => {
    query.length
      ? router.push(pathname + "?" + createQueryString("search", query))
      : router.replace("/");
  }, [query, searchParams.get("search")]);

  return (
    <Input
      type="text"
      value={text}
      className="mb-4"
      placeholder="search todo"
      onChange={(e) => setText(e.target.value)}
    />
  );
};
