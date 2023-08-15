"use client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { MyAvatar } from "@/app/component/Avatar";
import { People } from "@/app/people/people";

export function PeopleCard(props: People) {
  const { id, first_name, last_name, avatar_url } = props;
  const [file, setFile] = useState<File>();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];

    const formData = new FormData();
    formData.set("avatar_img", file);

    const res = await fetch(`http://127.0.0.1:8000/people/${id}/avatar`, {
      method: "PUT",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }
  };

  return (
    <Card>
      <CardContent>
        <MyAvatar assignee={props} />
        <Typography variant="body1"> {first_name}</Typography>
        <Typography variant="body2"> {last_name}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="text" component="label">
          Upload Avatar
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleFileUpload}
          />
        </Button>
      </CardActions>
    </Card>
  );
}
