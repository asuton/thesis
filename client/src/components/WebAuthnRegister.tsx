import Button from "@material-ui/core/Button";
import { AppState } from "../redux/reducers/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React from "react";
import { WebAuthnState, WebAuthnActionTypes } from "../redux/types/webauthn/";
import { getMakeCredChallenge } from "../redux/actions/webauthn/";
import { useHistory } from "react-router";

type Props = MapStateToProps & MapDispatchToProps;

const WebAuthnRegister: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const register = async (e: any) => {
    e.preventDefault();
    props.getMakeCredChallenge(history);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      fullWidth
      onClick={(e) => register(e)}
    >
      Register
    </Button>
  );
};

interface MapStateToProps {
  webAuthnState: WebAuthnState;
}

interface MapDispatchToProps {
  getMakeCredChallenge: (history: any) => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  webAuthnState: state.webauthn,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, WebAuthnActionTypes>
): MapDispatchToProps => ({
  getMakeCredChallenge: bindActionCreators(getMakeCredChallenge, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WebAuthnRegister);
