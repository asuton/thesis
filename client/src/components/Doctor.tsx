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
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import {
  GetDoctorActionTypes,
  GetDoctorState,
} from "../redux/types/doctors/doctor";
import { getDoctorById } from "../redux/actions/doctors/doctor";
import { AuthState } from "../redux/types/auth";

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
});

interface MatchParams {
  id: string;
}

type Props = MapStateToProps &
  MapDispatchToProps &
  RouteComponentProps<MatchParams>;

export const Doctor: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    props.getDoctorById(props.match.params.id);
  }, [props.getDoctorById]);

  const { doctor, loading } = props.doctorState;

  const classes = useStyles();

  return loading || !doctor ? (
    <div>"Loading"</div>
  ) : (
    <Can I="read" this={subject("Doctor", doctor)}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {doctor.name + " " + doctor.surname}
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
        </CardContent>
        {props.authState.user?.id === props.match.params.id ? (
          <CardActions>
            <Button size="small">Nadodat update/webauthn shemu odi</Button>{" "}
          </CardActions>
        ) : null}
      </Card>
    </Can>
  );
};

interface MapStateToProps {
  doctorState: GetDoctorState;
  authState: AuthState;
}

interface MapDispatchToProps {
  getDoctorById: (id: string) => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  doctorState: state.doctor,
  authState: state.auth,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, GetDoctorActionTypes>
): MapDispatchToProps => ({
  getDoctorById: bindActionCreators(getDoctorById, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
