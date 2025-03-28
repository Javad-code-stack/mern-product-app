import "./index.css";
import App from "./App";
import React from "react";

import { BrowserRouter } from "react-router";

import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider
                theme={extendTheme({
                    direction: "rtl",
                })}
            >
                <App />
            </ChakraProvider>
        </BrowserRouter>
    </React.StrictMode>
);
