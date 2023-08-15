import { Tag, Todo } from "@/app/todolist/todo";

export async function getTodos() {
  const res = await fetch("http://127.0.0.1:8000/todos", { cache: "no-cache" });
  const todos: Todo[] = await res.json();
  return todos;
}

export async function getTags() {
  const res = await fetch("http://127.0.0.1:8000/tags", { cache: "no-cache" });
  const tags: Tag[] = await res.json();
  return tags;
}
