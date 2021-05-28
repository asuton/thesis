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

const headersData = [
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Medical Record",
    href: "/login",
  },
];

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "transparent",
    paddingRight: "80px",
    paddingLeft: "80px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#3f51b5",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
    color: "#3f51b5",
    textDecoration: "none",
  },
  menuIcon: {
    color: "#3f51b5",
  },
  drawerButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
    color: "#3f51b5",
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

const NavbarHome = () => {
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
    return headersData.map(({ label, href }) => {
      return (
        <Link className={classes.menuButton} key={label} to={href}>
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  const Logo = (
    <Typography variant="h6" component="h1" className={classes.logo}>
      <Link key={"Home"} to={"/"} className={classes.menuButton}>
        MedClinic
      </Link>
    </Typography>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Link className={classes.menuButton} key={label} to={href}>
          {label}
        </Link>
      );
    });
  };

  return (
    <header>
      <AppBar className={classes.header} elevation={0} position="absolute">
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
};

export default NavbarHome;
