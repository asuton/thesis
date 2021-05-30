import React, { useEffect, useState } from "react";
import { AppState } from "../../redux/reducers/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RouteComponentProps, useHistory } from "react-router";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import Select from "@material-ui/core/Select";
import Loading from "../Layout/Loading";
import {
  AppointmentActionTypes,
  AppointmentState,
  IAppointmentForm,
} from "../../redux/types/appointment";
import {
  getTakenAppointments,
  postAppointment,
} from "../../redux/actions/appointment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingLeft: "0px",
      paddingRight: "0px",
    },
    form: {
      maxWidth: "600px",
      width: "inherit",
    },
    time: {
      width: 251,
      height: "100%",
      marginTop: "16px",
      marginBottom: "8px",
    },
    title: {
      marginTop: "16px",
      marginBottom: "35px",
    },
    input: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      marginBottom: "50px",
    },
  })
);

const available = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
];

interface MatchParams {
  id: string;
}

type Props = MapStateToProps &
  MapDispatchToProps &
  RouteComponentProps<MatchParams>;

export const AppointmentForm: React.FC<Props> = (props: Props) => {
  const { getTakenAppointments, postAppointment } = props;
  const { takenAppointments, loading } = props.appointmentState;
  const { id } = props.match.params;

  const classes = useStyles();
  let today = available.filter(
    (x) => x >= new Date().toLocaleTimeString().slice(0, 5)
  );

  const getTodays = () => {
    let takenToday: string[] = [];
    takenAppointments?.forEach((appointment) => {
      if (
        new Date().toISOString().slice(0, 10) === appointment.date.toString()
      ) {
        takenToday.push(appointment.time.toString().slice(0, 5));
      }
    });
    let availableToday = today.filter((x) => !takenToday.includes(x));
    return availableToday;
  };

  const history = useHistory();
  let getToday: string[] = [];
  getToday = getTodays();

  useEffect(() => {
    getTakenAppointments(id);
  }, [getTakenAppointments]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const [availableAppointments, setAvailableAppointments] = useState(
    getToday.length > 0 ? getToday : ["N/A"]
  );

  const [error, setErrorData] = useState({
    dateError: false,
    timeError: false,
  });
  const { dateError, timeError } = error;

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setErrorData({ dateError: false, timeError: false });
    if (date?.getDay() === 6 || date?.getDay() === 0) {
      setErrorData({ dateError: true, timeError: timeError });
      setAvailableAppointments(["N/A"]);
      setTime("N/A");
    } else if (
      date?.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)
    ) {
      let taken: string[] = [];
      takenAppointments?.forEach((appointment) => {
        if (date?.toISOString().slice(0, 10) === appointment.date.toString()) {
          taken.push(appointment.time.toString().slice(0, 5));
        }
      });
      let difference = today.filter((x) => !taken.includes(x));
      setAvailableAppointments(difference.length > 0 ? difference : ["N/A"]);
      setTime(difference.length > 0 ? difference[0] : "N/A");
    } else {
      let taken: string[] = [];
      takenAppointments?.forEach((appointment) => {
        if (date?.toISOString().slice(0, 10) === appointment.date.toString()) {
          taken.push(appointment.time.toString().slice(0, 5));
        }
      });
      let difference = available.filter((x) => !taken.includes(x));
      setTime(difference.length > 0 ? difference[0] : "N/A");
      setAvailableAppointments(difference.length > 0 ? difference : ["N/A"]);
    }
  };

  const [time, setTime] = useState(availableAppointments[0]);

  const handleTimeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTime(event.target.value as string);
    setErrorData({ dateError: dateError, timeError: false });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (selectedDate?.getDay() === 6 || selectedDate?.getDay() === 0) {
      setErrorData({ dateError: true, timeError: timeError });
    } else if (time === "N/A") {
      setErrorData({ dateError: dateError, timeError: true });
    } else {
      if (selectedDate) {
        const date = selectedDate.toISOString().slice(0, 10);
        postAppointment(id, { date, time }, history);
      }
    }
  };

  return loading || !takenAppointments ? (
    <Loading></Loading>
  ) : (
    <Container className={classes.container}>
      <form
        autoComplete="off"
        onSubmit={(e) => onSubmit(e)}
        className={classes.form}
      >
        <Typography variant="h6" className={classes.title}>
          Book an appointment
        </Typography>
        <div className={classes.input}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date"
              label={dateError ? "Date - Closed during weekends" : "Date"}
              format="dd/MM/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              error={dateError}
              minDate={new Date().toISOString().slice(0, 10)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <FormControl className={classes.time}>
              <InputLabel shrink id="time">
                Time {timeError ? " Invalid time" : null}
              </InputLabel>
              <Select
                labelId="time"
                id="time"
                value={time}
                onChange={handleTimeChange}
                error={timeError}
              >
                {availableAppointments.map((app) => (
                  <MenuItem value={app} key={app}>
                    {app}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </MuiPickersUtilsProvider>
        </div>
        <Button variant="contained" color="primary" type="submit">
          Book appointment
        </Button>
      </form>
    </Container>
  );
};

interface MapStateToProps {
  appointmentState: AppointmentState;
}

interface MapDispatchToProps {
  getTakenAppointments: (id: string) => void;
  postAppointment: (id: string, form: IAppointmentForm, history: any) => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  appointmentState: state.appointment,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppointmentActionTypes>
): MapDispatchToProps => ({
  getTakenAppointments: bindActionCreators(getTakenAppointments, dispatch),
  postAppointment: bindActionCreators(postAppointment, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentForm);
