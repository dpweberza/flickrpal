import * as React from "react";
import { render } from "react-dom";
import { ThemeProvider } from "@material-ui/styles";

import { theme } from "./theme";
import App from "./App";

const rootElement = document.getElementById("root");
render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  rootElement
);
