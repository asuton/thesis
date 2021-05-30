import { Button } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";

interface Props {
  link: string;
  text?: string;
}

const Back: React.FC<Props> = (props: Props) => {
  return (
    <>
      <Button
        color="primary"
        component={Link}
        to={props.link}
        style={{ marginBottom: "20px" }}
      >
        <ArrowBackIosIcon fontSize="small" />{" "}
        {props.text ? props.text : "Go back"}
      </Button>
    </>
  );
};

export default Back;
