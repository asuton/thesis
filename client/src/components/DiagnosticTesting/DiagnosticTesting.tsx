import React, { useEffect } from "react";
import { AppState } from "../../redux/reducers/rootReducer";
import {
  DiagnosticTestingActionTypes,
  DiagnosticTestingState,
} from "../../redux/types/diagnosticTesting";
import { getDiagnosticTesting } from "../../redux/actions/diagnosticTesting";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Can } from "../Auth/Can";
import { subject } from "@casl/ability";
import { RouteComponentProps } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Container, Divider, Grid } from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import Loading from "../Layout/Loading";
import Back from "../Layout/Back";

const useStyles = makeStyles({
  root: {
    marginTop: "100px",
    minWidth: 275,
    maxWidth: 1200,
    margin: "auto",
  },
  link: {
    textDecoration: "none",
    color: "#3f51b5",
  },
});

interface MatchParams {
  patId: string;
  id: string;
}

type Props = MapStateToProps &
  MapDispatchToProps &
  RouteComponentProps<MatchParams>;

export const DiagnosticTesting: React.FC<Props> = (props: Props) => {
  const { diagnosticTesting, loading } = props.diagnosticTestingState;
  const { params } = props.match;
  const { getDiagnosticTesting } = props;

  useEffect(() => {
    getDiagnosticTesting(params.id, params.patId);
  }, [getDiagnosticTesting]);

  const classes = useStyles();

  return loading || !diagnosticTesting ? (
    <Loading></Loading>
  ) : (
    <Can I="read" this={subject("DiagnosticTesting", diagnosticTesting)}>
      <Container className={classes.root}>
        <Back link={`/patients/${diagnosticTesting.patientId}`}></Back>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h4" component="h2">
              {diagnosticTesting.test}
            </Typography>
            <Typography color="textSecondary">
              Created at:{" "}
              {moment(diagnosticTesting.createdAt).format("DD/MM/YYYY HH:mm")}
            </Typography>
            <br></br>
            <Grid container>
              <Grid item xs={12} sm={8}>
                <Typography variant="subtitle1">
                  Patient:{" "}
                  <Link
                    to={`/patients/${diagnosticTesting.patientId}`}
                    className={classes.link}
                  >
                    {diagnosticTesting.patient.name +
                      " " +
                      diagnosticTesting.patient.surname}
                  </Link>
                </Typography>
                <Typography variant="subtitle1">
                  Patient OIB: {diagnosticTesting.patient.OIB}
                </Typography>
                <Typography variant="subtitle1">
                  Date of birth:{" "}
                  {moment(diagnosticTesting.patient.dateOfBirth).format(
                    "DD/MM/YYYY"
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">
                  Doctor:{" "}
                  <Link
                    to={`/doctors/${diagnosticTesting.doctorId}`}
                    className={classes.link}
                  >
                    {diagnosticTesting.doctor.name +
                      " " +
                      diagnosticTesting.doctor.surname}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <br></br>
            <Divider></Divider>
            <br></br>
            <Typography variant="h6">Result</Typography>
            <Typography variant="body1">{diagnosticTesting.result}</Typography>
          </CardContent>
        </Card>
      </Container>
    </Can>
  );
};

interface MapStateToProps {
  diagnosticTestingState: DiagnosticTestingState;
}

interface MapDispatchToProps {
  getDiagnosticTesting: (id: string, patId: string) => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  diagnosticTestingState: state.diagnosticTesting,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, DiagnosticTestingActionTypes>
): MapDispatchToProps => ({
  getDiagnosticTesting: bindActionCreators(getDiagnosticTesting, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiagnosticTesting);
