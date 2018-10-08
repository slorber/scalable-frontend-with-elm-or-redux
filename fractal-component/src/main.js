import "@babel/polyfill";

import React from "react";
import ReactDOM from "react-dom";

import jss from "jss";
import jssDefaultPreset from "jss-preset-default";

import { AppContainerUtils } from "fractal-component";
import App from "./components/App";

jss.setup(jssDefaultPreset());

AppContainerUtils.createAppContainer();

ReactDOM.render(<App />, document.getElementById("root"));
