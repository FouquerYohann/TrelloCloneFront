"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  styled,
  Theme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useToggle } from "@/app/hooks/useToggle";
import { NewTaskForm } from "@/app/todolist/newTaskForm";
import { StyledModal } from "@/app/component/StyledModal";
import { getTags } from "@/app/todolist/getTodos";

export const NewTaskModal = () => {
  const [open, toggle] = useToggle();
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    getTags().then((tags) => setTags(tags.map((t) => t.name)));
  }, []);

  return (
    <>
      <Card>
        <CardContent>
          <Button onClick={toggle}>Create new Task</Button>
        </CardContent>
      </Card>
      <StyledModal isOpen={open} toggle={toggle}>
        <NewTaskForm toggle={toggle} tags={tags} />
      </StyledModal>
    </>
  );
};
