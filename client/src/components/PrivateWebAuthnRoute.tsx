import React from "react";
import { Route, RouteProps, RouteComponentProps } from "react-router";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "../redux/reducers/rootReducer";
import { WebAuthnState } from "../redux/types/webauthn";
import { AuthState } from "../redux/types/auth";
import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import WebAuthnLogin from "./WebAuthnLogin";
import image from "../shield.svg";

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
  webAuthnAuthenticated,
  ...rest
}) => {
  if (!component) {
    throw Error("Component is not defined");
  }
  const Component = component;
  const classes = useStyles();
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps<any>): React.ReactNode =>
        !authenticated.isAuthenticated ||
        !webAuthnAuthenticated.isAuthenticated ? (
          <Container className={classes.root}>
            <img src={image} className={classes.image} alt="webauthn" />
            <Typography variant="h6" className={classes.text}>
              {" "}
              This page is protected and requires additional verification to be
              viewed. Please verify your identity!
            </Typography>
            <div className={classes.buttonGroup}>
              <div className={classes.button}>
                <WebAuthnLogin></WebAuthnLogin>
              </div>
              <div className={classes.button}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  Go back
                </Button>
              </div>
            </div>
          </Container>
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
  webAuthnAuthenticated: state.webauthn,
});

export default connect(mapStateToProps)(PrivateRoute);
