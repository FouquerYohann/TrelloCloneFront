import { People } from "@/app/people/people";

export const TodoStatuses = ["TODO", "IN_PROGRESS", "DONE"] as const;
export type TodoStatus = (typeof TodoStatuses)[number];

export type Tag = {
  id: number;
  name: string;
};

export type Todo = {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  assignee?: People;
  tags: Tag[];
};
