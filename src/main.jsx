import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DataTable from "./components/DataTable.jsx";
import Carousal from "./components/Carousal.jsx";
import { PaginationProvider } from "./store/paginationStore.jsx";
import { CarousalProvider } from "./store/carousalStore.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <DataTable /> },
      {
        path: "/carousal",
        element: <Carousal />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PaginationProvider>
      <CarousalProvider>
        <RouterProvider router={router}></RouterProvider>
      </CarousalProvider>
    </PaginationProvider>
  </StrictMode>
);
