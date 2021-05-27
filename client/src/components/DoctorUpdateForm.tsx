import React, { useState, useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { AppState } from "../redux/reducers/rootReducer";
import { bindActionCreators } from "redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Loading from "./Loading";
import { RouteComponentProps, useHistory } from "react-router";
import { getDoctorById, putDoctor } from "../redux/actions/doctor";
import {
  DoctorActionTypes,
  DoctorState,
  IPutDoctorForm,
} from "../redux/types/doctor";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    margin: theme.spacing(3, 0, 1),
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    minHeight: "100vh",
  },
  form: {
    width: "100%",
  },
  textField: {
    margin: theme.spacing(1, 0, 1),
  },
  link: {
    marginBottom: theme.spacing(3),
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
    marginTop: "20px",
  },
}));

interface UpdateForm {
  qualification: string;
  phone: string;
}

interface HelperState {
  helperTextQualification: string;
  helperTextPhone: string;
}

interface MatchParams {
  id: string;
}

type Props = MapStateToProps &
  MapDispatchToProps &
  RouteComponentProps<MatchParams>;

const Register: React.FC<Props> = (props: Props) => {
  const { putDoctor, getDoctorById } = props;
  const { loading, doctor } = props.doctorState;
  const { params } = props.match;
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    getDoctorById(params.id);
  }, [getDoctorById]);

  const [formData, setFormData] = useState<UpdateForm>({
    qualification: loading || !doctor ? "" : doctor.qualification,
    phone: loading || !doctor ? "" : doctor.phone,
  });

  const [helperData, setHelperData] = useState<HelperState>({
    helperTextQualification: "",
    helperTextPhone: "",
  });

  const { qualification, phone } = formData;

  const { helperTextQualification, helperTextPhone } = helperData;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (e.target.id === "address")
      setHelperData({ ...helperData, helperTextQualification: "" });
    else if (e.target.id === "phone")
      setHelperData({ ...helperData, helperTextPhone: "" });
  };

  const onSubmit = (e: any, id: string) => {
    e.preventDefault();
    if (qualification === "") {
      setHelperData({
        ...helperData,
        helperTextQualification: "Empty field!",
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
    } else {
      putDoctor(id, formData);
    }
  };

  return loading || !doctor ? (
    <Loading></Loading>
  ) : (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <Typography component="h1" variant="h5" className={classes.title}>
        Update account
      </Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={(e) => onSubmit(e, doctor.id)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              className={classes.textField}
              fullWidth
              id="name"
              label="Name"
              value={doctor.name}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              className={classes.textField}
              fullWidth
              id="surname"
              label="Surname"
              value={doctor.surname}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              fullWidth
              id="OIB"
              label="OIB"
              value={doctor.OIB}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              fullWidth
              required
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
              fullWidth
              id="license"
              label="License"
              InputLabelProps={{
                shrink: true,
              }}
              value={doctor.license}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              fullWidth
              id="email"
              label="E-mail"
              value={doctor.email}
              disabled
            />
          </Grid>
        </Grid>
        <div className={classes.buttonGroup}>
          <div className={classes.button}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              className={classes.button}
            >
              Update
            </Button>
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
      </form>
    </Container>
  );
};

interface MapStateToProps {
  doctorState: DoctorState;
}

interface MapDispatchToProps {
  putDoctor: (id: string, form: IPutDoctorForm) => void;
  getDoctorById: (id: string) => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  doctorState: state.doctor,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, DoctorActionTypes>
): MapDispatchToProps => ({
  putDoctor: bindActionCreators(putDoctor, dispatch),
  getDoctorById: bindActionCreators(getDoctorById, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
