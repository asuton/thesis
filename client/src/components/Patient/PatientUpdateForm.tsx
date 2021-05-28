import React, { useState, useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { AppState } from "../../redux/reducers/rootReducer";
import { bindActionCreators } from "redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  IPutPatientForm,
  PatientActionTypes,
  PatientState,
} from "../../redux/types/patient";
import { getPatientById, putPatient } from "../../redux/actions/patient";
import Loading from "../Layout/Loading";
import { RouteComponentProps, useHistory } from "react-router";

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
  address: string;
  phone: string;
}

interface HelperState {
  helperTextAddress: string;
  helperTextPhone: string;
}

interface MatchParams {
  id: string;
}

type Props = MapStateToProps &
  MapDispatchToProps &
  RouteComponentProps<MatchParams>;

const PatientUpdateForm: React.FC<Props> = (props: Props) => {
  const { putPatient, getPatientById } = props;
  const { patient, loading } = props.patientState;
  const { params } = props.match;
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    getPatientById(params.id);
  }, [getPatientById]);

  const [formData, setFormData] = useState<UpdateForm>({
    address: loading || !patient ? "" : patient.address,
    phone: loading || !patient ? "" : patient.phone,
  });

  const [helperData, setHelperData] = useState<HelperState>({
    helperTextAddress: "",
    helperTextPhone: "",
  });

  const { address, phone } = formData;

  const { helperTextAddress, helperTextPhone } = helperData;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (e.target.id === "address")
      setHelperData({ ...helperData, helperTextAddress: "" });
    else if (e.target.id === "phone")
      setHelperData({ ...helperData, helperTextPhone: "" });
  };

  const onSubmit = (e: any, id: string) => {
    e.preventDefault();
    if (address === "") {
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
    } else {
      putPatient(id, formData);
    }
  };

  return loading || !patient ? (
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
        onSubmit={(e) => onSubmit(e, patient.id)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              className={classes.textField}
              fullWidth
              id="name"
              label="Name"
              value={patient.name}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              className={classes.textField}
              fullWidth
              id="surname"
              label="Surname"
              value={patient.surname}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              fullWidth
              id="OIB"
              label="OIB"
              value={patient.OIB}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              fullWidth
              required
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
              fullWidth
              type="date"
              id="dateOfBirth"
              label="Date of birth"
              InputLabelProps={{
                shrink: true,
              }}
              value={patient.dateOfBirth.toString().slice(0, 10)}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              fullWidth
              id="email"
              label="E-mail"
              value={patient.email}
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
  patientState: PatientState;
}

interface MapDispatchToProps {
  putPatient: (id: string, form: IPutPatientForm) => void;
  getPatientById: (id: string) => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  patientState: state.patient,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, PatientActionTypes>
): MapDispatchToProps => ({
  putPatient: bindActionCreators(putPatient, dispatch),
  getPatientById: bindActionCreators(getPatientById, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(PatientUpdateForm);
