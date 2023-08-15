"use client";
import { useToggle } from "@/app/hooks/useToggle";
import { StyledModal } from "@/app/component/StyledModal";
import { Box, Button } from "@mui/material";
import React from "react";
import { NewPersonForm } from "@/app/people/NewPersonForm";

export const NewPersonModal = () => {
  const [open, toggle] = useToggle();

  return (
    <>
      <Box sx={{ pt: 4 }}>
        <Button variant="contained" onClick={toggle}>
          Register
        </Button>
      </Box>
      <StyledModal isOpen={open} toggle={toggle}>
        <NewPersonForm toggle={toggle} />
      </StyledModal>
    </>
  );
};
