"use client";

import {
  Autocomplete,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getPeople } from "@/app/people/getPeople";
import { People } from "@/app/people/people";

const handleAssign = (id: number, people?: People | null) => async () => {
  if (!people) {
    return;
  }

  let input = `http://127.0.0.1:8000/assign/${people.id}/${id}`;
  console.log("calling", input);
  await fetch(input);
};

export const Assignation = ({ id }: { id: number }) => {
  const [selectedPerson, setSelectedPerson] = useState<
    People | undefined | null
  >();
  const [people, setPeople] = useState<People[]>([]);

  useEffect(() => {
    getPeople().then((result) => setPeople(result));
    return () => setPeople([]);
  }, []);

  return (
    <>
      {people.length ? (
        <FormControl>
          <Autocomplete
            sx={{ width: 200 }}
            onChange={(event, value) => setSelectedPerson(value)}
            options={people}
            getOptionLabel={(p) => `${p.first_name} ${p.last_name}`}
            renderInput={(params) => <TextField {...params} label="Assignee" />}
          />
          <Button onClick={handleAssign(id, selectedPerson)}> Assign </Button>
        </FormControl>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};
