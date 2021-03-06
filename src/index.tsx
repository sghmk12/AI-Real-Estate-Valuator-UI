import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { LoadScript } from "@react-google-maps/api";
import { ChakraProvider } from "@chakra-ui/react";

const apiKey: string = process.env.REACT_APP_GOOGLE_API_KEY ?? "";

ReactDOM.render(
  <React.StrictMode>
    <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </LoadScript>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
