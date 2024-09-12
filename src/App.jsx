import { useState } from "react";
import DataTable from "./components/DataTable";
import Carousel from "./components/Carousal";

function App() {
  const [tab, setTab] = useState("table");

  return (
    <>
      <nav>
        <h2 className="heading">Dog Breeds</h2>
        <ul>
          <li>
            <button
              onClick={() => setTab("table")}
              className={tab === "table" ? "selected" : "not-selected"}
            >
              Table
            </button>
          </li>
          <li>
            <button
              onClick={() => setTab("carousel")}
              className={tab === "carousel" ? "selected" : "not-selected"}
            >
              Carousel
            </button>
          </li>
        </ul>
      </nav>

      {tab === "table" ? <DataTable /> : <Carousel />}
    </>
  );
}

export default App;
