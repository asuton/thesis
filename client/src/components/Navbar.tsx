import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
  Drawer,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Can } from "./Can";
import { subject } from "@casl/ability";
import { AuthActionTypes, AuthState } from "../redux/types/auth";
import { AppState } from "../redux/reducers/rootReducer";
import { logout } from "../redux/actions/auth/login";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const headersData = [
  {
    label: "Patients",
    href: "/patients",
  },
  {
    label: "Doctors",
    href: "/doctors",
  },
  {
    label: "Log Out",
    href: "/logout",
  },
];

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "primary",
    paddingRight: "80px",
    paddingLeft: "80px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFFFF",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
    color: "#FFFFFF",
    textDecoration: "none",
  },
  menuIcon: {
    color: "#FFFFFF",
  },
  drawerButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
    color: "#000000",
    textDecoration: "none",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
}));

type Props = MapStateToProps & MapDispatchToProps;

const Navbar: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={classes.toolbar}>
        {Logo}
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const logout = () => {
    props.logout();
    window.location.reload();
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton onClick={() => handleDrawerOpen()}>
          <MenuIcon className={classes.menuIcon} />
        </IconButton>
        <Drawer open={drawerOpen} onClose={() => handleDrawerClose()}>
          <div className={classes.drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>
        <div>{Logo}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return (
      <>
        <Can I="read" this={subject("Patient", { id: true })}>
          <Link
            className={classes.drawerButton}
            key={"Patients"}
            to={"/patients"}
          >
            <MenuItem>{"Patients"}</MenuItem>
          </Link>
        </Can>
        <Can I="read" a="Doctor">
          <Link
            className={classes.drawerButton}
            key={"Doctors"}
            to={"/doctors"}
          >
            <MenuItem>{"Doctors"}</MenuItem>
          </Link>
        </Can>
        <Link
          className={classes.drawerButton}
          key={"Logout"}
          to={"/"}
          onClick={logout}
        >
          <MenuItem>{"Log out"}</MenuItem>
        </Link>
      </>
    );
  };

  const Logo = (
    <Typography variant="h6" component="h1" className={classes.logo}>
      Med
    </Typography>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Can I="read" this={subject("Patient", { id: true })}>
          <Link className={classes.menuButton} key={label} to={href}>
            {label}
          </Link>
        </Can>
      );
    });
  };

  return (
    <header>
      <AppBar className={classes.header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
};

interface MapStateToProps {
  authState: AuthState;
}

interface MapDispatchToProps {
  logout: () => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  authState: state.auth,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AuthActionTypes>
): MapDispatchToProps => ({
  logout: bindActionCreators(logout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);