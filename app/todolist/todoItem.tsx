"use client";
import React, { FC, useState } from "react";
import { Todo, TodoStatus } from "@/app/todolist/todo";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Assignation } from "@/app/todolist/assignation";
import { bgcolor } from "@mui/system";
import { MyAvatar } from "@/app/component/Avatar";

type ContextMenu = {
  mouseX: number;
  mouseY: number;
};

// move
const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name: string) => ({
  sx: {
    bgcolor: stringToColor(name),
  },
  children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
});

export const TodoItem: FC<Todo> = ({
  id,
  title,
  description,
  assignee,
  tags,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu ?? { mouseX: event.clientX + 2, mouseY: event.clientY - 6 },
    );
  };

  const onDragStart = (event: React.DragEvent<Element>) => {
    event.dataTransfer.setData(
      "cardId",
      JSON.stringify({
        id,
        title,
        description,
        tags,
        assignee_id: assignee?.id,
      }),
    );
    // setIsDragging(true);
  };

  const handleClose = (status: TodoStatus) => (e: React.MouseEvent) => {
    console.log("yfo", `http://127.0.0.1:8000/todos/${id}/patch`, {
      id,
      title,
      description,
      tags: tags.map((t) => t.name),
      assignee_id: assignee?.id,
      status,
    });

    fetch(`http://127.0.0.1:8000/todos/${id}/patch`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        description,
        tags: tags.map((t) => t.name),
        assignee_id: assignee?.id,
        status,
      }),
    });

    setContextMenu(null);
  };

  const deleteTodo = () => {
    fetch(`http://127.0.0.1:8000/todos/${id}`, { method: "DELETE" });
  };

  return (
    <div
      draggable={true}
      onDragStart={onDragStart}
      onDragLeave={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
      onContextMenu={handleContextMenu}
      style={{ cursor: "context-menu" }}
    >
      <Card>
        <CardHeader
          avatar={<MyAvatar assignee={assignee} />}
          title={
            assignee ? (
              <Typography variant="body1">
                {assignee.first_name}, {assignee.last_name}
              </Typography>
            ) : (
              <Typography variant="body1" color="red">
                Unassigned
              </Typography>
            )
          }
          action={
            <IconButton onClick={deleteTodo}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Typography variant="h5" noWrap textOverflow="ellipsis">
            {title}
          </Typography>
          <Typography
            variant="body2"
            noWrap
            textOverflow="ellipsis"
            color="text.secondary"
          >
            {description}
          </Typography>
          <Box paddingTop={2}>
            <Assignation id={id} />
          </Box>
        </CardContent>
        <CardActions>
          <Stack direction="row" gap={1}>
            {tags.map((t) => (
              <Chip
                key={t.id}
                label={t.name}
                sx={{ backgroundColor: `${stringToColor(t.name)}` }}
              />
            ))}
          </Stack>
        </CardActions>
      </Card>
      <Menu
        open={!!contextMenu}
        onClose={(e) => setContextMenu(null)}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose("TODO")}>Send to todo</MenuItem>
        <MenuItem onClick={handleClose("IN_PROGRESS")}>
          Send to Progress
        </MenuItem>
        <MenuItem onClick={handleClose("DONE")}>Send to Done</MenuItem>
      </Menu>
    </div>
  );
};
