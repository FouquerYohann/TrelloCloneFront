import { FC, useState } from "react";
import Link from "next/link";
import { act } from "react-dom/test-utils";
import { Stack } from "@mui/material";
import { Home, Info, ListAlt, Person } from "@mui/icons-material";

type Truc = { text: string; href: string };

const MENU_LIST = [
  { text: "Home", href: "/", Icon: <Home /> },
  { text: "TodoList", href: "/todolist", Icon: <ListAlt /> },
  { text: "People", href: "/people", Icon: <Person /> },
  { text: "About us", href: "/about", Icon: <Info /> },
];

export const NavBar = () => {
  return (
    <Stack spacing={1} alignItems={"center"}>
      {MENU_LIST.map(({ href, text, Icon }, idx) => (
        <div key={href}>
          <Link href={href}>{Icon}</Link>
        </div>
      ))}
    </Stack>
  );
};
