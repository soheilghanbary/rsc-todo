import { getTodos } from "@/_action";
import { AddTodo } from "@/components/AddTodo";
import { TodoList } from "@/components/TodoList";
import TodoLength from "./TodoLength";
import { SearchTodo } from "@/components/SearchTodo";
import Link from "next/link";

export const dynamic = "auto";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const todos = await getTodos(searchParams.search);
  return (
    <section className="p-4 max-w-md mx-auto">
      <Link href={"/todos"}>go to todos</Link>
      <SearchTodo />
      <AddTodo />
      <TodoLength todos={todos} />
      <TodoList todos={todos} />
    </section>
  );
}
