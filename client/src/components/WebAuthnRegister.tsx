import { getMakeCredChallenge } from "../redux/actions/webauthn/";
import Button from "@material-ui/core/Button";

const WebAuthnRegister = () => {
  const register = async (e: any) => {
    e.preventDefault();
    getMakeCredChallenge();
  };

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      fullWidth
      onClick={(e) => register(e)}
    >
      Prijava
    </Button>
  );
};

export default WebAuthnRegister;
