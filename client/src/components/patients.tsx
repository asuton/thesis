import {
  GetPatientsActionTypes,
  GetPatientsState,
  IPatient,
} from "../redux/types/patients/patients";
import { getPatients } from "../redux/actions/patients/patients";
import React, { useEffect } from "react";
import { AppState } from "../redux/reducers/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Can } from "./Can";
import { subject } from "@casl/ability";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Container, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(12),
    },
    root: {
      width: "100%",
      maxWidth: 1200,
      backgroundColor: theme.palette.background.paper,
    },
    item: {
      display: "flex",
      justifyContent: "space-between",
    },
    text: {
      width: "100%",
    },
  })
);

type Props = MapStateToProps & MapDispatchToProps;

export const Patients: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  useEffect(() => {
    props.getPatients();
  }, [props.getPatients]);

  if (props.patientsState.loading || !props.patientsState.patients) {
    return (
      <>
        <div>"Restricted"</div>
      </>
    );
  }
  return (
    <Can I="read" this={subject("Patient", { id: true })}>
      <Container className={classes.container}>
        <List component="nav" className={classes.root}>
          <ListItem className={classes.item}>
            <div className={classes.text}>
              <ListItemText inset primary="Ime" />
            </div>
            <div className={classes.text}>
              <ListItemText inset primary="Prezime" />
            </div>
            <div className={classes.text}>
              <ListItemText inset primary="Datum rođenja" />
            </div>
            <div className={classes.text}>
              <ListItemText inset primary="OIB" />
            </div>
          </ListItem>
        </List>
        <Divider></Divider>
        <List component="nav" className={classes.root}>
          {props.patientsState.patients.map((patient: IPatient) => (
            <ListItem button key={patient.id} className={classes.item}>
              <div className={classes.text}>
                <ListItemText inset primary={patient.name} />
              </div>
              <div className={classes.text}>
                <ListItemText inset primary={patient.surname} />
              </div>
              <div className={classes.text}>
                <ListItemText inset primary={patient.dateOfBirth} />
              </div>
              <div className={classes.text}>
                <ListItemText inset primary={patient.OIB} />
              </div>
            </ListItem>
          ))}
        </List>
      </Container>
    </Can>
  );
};

interface MapStateToProps {
  patientsState: GetPatientsState;
}

interface MapDispatchToProps {
  getPatients: () => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  patientsState: state.patients,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, GetPatientsActionTypes>
): MapDispatchToProps => ({
  getPatients: bindActionCreators(getPatients, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
