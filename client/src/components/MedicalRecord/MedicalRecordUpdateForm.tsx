import React, { useState, useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { AppState } from "../../redux/reducers/rootReducer";
import { bindActionCreators } from "redux";
import { RouteComponentProps } from "react-router";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { AuthActionTypes } from "../../redux/types/auth";
import {
  getMedicalRecord,
  putMedicalRecord,
} from "../../redux/actions/medicalRecord";
import {
  IPutMedicalRecord,
  MedicalRecordState,
} from "../../redux/types/medicalRecord";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
import Loading from "../Layout/Loading";

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

interface HelperState {
  helperTextTitle: string;
  helperTextPhysicalExamination: string;
  helperTextMedicalHistory: string;
  helperTextDiagnosis: string;
  helperTextTreatment: string;
  helperTextRecommendation: string;
}

interface MatchParams {
  id: string;
}

type Props = MapStateToProps &
  MapDispatchToProps &
  RouteComponentProps<MatchParams>;

const MedicalRecordForm: React.FC<Props> = (props: Props) => {
  const { id } = props.match.params;
  const { putMedicalRecord, getMedicalRecord } = props;
  const { medicalRecord, loading } = props.medicalRecordState;
  const classes = useStyles();

  useEffect(() => {
    getMedicalRecord(id);
  }, [getMedicalRecord]);

  const [formData, setFormData] = useState<IPutMedicalRecord>({
    additionalNote:
      loading || !medicalRecord ? "" : medicalRecord.additionalNote,
  });

  const { additionalNote } = formData;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    putMedicalRecord(id, formData);
  };

  return loading || !medicalRecord ? (
    <Loading></Loading>
  ) : (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <Typography component="h1" variant="h5" className={classes.title}>
        Update medical record
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
              value={medicalRecord.title}
              disabled
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
              value={medicalRecord.medicalHistory}
              disabled
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
              value={medicalRecord.physicalExamination}
              disabled
            />
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                required
                fullWidth
                id="diagnosis"
                label="Diagnosis"
                multiline
                value={medicalRecord.diagnosis}
                disabled
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
                value={medicalRecord.treatment}
                disabled
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
                value={medicalRecord.recommendation}
                disabled
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
            Update medical record
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
  putMedicalRecord: (id: string, form: IPutMedicalRecord) => void;
  getMedicalRecord: (id: string) => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  medicalRecordState: state.medicalRecord,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AuthActionTypes>
): MapDispatchToProps => ({
  putMedicalRecord: bindActionCreators(putMedicalRecord, dispatch),
  getMedicalRecord: bindActionCreators(getMedicalRecord, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MedicalRecordForm);
