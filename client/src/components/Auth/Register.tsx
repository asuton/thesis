import React, { useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { register } from "../../redux/actions/auth";
import { Link, Redirect } from "react-router-dom";
import { AppState } from "../../redux/reducers/rootReducer";
import { bindActionCreators } from "redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { AuthActionTypes, AuthState } from "../../redux/types/auth";
import { checkAuthorizationNav } from "../../helpers/authorization";
import { validateEmail } from "../../helpers/validate";
import { Step, StepLabel, Stepper } from "@material-ui/core";
import image from "../../assets/shield.svg";
import WebAuthnRegister from "../WebAuthn/WebAuthnRegister";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    minHeight: "100vh",
    paddingTop: "75px",
  },
  stepper: {
    maxWidth: 1000,
    margin: "auto",
  },
  title: {
    margin: theme.spacing(3, 0, 1),
  },
  container: {
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
  webauthn: {
    paddingTop: "60px",
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
  buttonGroup: {
    maxWidth: "300px",
    width: "inherit",
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
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

interface HelperState {
  helperTextName: string;
  helperTextSurname: string;
  helperTextEmail: string;
  helperTextPassword: string;
  helperTextOIB: string;
  helperTextDateOfBirth: string;
  helperTextAddress: string;
  helperTextPhone: string;
}

type Props = MapStateToProps & MapDispatchToProps;

const Register: React.FC<Props> = (props: Props) => {
  const { isAuthenticated, user } = props.authState;
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  const getSteps = () => {
    return [
      "Enter your personal information",
      "Secure your account with WebAuthn",
    ];
  };

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

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

  const [helperData, setHelperData] = useState<HelperState>({
    helperTextName: "",
    helperTextSurname: "",
    helperTextEmail: "",
    helperTextPassword: "",
    helperTextOIB: "",
    helperTextDateOfBirth: "",
    helperTextAddress: "",
    helperTextPhone: "",
  });

  const { name, surname, email, password, OIB, dateOfBirth, address, phone } =
    formData;

  const {
    helperTextName,
    helperTextSurname,
    helperTextEmail,
    helperTextPassword,
    helperTextOIB,
    helperTextDateOfBirth,
    helperTextAddress,
    helperTextPhone,
  } = helperData;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (e.target.id === "name")
      setHelperData({ ...helperData, helperTextName: "" });
    else if (e.target.id === "surname")
      setHelperData({ ...helperData, helperTextSurname: "" });
    else if (e.target.id === "OIB")
      setHelperData({ ...helperData, helperTextOIB: "" });
    else if (e.target.id === "address")
      setHelperData({ ...helperData, helperTextAddress: "" });
    else if (e.target.id === "phone")
      setHelperData({ ...helperData, helperTextPhone: "" });
    else if (e.target.id === "dateOfBirth")
      setHelperData({ ...helperData, helperTextDateOfBirth: "" });
    else if (e.target.id === "email")
      setHelperData({ ...helperData, helperTextEmail: "" });
    else if (e.target.id === "password")
      setHelperData({ ...helperData, helperTextPassword: "" });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (name === "") {
      setHelperData({
        ...helperData,
        helperTextName: "Empty field!",
      });
    } else if (surname === "") {
      setHelperData({
        ...helperData,
        helperTextSurname: "Empty field!",
      });
    } else if (OIB === "") {
      setHelperData({
        ...helperData,
        helperTextOIB: "Empty field!",
      });
    } else if (OIB.length < 11 || OIB.length > 11) {
      setHelperData({
        ...helperData,
        helperTextOIB: "OIB has to be 11 characters long",
      });
    } else if (address === "") {
      setHelperData({
        ...helperData,
        helperTextAddress: "Empty field!",
      });
    } else if (phone === "") {
      setHelperData({
        ...helperData,
        helperTextPhone: "Empty field!",
      });
    } else if (phone.length < 7) {
      setHelperData({
        ...helperData,
        helperTextPhone: "Phone number has to be at least 7 characters long",
      });
    } else if (dateOfBirth === "") {
      setHelperData({
        ...helperData,
        helperTextDateOfBirth: "Empty field!",
      });
    } else if (email === "") {
      setHelperData({
        ...helperData,
        helperTextEmail: "Empty field!",
      });
    } else if (!validateEmail(email)) {
      setHelperData({
        ...helperData,
        helperTextEmail: "Not a valid email address!",
      });
    } else if (password === "") {
      setHelperData({
        ...helperData,
        helperTextPassword: "Empty field!",
      });
    } else if (password.length < 7) {
      setHelperData({
        ...helperData,
        helperTextPassword: "Password has to be at least 7 characters long",
      });
    } else {
      props.register(formData);
      handleNext();
    }
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <Container
            component="main"
            maxWidth="sm"
            className={classes.container}
          >
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
                    error={helperTextName === "" ? false : true}
                    helperText={helperTextName}
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
                    error={helperTextSurname === "" ? false : true}
                    helperText={helperTextSurname}
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
                    error={helperTextOIB === "" ? false : true}
                    helperText={helperTextOIB}
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
                    error={helperTextAddress === "" ? false : true}
                    helperText={helperTextAddress}
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
                    error={helperTextPhone === "" ? false : true}
                    helperText={helperTextPhone}
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
                    error={helperTextDateOfBirth === "" ? false : true}
                    helperText={helperTextDateOfBirth}
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
                    error={helperTextEmail === "" ? false : true}
                    helperText={helperTextEmail}
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
                    error={helperTextPassword === "" ? false : true}
                    helperText={helperTextPassword}
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
                  Already have a medical record? Login{" "}
                  <Link to="/login">here</Link>.{" "}
                </Grid>
              </Grid>
            </form>
          </Container>
        );
      case 1:
        return (
          <Container className={classes.webauthn}>
            <img src={image} className={classes.image} alt="webauthn" />
            <Typography variant="h6" className={classes.text}>
              {" "}
              To be able to access your medical records and tests please create
              a credential which you will use for future verifications!
            </Typography>
            <div className={classes.buttonGroup}>
              <WebAuthnRegister />
            </div>
          </Container>
        );
      default:
        return null;
    }
  };

  if (activeStep === 0 && isAuthenticated && user) {
    return <Redirect to={checkAuthorizationNav(user)} />;
  }

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className={classes.stepper}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? null : getStepContent(activeStep)}
    </div>
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
