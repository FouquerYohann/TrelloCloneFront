import { useState } from "react";

export const useToggle = (initialState?: boolean): [boolean, () => void] => {
  const [open, setOpen] = useState(!!initialState);
  const toggle = () => setOpen((x) => !x);

  return [open, toggle];
};
