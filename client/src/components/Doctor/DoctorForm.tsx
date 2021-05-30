import React, { useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { validateEmail } from "../../helpers/validate";
import { DoctorActionTypes, IPostDoctorForm } from "../../redux/types/doctor";
import { postDoctor } from "../../redux/actions/doctor";
import { Can } from "../Auth/Can";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import Back from "../Layout/Back";

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

interface HelperState {
  helperTextName: string;
  helperTextSurname: string;
  helperTextEmail: string;
  helperTextPassword: string;
  helperTextOIB: string;
  helperTextQualification: string;
  helperTextLicense: string;
  helperTextPhone: string;
}

type Props = MapDispatchToProps;

const RegisterDoctor: React.FC<Props> = (props: Props) => {
  const { postDoctor } = props;
  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = useState<IPostDoctorForm>({
    name: "",
    surname: "",
    email: "",
    password: "",
    OIB: "",
    qualification: "",
    license: "",
    phone: "",
  });

  const [helperData, setHelperData] = useState<HelperState>({
    helperTextName: "",
    helperTextSurname: "",
    helperTextEmail: "",
    helperTextPassword: "",
    helperTextOIB: "",
    helperTextQualification: "",
    helperTextLicense: "",
    helperTextPhone: "",
  });

  const { name, surname, email, password, OIB, qualification, license, phone } =
    formData;

  const {
    helperTextName,
    helperTextSurname,
    helperTextEmail,
    helperTextPassword,
    helperTextOIB,
    helperTextQualification,
    helperTextLicense,
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
    else if (e.target.id === "qualification")
      setHelperData({ ...helperData, helperTextQualification: "" });
    else if (e.target.id === "phone")
      setHelperData({ ...helperData, helperTextPhone: "" });
    else if (e.target.id === "license")
      setHelperData({ ...helperData, helperTextLicense: "" });
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
    } else if (license === "") {
      setHelperData({
        ...helperData,
        helperTextLicense: "Empty field!",
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
    } else if (qualification === "") {
      setHelperData({
        ...helperData,
        helperTextQualification: "Empty field!",
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
      postDoctor(formData, history);
    }
  };

  return (
    <Can I="create" a="Doctor">
      <div className={classes.root}>
        {" "}
        <Container component="main" maxWidth="sm" className={classes.container}>
          <Typography component="h1" variant="h5" className={classes.title}>
            <Back link={"/doctors"} />
            <br></br>
            Create doctor
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
                  id="license"
                  label="License"
                  value={license}
                  onChange={(e) => onChange(e)}
                  error={helperTextLicense === "" ? false : true}
                  helperText={helperTextLicense}
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
                  type="qualification"
                  id="qualification"
                  label="Qualification"
                  value={qualification}
                  onChange={(e) => onChange(e)}
                  error={helperTextQualification === "" ? false : true}
                  helperText={helperTextQualification}
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
              Create doctor
            </Button>
          </form>
        </Container>
      </div>
    </Can>
  );
};

interface MapDispatchToProps {
  postDoctor: (form: IPostDoctorForm, history: any) => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, DoctorActionTypes>
): MapDispatchToProps => ({
  postDoctor: bindActionCreators(postDoctor, dispatch),
});
export default connect(null, mapDispatchToProps)(RegisterDoctor);
