import React, { useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../redux/actions/auth/login";
import { LoginActiontypes, LoginState } from "../redux/types/auth/login";
import { AppState } from "../redux/reducers/rootReducer";

interface LoginFormState {
  email: string;
  password: string;
}

type Props = MapStateToProps & MapDispatchToProps;

const Login: React.FC<Props> = (props: Props) => {
  const [formData, setFormData] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    props.login(formData);
  };

  return (
    <>
      <div>
        <h3 style={{ color: "#007bff" }}>Prijava</h3>
        <br></br>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="InputEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Unesite email"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputPassword">Lozinka</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Unesite lozinku"
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Prijava
          </button>
        </form>
        <br></br>
        <h6>Nemate profil? Registrirajte se.</h6>
      </div>
    </>
  );
};

interface MapStateToProps {
  login: LoginState;
}

interface MapDispatchToProps {
  login: ({ email, password }: { email: string; password: string }) => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  login: state.login,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, LoginActiontypes>
): MapDispatchToProps => ({
  login: bindActionCreators(login, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
