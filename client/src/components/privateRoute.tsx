import React from "react";
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { LoginState } from "../redux/types/auth/login";
import { AppState } from "../redux/reducers/rootReducer";

type Props = MapStateToProps & RouteProps;

const PrivateRoute: React.FC<Props> = ({
  component,
  authenticated,
  ...rest
}) => {
  if (!component) {
    throw Error("Component is not defined");
  }
  const Component = component;
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps<any>): React.ReactNode =>
        !authenticated.loggedIn ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

interface MapStateToProps {
  authenticated: LoginState;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  authenticated: state.login,
});

export default connect(mapStateToProps)(PrivateRoute);
