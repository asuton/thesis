import image from "../../assets/front.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Container, Divider, Paper } from "@material-ui/core";
import LocalHospitalOutlinedIcon from "@material-ui/icons/LocalHospitalOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import ContactSupportOutlinedIcon from "@material-ui/icons/ContactSupportOutlined";
import Map from "./Map";
import LocalPhoneOutlinedIcon from "@material-ui/icons/LocalPhoneOutlined";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";

const useStyles = makeStyles((theme) => ({
  mainFeatured: {
    height: 650,
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.common.white,
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  mainFeaturedContent: {
    position: "relative",
    padding: theme.spacing(12, 5, 10),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(23, 12, 0),
      paddingRight: 200,
    },
  },
  title: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
  },
  text: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
  },
  cardItem: {
    backgroundColor: "#3f51b5",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "solid",
    borderColor: "#3748a3",
    height: "100%",
  },
  cardContainer: {
    position: "absolute",
    top: "525px",
    left: "50%",
    transform: "translate(-50%, 0)",
  },
  icon: {
    color: "#FFFFFF",
    marginTop: "30px",
    marginBottom: "30px",
    width: "2em",
    height: "2em",
  },
  about: {
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(15, 10, 0),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(57, 4, 0),
    },
  },
  contact: {
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(5, 10, 0),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5, 4, 0),
    },
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
  },
  contactItem: {
    display: "flex",
    justifyContent: "row",
  },
  contactIcon: {
    color: "#3f51b5",
    width: "1.25em",
    height: "1.25em",
    marginRight: "15px",
  },
}));

export default function MainFeatured() {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.mainFeatured}>
        <Grid item md={6} className={classes.mainFeaturedContent}>
          <Typography
            variant="h3"
            component="h1"
            color="primary"
            gutterBottom
            className={classes.title}
          >
            Quality medical care
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </Typography>
        </Grid>
      </Grid>
      <Container className={classes.cardContainer}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <Paper className={classes.cardItem}>
              {" "}
              <LocalHospitalOutlinedIcon className={classes.icon} />
              <Typography
                variant="body1"
                paragraph
                style={{
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  color: "#FFFFFF",
                }}
              >
                We offer a wide range of specialties of today's medicine.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.cardItem}>
              {" "}
              <ContactSupportOutlinedIcon className={classes.icon} />
              <Typography
                variant="body1"
                paragraph
                style={{
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  color: "#FFFFFF",
                }}
              >
                Contact us easily and book an appointment.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.cardItem}>
              {" "}
              <AssignmentOutlinedIcon className={classes.icon} />
              <Typography
                variant="body1"
                paragraph
                style={{
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  color: "#FFFFFF",
                }}
              >
                Create a profile and keep track of your own medical record
                results.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <div className={classes.about}>
        {" "}
        <Typography
          variant="h3"
          component="h1"
          color="primary"
          gutterBottom
          className={classes.title}
        >
          About us
        </Typography>
        <Typography variant="body1" paragraph>
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id quod maxime placeat facere possimus,
          omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
          autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
          eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
          voluptatibus maiores alias consequatur aut perferendis doloribus
          asperiores repellat."
        </Typography>
        <br></br>
        <Divider></Divider>
        <br></br>
      </div>
      <div className={classes.contact}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              component="h1"
              color="primary"
              gutterBottom
              className={classes.title}
            >
              Contact
            </Typography>
            <Typography variant="body1" paragraph>
              "At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio."
            </Typography>
            <br></br>
            <div className={classes.contactInfo}>
              <div className={classes.contactItem}>
                <LocalPhoneOutlinedIcon
                  className={classes.contactIcon}
                ></LocalPhoneOutlinedIcon>
                <Typography variant="subtitle1" paragraph>
                  +385991234567
                </Typography>
              </div>
              <div className={classes.contactItem}>
                <RoomOutlinedIcon
                  className={classes.contactIcon}
                ></RoomOutlinedIcon>
                <Typography variant="subtitle1" paragraph>
                  Ulica Ruđera Boškovića 1, 21000 Split
                </Typography>
              </div>
              <div className={classes.contactItem}>
                <MailOutlineOutlinedIcon
                  className={classes.contactIcon}
                ></MailOutlineOutlinedIcon>
                <Typography variant="subtitle1" paragraph>
                  patient.support@medclinic.hr
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Map />
          </Grid>
        </Grid>
      </div>
      <br></br>
    </>
  );
}
