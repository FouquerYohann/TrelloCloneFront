import { People } from "@/app/people/people";
import { FC } from "react";
import { Avatar } from "@mui/material";

type AvatarProps = {
  assignee?: People;
};

export const MyAvatar: FC<AvatarProps> = ({ assignee }) =>
  assignee?.avatar_url ? (
    <Avatar
      alt={`${assignee.first_name} ${assignee.last_name}`}
      src={assignee.avatar_url}
    />
  ) : (
    <Avatar>?</Avatar>
  );
