import Button from "@material-ui/core/Button";
import { AppState } from "../redux/reducers/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React from "react";
import { WebAuthnState, WebAuthnActionTypes } from "../redux/types/webauthn/";
import { getGetAssertionChallenge } from "../redux/actions/webauthn/";

type Props = MapStateToProps & MapDispatchToProps;

const WebAuthnLogin: React.FC<Props> = (props: Props) => {
  const register = async (e: any) => {
    e.preventDefault();
    props.getGetAssertionChallenge();
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

interface MapStateToProps {
  webAuthnState: WebAuthnState;
}

interface MapDispatchToProps {
  getGetAssertionChallenge: () => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  webAuthnState: state.webauthn,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, WebAuthnActionTypes>
): MapDispatchToProps => ({
  getGetAssertionChallenge: bindActionCreators(
    getGetAssertionChallenge,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(WebAuthnLogin);
