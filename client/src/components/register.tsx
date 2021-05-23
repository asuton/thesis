import React, { useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { register } from "../redux/actions/auth/register";
import { Link, Redirect } from "react-router-dom";
import { AppState } from "../redux/reducers/rootReducer";
import { bindActionCreators } from "redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { AuthActionTypes, AuthState } from "../redux/types/auth";
import { checkAuthorizationNav } from "../helpers/authorization";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    margin: theme.spacing(3, 0, 1),
  },
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
    margin: theme.spacing(1, 0, 1),
  },
  submit: {
    margin: theme.spacing(3, 0, 3),
  },
  link: {
    marginBottom: theme.spacing(3),
  },
}));

interface RegisterFormState {
  name: string;
  surname: string;
  email: string;
  password: string;
  OIB: string;
  dateOfBirth: string;
  address: string;
  phone: string;
}

type Props = MapStateToProps & MapDispatchToProps;

const Register: React.FC<Props> = (props: Props) => {
  const { isAuthenticated, user } = props.authState;
  const classes = useStyles();
  const [formData, setFormData] = useState<RegisterFormState>({
    name: "",
    surname: "",
    email: "",
    password: "",
    OIB: "",
    dateOfBirth: "",
    address: "",
    phone: "",
  });

  const { name, surname, email, password, OIB, dateOfBirth, address, phone } =
    formData;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    props.register(formData);
  };

  if (isAuthenticated && user) {
    return <Redirect to={checkAuthorizationNav(user)} />;
  }

  return (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <Typography component="h1" variant="h5" className={classes.title}>
        Register
      </Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={(e) => onSubmit(e)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              className={classes.textField}
              required
              fullWidth
              id="name"
              label="Name"
              value={name}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              className={classes.textField}
              required
              fullWidth
              id="surname"
              label="Surname"
              value={surname}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              required
              fullWidth
              id="OIB"
              label="OIB"
              value={OIB}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              required
              fullWidth
              id="address"
              label="Address"
              value={address}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              required
              fullWidth
              id="phone"
              label="Phone number"
              value={phone}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              required
              fullWidth
              type="date"
              id="dateOfBirth"
              label="Date of birth"
              InputLabelProps={{
                shrink: true,
              }}
              value={dateOfBirth}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              required
              fullWidth
              id="email"
              label="E-mail"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => onChange(e)}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          className={classes.submit}
        >
          Register
        </Button>
        <Grid container justify="flex-start" className={classes.link}>
          <Grid item>
            Already have a medical record? Login <Link to="/login">here</Link>.{" "}
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
  register: (form: RegisterFormState) => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  authState: state.auth,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AuthActionTypes>
): MapDispatchToProps => ({
  register: bindActionCreators(register, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
