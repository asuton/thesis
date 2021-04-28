import { login } from "../redux/actions/webauthn/register";
import Button from "@material-ui/core/Button";

const WebAuthnLogin = () => {
  const register = async (e: any) => {
    e.preventDefault();
    login();
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
