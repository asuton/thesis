import spinner from "../spinner.gif";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    margin: "auto",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

export const Loading = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <img
        src={spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </Container>
  );
};

export default Loading;
