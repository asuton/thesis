import {
  deleteAppointment,
  getAppointments,
} from "../../redux/actions/appointment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useEffect, useState } from "react";
import { AppState } from "../../redux/reducers/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "../Layout/Loading";
import {
  AppointmentActionTypes,
  AppointmentState,
  IGetAppointment,
} from "../../redux/types/appointment";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import { Can } from "../Auth/Can";
import { subject } from "@casl/ability";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: "800px",
    marginTop: "100px",
  },
  appBar: {
    position: "inherit",
    backgroundColor: "#FFFFFF",
  },
  container: {
    paddingTop: "24px",
    paddingLeft: "0px",
    paddingRight: "0px",
  },
  card: {
    marginBottom: "20px",
  },
  title: {
    textAlign: "left",
    marginBottom: "20px",
    color: "#3f51b5",
  },
  link: {
    textDecoration: "none",
    color: "#3f51b5",
  },
  notAvailable: {
    padding: "30px",
    marginBottom: "20px",
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={classes.container}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: any) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

type Props = MapStateToProps & MapDispatchToProps;

export const Appointments: React.FC<Props> = (props: Props) => {
  const { loading, appointments } = props.appointmentState;
  const { getAppointments, deleteAppointment } = props;
  const classes = useStyles();

  useEffect(() => {
    getAppointments();
  }, [getAppointments]);

  let pastEvents: IGetAppointment[] | undefined = [];
  const getPastEvents = () => {
    return appointments?.filter((x) => {
      const xDate = new Date(x.date + " " + x.time);
      const now = new Date();
      return xDate <= now;
    });
  };
  pastEvents = getPastEvents();

  let futureEvents: IGetAppointment[] | undefined = [];
  const getfutureEvents = () => {
    return appointments?.filter((x) => {
      const xDate = new Date(x.date + " " + x.time);
      const now = new Date();
      return xDate >= now;
    });
  };
  futureEvents = getfutureEvents();

  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return loading || !appointments ? (
    <Loading></Loading>
  ) : (
    <Container className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Appointments
      </Typography>
      <AppBar className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Upcoming" {...a11yProps(0)} />
          <Tab label="Past" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {futureEvents && futureEvents.length > 0 ? (
          futureEvents
            .sort((a, b) => {
              const aDate = new Date(a.date + " " + a.time);
              const bDate = new Date(b.date + " " + b.time);
              return aDate.getTime() - bDate.getTime();
            })
            .map((appointment) => (
              <Card className={classes.card} key={appointment.id}>
                <CardContent>
                  <Typography variant="h6">
                    Date: {moment(appointment.date).format("DD/MM/YYYY")}
                  </Typography>
                  <Typography variant="h6">
                    Time: {appointment.time.toString().slice(0, 5)}
                  </Typography>
                  <Typography color="textSecondary">
                    Created at:{" "}
                    {moment(appointment.createdAt).format("DD/MM/YYYY HH:mm")}
                  </Typography>
                  <br></br>
                  <Divider></Divider>
                  <br></br>
                  <Grid container>
                    <Grid item xs={12} sm={8}>
                      <Typography variant="subtitle1">
                        {" "}
                        Patient:
                        <Link
                          to={`/patients/${appointment.patientId}`}
                          className={classes.link}
                        >
                          {" " +
                            appointment.patient.name +
                            " " +
                            appointment.patient.surname}
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="subtitle1">
                        Doctor:
                        <Link
                          to={`/doctors/${appointment.doctorId}`}
                          className={classes.link}
                        >
                          {" " +
                            appointment.doctor.name +
                            " " +
                            appointment.doctor.surname}
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <Can I="delete" this={subject("Appointment", appointment)}>
                  <CardActions>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => {
                        handleClickOpen();
                      }}
                    >
                      Delete appointment
                    </Button>
                  </CardActions>
                </Can>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete your appointment?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      This action is irreversible.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        deleteAppointment(appointment.id);
                        handleClose();
                      }}
                      color="secondary"
                      autoFocus
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </Card>
            ))
        ) : (
          <Card className={classes.notAvailable}>
            <Typography variant="h6" color="textSecondary">
              No upcoming appointments
            </Typography>
            <Can I="create" a="Appointment">
              <Typography variant="subtitle1" color="textSecondary">
                Book one by finding a doctor on the{" "}
                <Link to={`/doctors`} className={classes.link}>
                  doctors page
                </Link>
              </Typography>
            </Can>
          </Card>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {pastEvents && pastEvents.length > 0 ? (
          pastEvents
            .sort((a, b) => {
              const aDate = new Date(a.date + " " + a.time);
              const bDate = new Date(b.date + " " + b.time);
              return bDate.getTime() - aDate.getTime();
            })
            .map((appointment) => (
              <Card className={classes.card} key={appointment.id}>
                <CardContent>
                  <Typography variant="h6">
                    Date: {moment(appointment.date).format("DD/MM/YYYY")}
                  </Typography>
                  <Typography variant="h6">
                    Time: {appointment.time.toString().slice(0, 5)}
                  </Typography>
                  <Typography color="textSecondary">
                    Created at:{" "}
                    {moment(appointment.createdAt).format("DD/MM/YYYY HH:mm")}
                  </Typography>
                  <br></br>
                  <Divider></Divider>
                  <br></br>
                  <Grid container>
                    <Grid item xs={12} sm={8}>
                      <Typography variant="subtitle1">
                        {" "}
                        Patient:
                        <Link
                          to={`/patients/${appointment.patientId}`}
                          className={classes.link}
                        >
                          {" " +
                            appointment.patient.name +
                            " " +
                            appointment.patient.surname}
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="subtitle1">
                        Doctor:
                        <Link
                          to={`/doctors/${appointment.doctorId}`}
                          className={classes.link}
                        >
                          {" " +
                            appointment.doctor.name +
                            " " +
                            appointment.doctor.surname}
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))
        ) : (
          <Card className={classes.notAvailable}>
            <Typography variant="h6" color="textSecondary">
              No past appointments
            </Typography>
          </Card>
        )}
      </TabPanel>
    </Container>
  );
};

interface MapStateToProps {
  appointmentState: AppointmentState;
}

interface MapDispatchToProps {
  getAppointments: () => void;
  deleteAppointment: (id: string) => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  appointmentState: state.appointment,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppointmentActionTypes>
): MapDispatchToProps => ({
  getAppointments: bindActionCreators(getAppointments, dispatch),
  deleteAppointment: bindActionCreators(deleteAppointment, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
