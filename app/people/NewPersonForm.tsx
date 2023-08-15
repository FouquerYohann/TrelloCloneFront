"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import React, { useReducer } from "react";

type PersonState = {
  first_name: string;
  last_name: string;
};

const initialPersonState = { first_name: "", last_name: "" };

type PersonAction =
  | { type: "CHANGE_FIRST_NAME"; first_name: string }
  | { type: "CHANGE_LAST_NAME"; last_name: string };

const reducer = (state: PersonState, action: PersonAction) => {
  switch (action.type) {
    case "CHANGE_FIRST_NAME":
      return { ...state, first_name: action.first_name };
    case "CHANGE_LAST_NAME":
      return { ...state, last_name: action.last_name };
  }
};

const changeFirstNameAction = (first_name: string): PersonAction => ({
  type: "CHANGE_FIRST_NAME",
  first_name,
});
const changeLastNameAction = (last_name: string): PersonAction => ({
  type: "CHANGE_LAST_NAME",
  last_name,
});

export const NewPersonForm = ({ toggle }: { toggle: () => void }) => {
  const [state, dispatch] = useReducer(reducer, initialPersonState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.first_name || !state.last_name) {
      return;
    }

    fetch("http://127.0.0.1:8000/people", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });
    toggle();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Stack spacing={4}>
            <Stack>
              <FormLabel>First name</FormLabel>
              <TextField
                onChange={(e) =>
                  dispatch(changeFirstNameAction(e.target.value))
                }
              />
            </Stack>
            <Stack>
              <FormLabel>Last name</FormLabel>
              <TextField
                onChange={(e) => dispatch(changeLastNameAction(e.target.value))}
              />
            </Stack>
          </Stack>
          <Button type="submit">Register</Button>
        </FormControl>
      </form>
    </Box>
  );
};
