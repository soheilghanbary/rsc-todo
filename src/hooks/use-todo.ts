import { Todo } from "@prisma/client";
import { addTodo, deleteTodo, doneTodo, getTodos } from "@/_action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const useQuerySearch = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("search");
  return query || "";
};

export const useTodos = (todos: Todo[]) => {
  const query = useQuerySearch();
  return useQuery({
    queryKey: ["todos", query],
    queryFn: () => getTodos(query),
    initialData: todos,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  const query = useQuerySearch();
  return useMutation({
    mutationFn: (text: string) => addTodo(text),
    onSettled(data) {
      queryClient.setQueryData(["todos", query], (oldTodos: any) => {
        return [...oldTodos, data];
      });
    },
  });
};

export const useDeleteTodo = () => {
  const query = useQuerySearch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onMutate(id) {
      queryClient.setQueryData(["todos", query], (oldTodos: any) => {
        return oldTodos.filter((t: Todo) => t.id !== id);
      });
    },
  });
};

export const useDoneTodo = () => {
  const query = useQuerySearch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo: Todo) => doneTodo(todo),
    onMutate(todo) {
      queryClient.setQueryData(["todos", query], (oldTodos: any) => {
        return oldTodos.map((t: Todo) => {
          if (t.id === todo.id) {
            return { ...t, done: todo.done };
          } else {
            return t;
          }
        });
      });
    },
  });
};
