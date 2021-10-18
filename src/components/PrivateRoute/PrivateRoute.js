import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

import authSelectors from "../../redux/selectors/auth-selector";

function PrivateRouter({ children, redirectTo = "/login", ...routeProps }) {
  const loggedStatus = useSelector(authSelectors.getLoggedInStatus);

  return (
    <Route {...routeProps}>
      {loggedStatus ? children : <Redirect to={redirectTo} />}
    </Route>
  );
}

export default PrivateRouter;
