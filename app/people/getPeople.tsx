import { People } from "@/app/people/people";

export const getPeople = async () => {
  const res = await fetch("http://127.0.0.1:8000/people", {
    next: { revalidate: 5 },
  });
  const people: People[] = await res.json();
  return people;
};
