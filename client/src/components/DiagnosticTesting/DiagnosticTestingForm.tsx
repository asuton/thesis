import React, { useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { AppState } from "../../redux/reducers/rootReducer";
import { bindActionCreators } from "redux";
import { RouteComponentProps, useHistory } from "react-router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { AuthActionTypes, AuthState } from "../../redux/types/auth";
import { postMedicalRecord } from "../../redux/actions/medicalRecord";
import { MedicalRecordState } from "../../redux/types/medicalRecord";
import { DiagnosticTestingState } from "../../redux/types/diagnosticTesting";
import { postDiagnosticTesting } from "../../redux/actions/diagnosticTesting";

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

export interface DiagnosticTestingFormState {
  test: string;
  result: string;
}

interface HelperState {
  helperTextTest: string;
  helperTextResult: string;
}

interface MatchParams {
  id: string;
}

type Props = MapStateToProps &
  MapDispatchToProps &
  RouteComponentProps<MatchParams>;

const DiagnosticTestingForm: React.FC<Props> = (props: Props) => {
  const { id } = props.match.params;

  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = useState<DiagnosticTestingFormState>({
    test: "",
    result: "",
  });

  const [helperData, setHelperData] = useState<HelperState>({
    helperTextTest: "",
    helperTextResult: "",
  });

  const { test, result } = formData;
  const { helperTextTest, helperTextResult } = helperData;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (e.target.id === "test")
      setHelperData({ ...helperData, helperTextTest: "" });
    else if (e.target.id === "result")
      setHelperData({ ...helperData, helperTextResult: "" });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (test === "")
      setHelperData({
        ...helperData,
        helperTextTest: "Empty field!",
      });
    else if (result === "")
      setHelperData({
        ...helperData,
        helperTextResult: "Empty field!",
      });
    else props.postDiagnosticTesting(formData, id, history);
  };

  return (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <Typography component="h1" variant="h5" className={classes.title}>
        New diagnostic testing
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
              id="test"
              label="Test"
              value={test}
              onChange={(e) => onChange(e)}
              error={helperTextTest === "" ? false : true}
              helperText={helperTextTest}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              required
              fullWidth
              id="result"
              label="Result"
              multiline
              value={result}
              onChange={(e) => onChange(e)}
              error={helperTextResult === "" ? false : true}
              helperText={helperTextResult}
            />
          </Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            className={classes.submit}
          >
            Save diagnostic test
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

interface MapStateToProps {
  diagnosticTestingState: DiagnosticTestingState;
}

interface MapDispatchToProps {
  postDiagnosticTesting: (form: any, id: string, history: any) => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  diagnosticTestingState: state.diagnosticTesting,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AuthActionTypes>
): MapDispatchToProps => ({
  postDiagnosticTesting: bindActionCreators(postDiagnosticTesting, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiagnosticTestingForm);
