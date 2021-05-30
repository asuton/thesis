import React, { useEffect } from "react";
import { AppState } from "../../redux/reducers/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Can } from "../Auth/Can";
import { subject } from "@casl/ability";
import { RouteComponentProps, withRouter } from "react-router";
import { getMedicalRecord } from "../../redux/actions/medicalRecord";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  MedicalRecordActionTypes,
  MedicalRecordState,
} from "../../redux/types/medicalRecord";
import { Button, Container, Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { Link } from "react-router-dom";
import Loading from "../Layout/Loading";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Back from "../Layout/Back";

const useStyles = makeStyles({
  root: {
    marginTop: "80px",
    minWidth: 275,
    maxWidth: 1200,
    margin: "auto",
    marginBottom: "10px",
  },
  link: {
    textDecoration: "none",
    color: "#3f51b5",
  },
});

interface MatchParams {
  id: string;
}

type Props = MapStateToProps &
  MapDispatchToProps &
  RouteComponentProps<MatchParams>;

export const MedicalRecord: React.FC<Props> = (props: Props) => {
  const { id } = props.match.params;
  const { getMedicalRecord } = props;
  const { medicalRecord, loading } = props.medicalRecordState;

  useEffect(() => {
    getMedicalRecord(id);
  }, [getMedicalRecord]);

  const classes = useStyles();

  return loading || !medicalRecord ? (
    <Loading></Loading>
  ) : (
    <Can I="read" this={subject("MedicalRecord", medicalRecord)}>
      <Container className={classes.root}>
        <Back link={`/patients/${medicalRecord.patientId}`} />
        <Card variant="outlined">
          <CardContent>
            <Grid container>
              <Grid item xs={8} sm={11}>
                <Typography variant="h4" component="h2">
                  {medicalRecord.title}
                </Typography>
                <Typography color="textSecondary">
                  Created at:{" "}
                  {moment(medicalRecord.createdAt).format("DD/MM/YYYY HH:mm")}
                </Typography>
                <Typography color="textSecondary">
                  Last updated at:{" "}
                  {moment(medicalRecord.updatedAt).format("DD/MM/YYYY HH:mm")}
                </Typography>
              </Grid>
              <Can I="update" this={subject("MedicalRecord", medicalRecord)}>
                <Grid item xs={4} sm={1}>
                  <Button
                    color="primary"
                    type="submit"
                    component={Link}
                    to={`/patients/${medicalRecord.patientId}/record/${id}/update`}
                    style={{ width: "100px" }}
                  >
                    Update
                  </Button>
                </Grid>
              </Can>
            </Grid>
            <br></br>
            <Divider></Divider>
            <br></br>
            <Grid container>
              <Grid item xs={12} sm={8}>
                <Typography variant="subtitle1">
                  Patient:{" "}
                  <Link
                    to={`/patients/${medicalRecord.patientId}`}
                    className={classes.link}
                  >
                    {medicalRecord.patient.name +
                      " " +
                      medicalRecord.patient.surname}
                  </Link>
                </Typography>
                <Typography variant="subtitle1">
                  Patient OIB: {medicalRecord.patient.OIB}
                </Typography>
                <Typography variant="subtitle1">
                  Date of birth:{" "}
                  {moment(medicalRecord.patient.dateOfBirth).format(
                    "DD/MM/YYYY"
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">
                  Doctor:{" "}
                  <Link
                    to={`/doctors/${medicalRecord.doctorId}`}
                    className={classes.link}
                  >
                    {medicalRecord.doctor.name +
                      " " +
                      medicalRecord.doctor.surname}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <br></br>
            <Divider></Divider>
            <br></br>
            <Typography variant="h6">Medical history</Typography>
            <Typography variant="body1">
              {medicalRecord.medicalHistory}
            </Typography>
            <br></br>
            <Typography variant="h6">Physical Examinationy</Typography>
            <Typography variant="body1">
              {medicalRecord.physicalExamination}
            </Typography>
            <br></br>
            <Typography variant="h6">Diagnosis</Typography>
            <Typography variant="body1">{medicalRecord.diagnosis}</Typography>
            <br></br>
            <Typography variant="h6">Treatment</Typography>
            <Typography variant="body1">{medicalRecord.treatment}</Typography>
            <br></br>
            <Typography variant="h6">Recommendation</Typography>
            <Typography variant="body1">
              {medicalRecord.recommendation}
            </Typography>
            <br></br>
            {medicalRecord.additionalNote.length > 0 ? (
              <>
                {" "}
                <Typography variant="h6">Additional note</Typography>{" "}
                <Typography variant="body1">
                  {medicalRecord.additionalNote}
                </Typography>
              </>
            ) : null}
          </CardContent>
        </Card>
      </Container>
    </Can>
  );
};

interface MapStateToProps {
  medicalRecordState: MedicalRecordState;
}

interface MapDispatchToProps {
  getMedicalRecord: (id: string) => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  medicalRecordState: state.medicalRecord,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, MedicalRecordActionTypes>
): MapDispatchToProps => ({
  getMedicalRecord: bindActionCreators(getMedicalRecord, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MedicalRecord));
