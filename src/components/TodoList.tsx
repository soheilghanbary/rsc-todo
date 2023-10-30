"use client";
import {
  useAllTodos,
  useDeleteTodo,
  useDoneTodo,
  useTodos,
} from "@/hooks/use-todo";
import { Todo } from "@prisma/client";
import { Button } from "./ui/button";
import { PropsWithChildren } from "react";

const Title = ({
  text,
  index,
  done,
}: {
  text: string;
  index: number;
  done: boolean;
}) => (
  <p className={done ? "text-muted-foreground line-through" : ""}>
    {index + 1}. {text}
  </p>
);

const TodoAction = ({ todo, index }: { todo: Todo; index: number }) => {
  const deleteMutation = useDeleteTodo();
  const doneMutation = useDoneTodo();

  return (
    <div className="flex items-center gap-4">
      <Button
        size={"sm"}
        variant={"destructive"}
        onClick={() => deleteMutation.mutate(todo.id)}
      >
        Delete
      </Button>
      <Button
        size={"sm"}
        disabled={doneMutation.isPending}
        onClick={() => doneMutation.mutate({ ...todo, done: !todo.done })}
      >
        Done
      </Button>
    </div>
  );
};

const TodoItem = ({ children }: PropsWithChildren) => (
  <li className="p-2 flex items-center justify-between rounded-md shadow-sm bg-background border">
    {children}
  </li>
);

const Todos = ({ children }: PropsWithChildren) => (
  <ul className="space-y-2 mt-4">{children}</ul>
);

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  const { data } = useTodos(todos);
  return (
    <Todos>
      {data.map((todo, i) => {
        const { id, done, text } = todo;
        return (
          <TodoItem key={id}>
            <Title text={text} done={done} index={i} />
            <TodoAction todo={todo} index={i} />
          </TodoItem>
        );
      })}
    </Todos>
  );
};
