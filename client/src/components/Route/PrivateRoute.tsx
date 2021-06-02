import React from "react";
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { AppState } from "../../redux/reducers/rootReducer";
import { AuthState } from "../../redux/types/auth";
import WebAuthnRegister from "../WebAuthn/WebAuthnRegister";
import { Container, makeStyles, Typography } from "@material-ui/core";
import image from "../../assets/shield.svg";

const useStyles = makeStyles({
  root: {
    paddingTop: "75px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    maxWidth: "300px",
    display: "block",
    marginBottom: "50px",
  },
  text: {
    marginBottom: "30px",
  },
  button: {
    maxWidth: "250px",
    width: "inherit",
    marginBottom: "20px",
  },
  buttonGroup: {
    maxWidth: "700px",
    width: "inherit",
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
});

type Props = MapStateToProps & RouteProps;

const PrivateRoute: React.FC<Props> = ({
  component,
  authenticated,
  ...rest
}) => {
  const { isAuthenticated, user } = authenticated;
  const classes = useStyles();
  if (!component) {
    throw Error("Component is not defined");
  }
  const Component = component;
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps<any>): React.ReactNode =>
        !isAuthenticated ? (
          <Redirect to="/login" />
        ) : user && user.webAuthnRegistered ? (
          <Component {...props} />
        ) : (
          <Container className={classes.root}>
            <img src={image} className={classes.image} alt="webauthn" />
            <Typography variant="h6" className={classes.text}>
              {" "}
              You haven't completed your registration! Please create a
              credential so you can proceed.
            </Typography>
            <div className={classes.buttonGroup}>
              <div className={classes.button}>
                <WebAuthnRegister></WebAuthnRegister>
              </div>
            </div>
          </Container>
        )
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
