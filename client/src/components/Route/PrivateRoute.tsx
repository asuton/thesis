import React from "react";
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { AppState } from "../../redux/reducers/rootReducer";
import { AuthState } from "../../redux/types/auth";

type Props = MapStateToProps & RouteProps;

const PrivateRoute: React.FC<Props> = ({
  component,
  authenticated,
  ...rest
}) => {
  const { isAuthenticated } = authenticated;
  if (!component) {
    throw Error("Component is not defined");
  }
  const Component = component;
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps<any>): React.ReactNode =>
        !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

interface MapStateToProps {
  authenticated: AuthState;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  authenticated: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
