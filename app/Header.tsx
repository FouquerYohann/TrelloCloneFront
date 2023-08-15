"use client";

import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Todo } from "@/app/todolist/todo";
import React from "react";

export const Header = ({ posts }: { posts: Todo[] }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      paddingX={4}
      minHeight={"100%"}
    >
      <Typography variant="subtitle1">Kanban Board</Typography>
      <Autocomplete
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField {...params} label={"Search"} />
        )}
        options={posts.map((p) => p.title)}
      />
    </Stack>
  );
};
