import React, { useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../../redux/actions/auth";
import { AppState } from "../../redux/reducers/rootReducer";
import { Link, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { AuthActionTypes, AuthState } from "../../redux/types/auth";
import { checkAuthorizationNav } from "../../helpers/authorization";
import { validateEmail } from "../../helpers/validate";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: "60px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  form: {
    width: "100%",
  },
  textField: {
    margin: theme.spacing(2, 0, 1),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
}));

interface LoginFormState {
  email: string;
  password: string;
}

interface HelperState {
  helperTextEmail: string;
  helperTextPassword: string;
}

type Props = MapStateToProps & MapDispatchToProps;

const Login: React.FC<Props> = (props: Props) => {
  const { isAuthenticated, user } = props.authState;

  const classes = useStyles();

  const [formData, setFormData] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [helperData, setHelperData] = useState<HelperState>({
    helperTextEmail: "",
    helperTextPassword: "",
  });

  const { email, password } = formData;
  const { helperTextEmail, helperTextPassword } = helperData;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (e.target.id === "email")
      setHelperData({ ...helperData, helperTextEmail: "" });
    else if (e.target.id === "password")
      setHelperData({ ...helperData, helperTextPassword: "" });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (email === "")
      setHelperData({
        ...helperData,
        helperTextEmail: "Empty field!",
      });
    else if (!validateEmail(email))
      setHelperData({
        ...helperData,
        helperTextEmail: "Not a valid email address!",
      });
    else if (password.length < 7)
      setHelperData({
        ...helperData,
        helperTextPassword: "Password has to be at least 7 characters long",
      });
    else props.login(formData);
  };

  if (isAuthenticated && user) {
    return <Redirect to={checkAuthorizationNav(user)} />;
  }

  return (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={(e) => onSubmit(e)}
      >
        <TextField
          className={classes.textField}
          required
          fullWidth
          id="email"
          label="E-mail"
          value={email}
          onChange={(e) => onChange(e)}
          error={helperTextEmail === "" ? false : true}
          helperText={helperTextEmail}
        />
        <TextField
          className={classes.textField}
          required
          fullWidth
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => onChange(e)}
          error={helperTextPassword === "" ? false : true}
          helperText={helperTextPassword}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          className={classes.submit}
        >
          Login
        </Button>
        <Grid container justify="flex-start">
          <Grid item>
            Don't have a medical record? Register{" "}
            <Link to="/register">here</Link>.
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

interface MapStateToProps {
  authState: AuthState;
}

interface MapDispatchToProps {
  login: ({ email, password }: { email: string; password: string }) => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  authState: state.auth,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AuthActionTypes>
): MapDispatchToProps => ({
  login: bindActionCreators(login, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
