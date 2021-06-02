import image from "../../assets/services.jpg";
import textImage from "../../assets/text.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  mainFeatured: {
    [theme.breakpoints.up("lg")]: {
      height: 620,
    },
    [theme.breakpoints.down("md")]: {
      height: 500,
    },
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
  cardContainer: {
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(5, 10, 5),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5, 4, 5),
    },
    borderTop: "solid",
    borderTopColor: "#c0c0c08f",
    borderBottom: "solid",
    borderBottomColor: "#c0c0c08f",
  },
  textFeatured: {
    [theme.breakpoints.up("lg")]: {
      height: 650,
    },
    [theme.breakpoints.down("md")]: {
      height: 450,
    },
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.common.white,
    backgroundImage: `url(${textImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  textFeaturedContent: {
    position: "relative",
    padding: theme.spacing(12, 5, 10),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(5, 10, 0),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5, 4, 0),
    },
  },
}));

export default function MainFeatured() {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.mainFeatured}>
        <Grid item md={6} className={classes.mainFeaturedContent}></Grid>
      </Grid>
      <div className={classes.cardContainer}>
        <Grid container>
          <Typography
            variant="h3"
            component="h1"
            color="primary"
            gutterBottom
            className={classes.title}
          >
            Services
          </Typography>
          <Typography variant="body1" paragraph>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
            semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
            porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
            ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
            nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
            Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies
            nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget
            condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem
            neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,
            hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.
            Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.
            Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed
            fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed
            consequat, leo eget bibendum sodales, augue velit cursus nunc, quis
            gravida magna mi a libero. Fusce vulputate eleifend sapien.
            Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id,
            metus. Nullam accumsan lorem in dui.
            <br />
            <br />
            Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et
            arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet
            iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu,
            accumsan a, consectetuer eget, posuere ut, mauris. Praesent
            adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy
            metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut
            eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit
            amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis
            hendrerit risus. Phasellus nec sem in justo pellentesque facilisis.
            Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor,
            tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula
            sapien, tincidunt non, euismod vitae, posuere imperdiet, leo.
            Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis
            vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan
            cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus
            et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor
            congue, elit erat euismod orci.
          </Typography>
        </Grid>
      </div>
      <Grid container className={classes.textFeatured}>
        <Grid item md={6} className={classes.textFeaturedContent}></Grid>
      </Grid>
      <div className={classes.cardContainer}>
        <Grid container>
          <Typography
            variant="h3"
            component="h1"
            color="primary"
            gutterBottom
            className={classes.title}
          >
            Lorem ipsum
          </Typography>
          <Typography variant="body1" paragraph>
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?"
            <br />
            <br />
            Pellentesque ut neque. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. In dui
            magna, posuere eget, vestibulum et, tempor auctor, justo. In ac
            felis quis tortor malesuada pretium. Pellentesque auctor neque nec
            urna. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi.
            Aenean viverra rhoncus pede. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Ut non enim
            eleifend felis pretium feugiat. Vivamus quis mi. Phasellus a est.
            Phasellus magna. In hac habitasse platea dictumst. Curabitur at
            lacus ac velit ornare lobortis. Curabitur a felis in nunc fringilla
            tristique.
          </Typography>
        </Grid>
      </div>
    </>
  );
}
