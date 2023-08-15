import { Stack, Typography } from "@mui/material";
import React from "react";
import { NewPersonModal } from "@/app/people/NewPersonModal";
import { getPeople } from "@/app/people/getPeople";
import { PeopleCard } from "@/app/people/peopleCard";

const PeoplePage = async () => {
  const people = await getPeople();

  return (
    <>
      <Typography variant="h2" className="pb-4">
        Look at all our people
      </Typography>
      <Stack spacing={4}>
        {people.map((p) => (
          <PeopleCard key={p.id} {...p} />
        ))}
      </Stack>
      <NewPersonModal />
    </>
  );
};

export default PeoplePage;
