import React, { useEffect } from "react";
import { AppState } from "../redux/reducers/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Can } from "./Can";
import { subject } from "@casl/ability";
import { RouteComponentProps } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button, Container, Divider, Grid } from "@material-ui/core";
import { DoctorActionTypes, DoctorState } from "../redux/types/doctor";
import { getDoctorById } from "../redux/actions/doctor/";
import { AuthState } from "../redux/types/auth";
import Loading from "./Loading";
import { WebAuthnState } from "../redux/types/webauthn";
import WebAuthnLogin from "./WebAuthnLogin";
import WebAuthnRegister from "./WebAuthnRegister";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    marginTop: "100px",
    minWidth: 275,
    maxWidth: 1200,
    margin: "auto",
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
    marginTop: "25px",
    flexWrap: "wrap",
  },
  section: {
    maxWidth: 1200,
    marginTop: "20px",
    margin: "auto",
  },
});

interface MatchParams {
  id: string;
}

type Props = MapStateToProps &
  MapDispatchToProps &
  RouteComponentProps<MatchParams>;

export const Doctor: React.FC<Props> = (props: Props) => {
  const { doctor, loading } = props.doctorState;
  const { user } = props.authState;
  const { getDoctorById } = props;
  const { params } = props.match;

  useEffect(() => {
    getDoctorById(params.id);
  }, [getDoctorById]);

  const classes = useStyles();

  return loading || !doctor ? (
    <Loading></Loading>
  ) : (
    <Can I="read" this={subject("Doctor", doctor)}>
      <Container>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
              <Grid
                container
                style={{ paddingLeft: "10px", paddingRight: "10px" }}
              >
                <Grid item xs={8} sm={11}>
                  {doctor.name + " " + doctor.surname}
                </Grid>
                {user?.id === params.id ? (
                  <Can I="update" this={subject("Doctor", doctor)}>
                    <Grid item xs={4} sm={1}>
                      <Button
                        color="primary"
                        type="submit"
                        component={Link}
                        to={`/doctors/${doctor.id}/update`}
                        style={{ width: "100px" }}
                      >
                        Update
                      </Button>
                    </Grid>
                  </Can>
                ) : null}
              </Grid>
            </Typography>
            <br></br>
            <Divider></Divider>
            <br></br>
            <Typography className={classes.pos} color="textSecondary">
              OIB: {doctor.OIB}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              License number: {doctor.license}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              E-mail: {doctor.email}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Phone number: {doctor.phone}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Qualification: {doctor.qualification}
            </Typography>
          </CardContent>{" "}
        </Card>
        {user?.id === params.id ? (
          <>
            <div className={classes.section}>
              <Typography variant="h5" style={{ textAlign: "left" }}>
                Identity verification
              </Typography>

              <div className={classes.button}>
                {props.webAuthnAuthenticated.isAuthenticated ? (
                  <>
                    <div>
                      <Typography variant="body1">
                        Your identity is verified. You can add another
                        credential for future verification.
                      </Typography>
                    </div>
                    <div style={{ width: "150px" }}>
                      <WebAuthnRegister></WebAuthnRegister>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Typography variant="body1">
                        To view sensitive information please verify your
                        identity.
                      </Typography>
                    </div>
                    <div style={{ width: "150px" }}>
                      <WebAuthnLogin></WebAuthnLogin>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        ) : null}
        <Can I="create" a="Appointment">
          <div className={classes.root}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/doctors/${doctor.id}/appointment`}
            >
              Book an appointment
            </Button>
          </div>
        </Can>
      </Container>
    </Can>
  );
};

interface MapStateToProps {
  doctorState: DoctorState;
  authState: AuthState;
  webAuthnAuthenticated: WebAuthnState;
}

interface MapDispatchToProps {
  getDoctorById: (id: string) => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  doctorState: state.doctor,
  authState: state.auth,
  webAuthnAuthenticated: state.webauthn,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, DoctorActionTypes>
): MapDispatchToProps => ({
  getDoctorById: bindActionCreators(getDoctorById, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
