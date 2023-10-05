"use client";
import { useTodos } from "@/hooks/use-todo";
import { Todo } from "@prisma/client";

export default function TodoLength({ todos }: { todos: Todo[] }) {
  const { data } = useTodos(todos);
  return <h2>{data.length}</h2>;
}
