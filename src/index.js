import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";

const theme = extendTheme({
  fontFamily: {
    body: "'DM Mono', monospace;",
  },
  colorSchemes: {
    light: {
      palette: {
        text: {
          primary: "#e2e8f0",
          secondary: "#64748b",
          tertiary: "#0c0e14",
        },
        background: {
          body: "#0c0e14",
          surface: "#13151e",
          level1: "#1a1d28",
        },
        button: {
          primary: "#38bdf8",
        },
        border: {
          primary: "rgba(255,255,255,0.1)",
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CssVarsProvider
      theme={theme}
      defaultMode="light"
      disableTransitionOnChange
    >
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
