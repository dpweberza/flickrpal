import React from "react";
import { makeStyles, Chip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

interface Props {
  tags: string[];
  onTagSelect: (tag: string) => void;
}

export default function Tags({ tags, onTagSelect }: Props) {
  const classes = useStyles();
  return (
    <ul className={classes.root}>
      {tags.map((tag) => (
        <li key={tag}>
          <Chip
            label={tag}
            size="small"
            className={classes.chip}
            clickable
            onClick={() => onTagSelect(tag)}
            color="primary"
          />
        </li>
      ))}
    </ul>
  );
}
