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

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    margin: theme.spacing(7, 0, 4),
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

  const {
    name,
    surname,
    email,
    password,
    OIB,
    dateOfBirth,
    address,
    phone,
  } = formData;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    props.register(formData);
  };

  if (props.authState.isAuthenticated) {
    return <Redirect to="/patients" />;
  }

  return (
    <Container component="main" maxWidth="sm">
      <Typography component="h1" variant="h5" className={classes.title}>
        Registracija
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
              label="Ime"
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
              label="Prezime"
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
              label="Adresa"
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
              label="Kontakt"
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
              label="Datum rođenja"
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
              label="Lozinka"
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
          Prijava
        </Button>
        <Grid container justify="flex-start" className={classes.link}>
          <Grid item>
            Imate zdravstveni karton? Prijavite se <Link to="/">ovdje</Link>.{" "}
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
