import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <nav>
        <h2 className="heading">Dog Breeds</h2>
        <ul>
          <li>
            <Link to="/">Table</Link>
          </li>
          <li>
            <Link to="/carousal">Carousal</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
