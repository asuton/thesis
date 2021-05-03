import React, { useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../redux/actions/auth/login";
import { AppState } from "../redux/reducers/rootReducer";
import { Link, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { AuthActionTypes, AuthState } from "../redux/types/auth";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginTop: theme.spacing(25),
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

type Props = MapStateToProps & MapDispatchToProps;

const Login: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const [formData, setFormData] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    props.login(formData);
  };

  if (props.authState.isAuthenticated) {
    return <Redirect to="/patients" />;
  }

  return (
    <Container component="main" maxWidth="sm">
      <Typography component="h1" variant="h5" className={classes.title}>
        Prijava
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
        />
        <TextField
          className={classes.textField}
          required
          fullWidth
          id="password"
          label="Lozinka"
          type="password"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          className={classes.submit}
        >
          Prijava
        </Button>
        <Grid container justify="flex-start">
          <Grid item>
            Nemate zdravstveni karton? Registrirajte se{" "}
            <Link to="/register">ovdje</Link>.
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
