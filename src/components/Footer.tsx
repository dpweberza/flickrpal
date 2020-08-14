import React, { ReactNode } from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    marginTop: "auto"
  }
}));

interface Props {
  text: ReactNode;
}

export default function Footer({ text }: Props) {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        {text}
      </Typography>
    </footer>
  );
}
