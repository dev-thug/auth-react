import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

interface AccoutListItemProps {
  icon?: React.ReactNode;
  value: string;
}

const AccoutListItem = ({ icon, value }: AccoutListItemProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={value} />
      </ListItemButton>
    </ListItem>
  );
};

export default AccoutListItem;
