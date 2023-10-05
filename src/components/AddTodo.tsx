"use client";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAddTodo } from "@/hooks/use-todo";

export const AddTodo = () => {
  const [text, setText] = useState("");

  const { mutate, isLoading } = useAddTodo();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.length) return;
    mutate(text);
    setText("");
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-4">
      <Input
        type="text"
        value={text}
        className="flex-1"
        placeholder="enter todo"
        onChange={(e) => setText(e.target.value)}
      />
      <Button disabled={isLoading} type="submit">
        Add Todo
      </Button>
    </form>
  );
};
