import React from "react";
import PropTypes from "prop-types";
import { makeStyles, AppBar, Toolbar, Typography } from "@material-ui/core";
import PhotoIcon from "@material-ui/icons/Photo";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    background: "linear-gradient(to right, #61c769 0%, #1db790 100%)",
    boxShadow:
      "0px 1px 5px 0px rgba(30, 184, 144, 0.25), 0px 2px 2px 0px rgba(30, 184, 144, 0.25), 0px 3px 1px -2px rgba(30, 184, 144, 0.25)",
    color: "#fff"
  },
  icon: {
    marginRight: theme.spacing(2)
  }
}));

interface Props {
  title: string;
}

export default function Header({ title }: Props) {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar className={classes.toolbar}>
        <PhotoIcon className={classes.icon} />
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  title: PropTypes.string
};
