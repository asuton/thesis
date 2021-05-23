import React from "react";
import { IAlert, AlertState } from "../redux/types/alert";
import { AppState } from "../redux/reducers/rootReducer";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: "750px",
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, 0)",
    top: "10%",
  },
});

type Props = MapStateToProps;

const Alerts: React.FC<Props> = (props: Props) => {
  const { alerts } = props.alertState;
  const classes = useStyles();

  return alerts && alerts.length > 0 ? (
    <div className={classes.root}>
      {alerts.map((alert: IAlert) => (
        <Alert key={alert.id} severity={alert.alertType}>
          {alert.msg}
        </Alert>
      ))}
    </div>
  ) : null;
};

interface MapStateToProps {
  alertState: AlertState;
}
const mapStateToProps = (state: AppState): MapStateToProps => ({
  alertState: state.alert,
});

export default connect(mapStateToProps)(Alerts);
