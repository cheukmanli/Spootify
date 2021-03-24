import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import Discover from "./routes/Discover";
import CoreLayout from "./common/layouts/CoreLayout";
import "./styles/_main.scss";

ReactDOM.render(
  <React.StrictMode>
    <CoreLayout>
      <Discover />
    </CoreLayout>
  </React.StrictMode>,
  document.getElementById("root")
);
