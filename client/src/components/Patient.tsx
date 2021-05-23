import {
  GetPatientActionTypes,
  GetPatientState,
} from "../redux/types/patients/patient";
import { getPatientById } from "../redux/actions/patients/patient";
import React, { useEffect } from "react";
import { AppState } from "../redux/reducers/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Can } from "./Can";
import { subject } from "@casl/ability";
import { RouteComponentProps } from "react-router";
import moment from "moment";
import { Link } from "react-router-dom";
import WebAuthnRegister from "./WebAuthnRegister";
import WebAuthnLogin from "./WebAuthnLogin";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { WebAuthnState } from "../redux/types/webauthn";
import { AuthState } from "../redux/types/auth";
import Loading from "./Loading";

const useStyles = makeStyles({
  root: {
    marginTop: "100px",
    minWidth: 275,
    maxWidth: 1200,
    margin: "auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  med: {
    maxWidth: 1200,
    margin: "auto",
    marginBottom: "50px",
  },
  list: {
    display: "flex",
    overflowX: "hidden",
    maxWidth: 1200,
    margin: "auto",
    marginBottom: "50px",
    marginTop: "25px",
    "@media (max-width: 400px)": {
      overflowX: "scroll",
    },
  },
  mobile: {
    "@media (max-width: 450px)": {
      display: "none",
    },
  },
  search: {
    marginTop: "100px",
  },
  table: {
    minWidth: 320,
  },
  tableCell: {
    textAlign: "start",
  },
  tableRow: {
    width: "100%",
    "&:hover": {
      backgroundColor: "aliceblue",
      cursor: "pointer",
    },
  },
  button: {
    width: "inherit",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: 1200,
    margin: "auto",
    marginTop: "25px",
    flexWrap: "wrap",
  },
  section: {
    maxWidth: 1200,
    margin: "auto",
  },
  notAvailable: {
    padding: "30px",
  },
});

interface MatchParams {
  id: string;
}

type Props = MapStateToProps &
  MapDispatchToProps &
  RouteComponentProps<MatchParams>;

export const Patient: React.FC<Props> = (props: Props) => {
  const { patient, loading } = props.patientState;
  const { getPatientById } = props;
  const { user } = props.authState;
  const { params } = props.match;

  let medicalRecords = patient?.medicalRecord ? [...patient.medicalRecord] : [];

  useEffect(() => {
    getPatientById(params.id);
  }, [getPatientById]);

  const classes = useStyles();

  return loading || !patient ? (
    <Loading></Loading>
  ) : (
    <Can I="read" this={subject("Patient", patient)}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {patient.name + " " + patient.surname}
          </Typography>
          <br></br>
          <Divider></Divider>
          <br></br>
          <Typography className={classes.pos} color="textSecondary">
            OIB: {patient.OIB}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Date of birth: {moment(patient.dateOfBirth).format("DD/MM/YYYY")}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            E-mail: {patient.email}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Phone number: {patient.phone}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Address: {patient.address}
          </Typography>
        </CardContent>
      </Card>
      {user?.id === params.id ? (
        <div className={classes.button}>
          {props.webAuthnAuthenticated.isAuthenticated ? (
            <div>
              <div>
                <Typography variant="body1">
                  Your identity is verified. You can add another credential for
                  future verification.
                </Typography>
              </div>
              <div style={{ width: "150px" }}>
                <WebAuthnRegister></WebAuthnRegister>
              </div>
            </div>
          ) : (
            <>
              <div>
                <Typography variant="body1">
                  To view sensitive information please verify your identity.
                </Typography>
              </div>
              <div style={{ width: "150px" }}>
                <WebAuthnLogin></WebAuthnLogin>
              </div>
            </>
          )}
        </div>
      ) : null}
      <br></br>

      <div className={classes.section}>
        <div className={classes.button}>
          <Typography variant="h5" style={{ textAlign: "left" }}>
            Medical Record
          </Typography>
          <Can I="create" a="MedicalRecord">
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/patients/${patient.id}/new-medical/`}
              style={{ width: "150px" }}
            >
              New record
            </Button>
          </Can>
        </div>
      </div>

      <Paper className={classes.list} elevation={0} variant="outlined">
        <Grid item xs={12}>
          {patient.medicalRecord.length > 0 ? (
            <Table className={classes.table}>
              <colgroup>
                <col style={{ width: "50%" }} />
                <col style={{ width: "50%" }} />
              </colgroup>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    <Typography variant="h6">Title</Typography>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Typography variant="h6">Created at</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patient.medicalRecord.map((record) => {
                  return (
                    <TableRow
                      key={record.id}
                      className={classes.tableRow}
                      component={Link}
                      to={`/patients/${patient.id}/record/${record.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCell}
                      >
                        {record.title}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(record.createdAt).format("HH:mm  DD/MM/YYYY")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <Card className={classes.notAvailable}>
              <Typography variant="h6" color="textSecondary">
                No available records
              </Typography>
            </Card>
          )}
        </Grid>
      </Paper>

      <div className={classes.section}>
        <div className={classes.button}>
          <Typography variant="h5" style={{ textAlign: "left" }}>
            Diagnostic Testing
          </Typography>

          <Can I="create" a="DiagnosticTesting">
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/patients/${patient.id}/new-test/`}
              style={{ width: "150px" }}
            >
              New test
            </Button>
          </Can>
        </div>
      </div>

      <Paper className={classes.list} elevation={0} variant="outlined">
        <Grid item xs={12}>
          {patient.diagnosticTesting.length > 0 ? (
            <Table className={classes.table}>
              <colgroup>
                <col style={{ width: "50%" }} />
                <col style={{ width: "50%" }} />
              </colgroup>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    <Typography variant="h6">Test</Typography>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Typography variant="h6">Created at</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patient.diagnosticTesting.map((testing) => {
                  return (
                    <TableRow
                      key={testing.id}
                      className={classes.tableRow}
                      component={Link}
                      to={`/patients/${patient.id}/test/${testing.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCell}
                      >
                        {testing.test}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(testing.createdAt).format("HH:mm DD/MM/YYYY")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <Card className={classes.notAvailable}>
              <Typography variant="h6" color="textSecondary">
                No available tests
              </Typography>
            </Card>
          )}
        </Grid>
      </Paper>
    </Can>
  );
};

interface MapStateToProps {
  patientState: GetPatientState;
  webAuthnAuthenticated: WebAuthnState;
  authState: AuthState;
}

interface MapDispatchToProps {
  getPatientById: (id: string) => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  patientState: state.patient,
  webAuthnAuthenticated: state.webauthn,
  authState: state.auth,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, GetPatientActionTypes>
): MapDispatchToProps => ({
  getPatientById: bindActionCreators(getPatientById, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
