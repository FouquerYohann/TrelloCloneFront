import React from "react";
import { Box } from "@mui/material";
import { getTodos } from "@/app/todolist/getTodos";
import { Todo, TodoStatuses } from "@/app/todolist/todo";
import { TodoColumn } from "@/app/todolist/todoColumn";

const TodosPage = async () => {
  const todos: Todo[] = await getTodos();
  console.log(todos);

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      gap={2}
      paddingX={2}
    >
      {TodoStatuses.map((status) => (
        <TodoColumn
          key={status}
          todosToShow={todos.filter((t) => t.status === status)}
          status={status}
        />
      ))}
    </Box>
  );
};

export default TodosPage;
