import {
  Autocomplete,
  Button,
  createFilterOptions,
  FormControl,
  FormLabel,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { FC, useReducer } from "react";

type FormState = {
  title: string;
  tags: string[];
  description?: string;
};

const initialForm: FormState = {
  title: "initTitle",
  tags: [],
};

type FormAction =
  | { type: "CHANGE_TITLE"; title: string }
  | { type: "ADD_TAG"; tags: string[] }
  | { type: "CHANGE_DESCRIPTION"; description: string };

const reducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "ADD_TAG":
      return { ...state, tags: action.tags };
    case "CHANGE_TITLE":
      return { ...state, title: action.title };
    case "CHANGE_DESCRIPTION":
      return { ...state, description: action.description };
  }
};

const changeTitleAction = (title: string): FormAction => ({
  type: "CHANGE_TITLE",
  title,
});
const changeDescriptionAction = (description: string): FormAction => ({
  type: "CHANGE_DESCRIPTION",
  description,
});
const addTagAction = (tags: string[]): FormAction => ({
  type: "ADD_TAG",
  tags,
});

const filter = createFilterOptions<string>();

export const NewTaskForm: FC<{ toggle: () => void; tags: string[] }> = ({
  toggle,
  tags,
}) => {
  const [state, dispatch] = useReducer(reducer, initialForm);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!state.title) {
      return;
    }

    console.log("yfo", state);

    fetch("http://127.0.0.1:8000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });
    toggle();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl>
        <FormLabel>Enter Title</FormLabel>
        <TextField
          value={state.title}
          onChange={(e) => dispatch(changeTitleAction(e.target.value))}
        />
        <FormLabel>Enter Description</FormLabel>
        <TextareaAutosize
          value={state.description}
          onChange={(e) => dispatch(changeDescriptionAction(e.target.value))}
        />
        {tags && (
          <Autocomplete
            multiple
            options={tags}
            onChange={(e, newValue) => dispatch(addTagAction(newValue))}
            renderInput={(params) => (
              <TextField
                {...params}
                variant={"standard"}
                placeholder={"Tags"}
              />
            )}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              if (params.inputValue !== "") {
                return [...filtered, `${params.inputValue}`];
              }

              return filtered;
            }}
          />
        )}
        <Button type="submit">Submit</Button>
      </FormControl>
    </form>
  );
};
