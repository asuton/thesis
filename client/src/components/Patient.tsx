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
import CardActions from "@material-ui/core/CardActions";
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
});

interface MatchParams {
  id: string;
}

type Props = MapStateToProps &
  MapDispatchToProps &
  RouteComponentProps<MatchParams>;

export const Patient: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    props.getPatientById(props.match.params.id);
  }, [props.getPatientById]);

  const { patient, loading } = props.patientState;

  const classes = useStyles();

  return loading || !patient ? (
    <div>"Loading"</div>
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
        <CardActions>
          <WebAuthnRegister></WebAuthnRegister>
          <WebAuthnLogin></WebAuthnLogin>
        </CardActions>
      </Card>
      <br></br>
      <Typography variant="h4" style={{ textAlign: "center" }}>
        Medical Record
      </Typography>
      <Can I="create" a="MedicalRecord">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/patients/${patient.id}/new-medical/`}
        >
          New medical record
        </Button>
      </Can>
      <Paper className={classes.list}>
        <Grid item xs={12}>
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
              {patient.medicalRecord.length > 0 ? (
                patient.medicalRecord.map((record) => {
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
                })
              ) : (
                <div>nema</div>
              )}
            </TableBody>
          </Table>
        </Grid>
      </Paper>
      <Typography variant="h4" style={{ textAlign: "center" }}>
        Diagnostic Testing
      </Typography>
      <Can I="create" a="DiagnosticTesting">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/patients/${patient.id}/new-test/`}
        >
          New diagnostic testing
        </Button>
      </Can>
      <Paper className={classes.list}>
        <Grid item xs={12}>
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
              {patient.diagnosticTesting.length > 0 ? (
                patient.diagnosticTesting.map((testing) => {
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
                })
              ) : (
                <TableRow className={classes.tableCell}>
                  <Typography variant="h6" color="textSecondary">
                    No available diagnostic tests
                  </Typography>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Grid>
      </Paper>
    </Can>
  );
};

interface MapStateToProps {
  patientState: GetPatientState;
}

interface MapDispatchToProps {
  getPatientById: (id: string) => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  patientState: state.patient,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, GetPatientActionTypes>
): MapDispatchToProps => ({
  getPatientById: bindActionCreators(getPatientById, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
