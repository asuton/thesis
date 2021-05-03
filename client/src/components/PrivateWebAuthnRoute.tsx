import React from "react";
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { AppState } from "../redux/reducers/rootReducer";
import { WebAuthnState } from "../redux/types/webauthn";
import { AuthState } from "../redux/types/auth";

type Props = MapStateToProps & RouteProps;

const PrivateRoute: React.FC<Props> = ({
  component,
  authenticated,
  webAuthnAuthenticated,
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
        !authenticated.isAuthenticated &&
        !webAuthnAuthenticated.isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

interface MapStateToProps {
  authenticated: AuthState;
  webAuthnAuthenticated: WebAuthnState;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  authenticated: state.auth,
  webAuthnAuthenticated: state.webatuhn,
});

export default connect(mapStateToProps)(PrivateRoute);
