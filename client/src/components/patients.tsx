import {
  GetPatientsActionTypes,
  GetPatientsState,
  IPatient,
} from "../redux/types/patients/patients";
import { getPatients } from "../redux/actions/patients/patients";
import React, { useEffect, useState } from "react";
import { AppState } from "../redux/reducers/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Can } from "./Can";
import { subject } from "@casl/ability";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Loading from "./Loading";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 1200,
      margin: "auto",
      marginBottom: "50px",
    },
    list: {
      display: "flex",
      overflowX: "hidden",
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
  })
);

type Props = MapStateToProps & MapDispatchToProps;

export const Patients: React.FC<Props> = (props: Props) => {
  const { patients, loading } = props.patientsState;
  const { getPatients } = props;

  useEffect(() => {
    getPatients();
  }, [getPatients]);

  const [Search, setSearch] = useState({
    search: "",
  });

  const { search } = Search;
  let filteredPatients: IPatient[] = [];
  if (patients) {
    filteredPatients = patients.filter(
      (patients) =>
        (patients.name + " " + patients.surname)
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1
    );
  }

  const updateSearch = (e: any) => {
    setSearch({
      ...Search,
      search: e.target.value.substr(0, 30),
    });
  };

  const classes = useStyles();

  return loading || !patients ? (
    <Loading></Loading>
  ) : (
    <Can I="read" this={subject("Patient", { id: true })}>
      <div className={classes.root}>
        <TextField
          placeholder="Search patients"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.search}
          variant="outlined"
          value={search}
          onChange={(e) => updateSearch(e)}
        />
        <Paper className={classes.list}>
          <Grid item xs={12}>
            <Table className={classes.table}>
              <colgroup>
                <col style={{ width: "25%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "25%" }} />
              </colgroup>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    <Typography variant="h6">Name</Typography>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Typography variant="h6">Surname</Typography>
                  </TableCell>
                  <TableCell className={(classes.tableCell, classes.mobile)}>
                    <Typography variant="h6">DOB</Typography>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Typography variant="h6">OIB</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPatients.map((patient) => {
                  return (
                    <TableRow
                      key={patient.id}
                      className={classes.tableRow}
                      component={Link}
                      to={`/patients/${patient.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCell}
                      >
                        {patient.name}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {patient.surname}
                      </TableCell>
                      <TableCell
                        className={(classes.tableCell, classes.mobile)}
                      >
                        {moment(patient.dateOfBirth).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {patient.OIB}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid>
        </Paper>
      </div>
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
