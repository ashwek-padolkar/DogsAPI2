import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { PaginationProvider } from "./store/paginationStore.jsx";
import { CarousalProvider } from "./store/carousalStore.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PaginationProvider>
      <CarousalProvider>
        <App />
      </CarousalProvider>
    </PaginationProvider>
  </StrictMode>
);
