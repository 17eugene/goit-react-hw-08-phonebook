import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

import authSelectors from "../../redux/selectors/auth-selector";

function PublicRoute({ children, restricted = false, ...routeProps }) {
  const loggedStatus = useSelector(authSelectors.getLoggedInStatus);
  const shouldRedirect = loggedStatus && restricted;

  return (
    <Route {...routeProps}>
      {shouldRedirect ? <Redirect to="/contacts" /> : children}
    </Route>
  );
}

export default PublicRoute;
