import React, { useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { AppState } from "../redux/reducers/rootReducer";
import { bindActionCreators } from "redux";
import { RouteComponentProps, useHistory } from "react-router";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { AuthActionTypes, AuthState } from "../redux/types/auth";
import { postMedicalRecord } from "../redux/actions/medicalRecords/medicalRecord";
import { MedicalRecordState } from "../redux/types/medicalRecords/medicalRecord";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    margin: theme.spacing(3, 0, 1),
  },
  container: {
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

export interface MedicalRecordFormState {
  title: string;
  medicalHistory: string;
  physicalExamination: string;
  diagnosis: string;
  treatment: string;
  recommendation: string;
  additionalNote: string;
}

interface MatchParams {
  id: string;
}

type Props = MapStateToProps &
  MapDispatchToProps &
  RouteComponentProps<MatchParams>;

const MedicalRecordForm: React.FC<Props> = (props: Props) => {
  const { id } = props.match.params;
  const { postMedicalRecord } = props;
  const history = useHistory();
  const classes = useStyles();
  const [formData, setFormData] = useState<MedicalRecordFormState>({
    title: "",
    medicalHistory: "",
    physicalExamination: "",
    diagnosis: "",
    treatment: "",
    recommendation: "",
    additionalNote: "",
  });

  const {
    title,
    medicalHistory,
    physicalExamination,
    diagnosis,
    treatment,
    recommendation,
    additionalNote,
  } = formData;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    postMedicalRecord(formData, id, history);
  };

  return (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <Typography component="h1" variant="h5" className={classes.title}>
        New medical record
      </Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={(e) => onSubmit(e)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              required
              fullWidth
              id="title"
              label="Title"
              value={title}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              required
              fullWidth
              id="medicalHistory"
              label="Medical History"
              multiline
              value={medicalHistory}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              required
              fullWidth
              id="physicalExamination"
              label="Physical Examination"
              multiline
              value={physicalExamination}
              onChange={(e) => onChange(e)}
            />
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                required
                fullWidth
                id="diagnosis"
                label="Diagnosis"
                multiline
                value={diagnosis}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                required
                fullWidth
                id="treatment"
                label="Treatment"
                multiline
                value={treatment}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                required
                fullWidth
                id="recommendation"
                label="Recommendation"
                multiline
                value={recommendation}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                fullWidth
                id="additionalNote"
                label="Additional note"
                multiline
                value={additionalNote}
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
            Save medical record
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

interface MapStateToProps {
  medicalRecordState: MedicalRecordState;
}

interface MapDispatchToProps {
  postMedicalRecord: (form: any, id: string, history: any) => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  medicalRecordState: state.medicalRecord,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AuthActionTypes>
): MapDispatchToProps => ({
  postMedicalRecord: bindActionCreators(postMedicalRecord, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MedicalRecordForm);
