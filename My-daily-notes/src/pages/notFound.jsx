import { useRouteError, Link } from "react-router-dom";
import "./notFound.css";

const NotFound = () => {
  const error = useRouteError();

  return (
    <div id="errorPage">
      <h1 className="errorTitle">404</h1>
      <p>Page not found</p>
      <p>{error.statusText || error.message}</p>
      <Link to="/notes">Return to Home</Link>
    </div>
  );
};

export default NotFound;
