import { getGetAssertionChallenge } from "../redux/actions/webauthn";
import Button from "@material-ui/core/Button";

const WebAuthnLogin = () => {
  const register = async (e: any) => {
    e.preventDefault();
    getGetAssertionChallenge();
  };

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      fullWidth
      onClick={(e) => register(e)}
    >
      Login
    </Button>
  );
};

export default WebAuthnLogin;
