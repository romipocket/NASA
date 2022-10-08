import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import "bootstrap/dist/css/bootstrap.css";
import { Outlet, Link } from "react-router-dom";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Romina Soto Site
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link to={`/`} className="nav-link" aria-current="page">
                    NASA
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`Tle`} className="nav-link">
                    TLE
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="text-muted py-5">
        <div className="container">
          <p className="float-end mb-1">
            <a href="#">Back to top</a>
          </p>
          <p className="mb-1">NASA Mars Rover Album By Romina Soto</p>
          <p className="mb-0">
            New to Nasa API?{" "}
            <a href="https://api.nasa.gov/">Visit the https://api.nasa.gov/</a>.
          </p>
        </div>
      </footer>
    </Provider>
  );
}

export default App;
