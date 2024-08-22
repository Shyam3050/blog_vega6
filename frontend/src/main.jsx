import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import { RouterProvider } from "react-router-dom";
import router_config from "./router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <RouterProvider router={router_config} />
    </ChakraProvider>
  </StrictMode>
);
