import {
  GetDoctorsActionTypes,
  GetDoctorState,
  IDoctor,
} from "../redux/types/doctors/doctors";
import { getDoctors } from "../redux/actions/doctors/doctors";
import React, { useEffect, useState } from "react";
import { AppState } from "../redux/reducers/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Can } from "./Can";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TextField, Typography } from "@material-ui/core";

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
    search: {
      marginTop: "100px",
    },
    table: {
      minWidth: 320,
    },
    tableCell: {
      paddingRight: 4,
      paddingLeft: 4,
      textAlign: "center",
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

export const Doctors: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  useEffect(() => {
    props.getDoctors();
  }, [props.getDoctors]);

  const [Search, setSearch] = useState({
    search: "",
  });

  const { search } = Search;
  let filteredDoctors: IDoctor[] = [];
  if (props.doctorsState.doctors) {
    filteredDoctors = props.doctorsState.doctors.filter(
      (doctor) =>
        (doctor.name + " " + doctor.surname)
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1 ||
        doctor.qualification.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  }

  const updateSearch = (e: any) => {
    setSearch({
      ...Search,
      search: e.target.value.substr(0, 30),
    });
  };

  return props.doctorsState.loading || !props.doctorsState.doctors ? (
    <div>"Loading"</div>
  ) : (
    <Can I="read" a="Doctor">
      <div className={classes.root}>
        <TextField
          placeholder="Search doctors"
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
                <col style={{ width: "33.33%" }} />
                <col style={{ width: "33.33%" }} />
                <col style={{ width: "33.33%" }} />
              </colgroup>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    <Typography variant="h6">Name</Typography>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Typography variant="h6">Surname</Typography>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Typography variant="h6">Qualification</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDoctors.map((doctor) => {
                  return (
                    <TableRow
                      key={doctor.id}
                      className={classes.tableRow}
                      component={Link}
                      to={`/doctors/${doctor.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableCell}
                      >
                        {doctor.name}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {doctor.surname}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {doctor.qualification}
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
  doctorsState: GetDoctorState;
}

interface MapDispatchToProps {
  getDoctors: () => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  doctorsState: state.doctors,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, GetDoctorsActionTypes>
): MapDispatchToProps => ({
  getDoctors: bindActionCreators(getDoctors, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Doctors);
