import { getDummy } from "../redux/actions/webauthn/register";
import Button from "@material-ui/core/Button";

const Dummy = () => {
  const register = async (e: any) => {
    e.preventDefault();
    getDummy();
  };

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      fullWidth
      onClick={(e) => register(e)}
    >
      dummy
    </Button>
  );
};

export default Dummy;
