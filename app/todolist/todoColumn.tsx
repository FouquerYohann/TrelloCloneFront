"use client";

import { Todo, TodoStatus } from "@/app/todolist/todo";
import { Box, Stack, Typography } from "@mui/material";
import React, { DragEventHandler, FC } from "react";
import { TodoItem } from "@/app/todolist/todoItem";
import { NewTaskModal } from "@/app/todolist/newTaskModal";

type Props = { todosToShow: Todo[]; status: TodoStatus };

export const TodoColumn: FC<Props> = ({ todosToShow, status }) => {
  const onDrop = (event: React.DragEvent) => {
    const data = JSON.parse(event.dataTransfer.getData("cardId"));
    const newData = { ...data, status };

    fetch(`http://127.0.0.1:8000/todos/${data.id}/patch`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
  };

  return (
    <Box
      key={status}
      gridColumn="span 1"
      onDragEnter={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <Typography variant="h5">{status}</Typography>
      <Stack spacing={4}>
        {todosToShow.map((t) => (
          <TodoItem key={t.id} {...t} />
        ))}
        <NewTaskModal />
      </Stack>
    </Box>
  );
};
