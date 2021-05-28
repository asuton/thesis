import Button from "@material-ui/core/Button";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React from "react";
import { WebAuthnActionTypes } from "../../redux/types/webauthn";
import { getGetAssertionChallenge } from "../../redux/actions/webauthn";

type Props = MapDispatchToProps;

const WebAuthnLogin: React.FC<Props> = (props: Props) => {
  const { getGetAssertionChallenge } = props;
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
      Verify
    </Button>
  );
};

interface MapDispatchToProps {
  getGetAssertionChallenge: () => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, WebAuthnActionTypes>
): MapDispatchToProps => ({
  getGetAssertionChallenge: bindActionCreators(
    getGetAssertionChallenge,
    dispatch
  ),
});

export default connect(null, mapDispatchToProps)(WebAuthnLogin);
