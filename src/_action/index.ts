"use server";
import { db } from "@/lib/db";
import { Todo } from "@prisma/client";

export const getTodos = async (query: string) => {
  if (query) {
    return await db.todo.findMany({ where: { text: { contains: query } } });
  } else {
    return await db.todo.findMany();
  }
};

export const getAllTodos = async () => await db.todo.findMany();

export const allTodos = async () => await db.todo.findMany();

export const addTodo = async (text: string) =>
  await db.todo.create({ data: { text } });

export const deleteTodo = async (id: string) =>
  await db.todo.delete({ where: { id } });

export const doneTodo = async ({ id, done }: Todo) =>
  await db.todo.update({ where: { id }, data: { done } });
