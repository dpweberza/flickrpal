import * as React from "react";
import { CssBaseline, makeStyles } from "@material-ui/core";

import Header from "./components/Header";
import PhotoSearch from "./components/PhotoSearch";
import Footer from "./components/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  }
}));

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header title="FlickrPal" />
      <PhotoSearch />
      <Footer
        text={
          <React.Fragment>
            Made with
            <span role="img" aria-label="love">
              ❤️
            </span>
            by David
          </React.Fragment>
        }
      />
    </div>
  );
}
