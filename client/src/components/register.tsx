import React, { useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { register } from "../redux/actions/auth/register";
import {
  RegisterActionTypes,
  RegisterState,
} from "../redux/types/auth/register";
import { AppState } from "../redux/reducers/rootReducer";
import { bindActionCreators } from "redux";

interface RegisterFormState {
  name: string;
  surname: string;
  email: string;
  password: string;
  OIB: string;
  dateOfBirth: string;
  address: string;
  phone: string;
}

type Props = MapStateToProps & MapDispatchToProps;

const Register: React.FC<Props> = (props: Props) => {
  const [formData, setFormData] = useState<RegisterFormState>({
    name: "",
    surname: "",
    email: "",
    password: "",
    OIB: "",
    dateOfBirth: "",
    address: "",
    phone: "",
  });

  const {
    name,
    surname,
    email,
    password,
    OIB,
    dateOfBirth,
    address,
    phone,
  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    props.register(formData);
  };

  return (
    <>
      <div>
        <h3>Registracija</h3>
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
          <div className="form-group">
            <label htmlFor="InputName">name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="name"
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Inputsurname">surname</label>
            <input
              type="text"
              className="form-control"
              id="surname"
              placeholder="surname"
              value={surname}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Inputphone">phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="phone"
              value={phone}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="OIB">OIB</label>
            <input
              type="text"
              className="form-control"
              id="OIB"
              placeholder="OIB"
              value={OIB}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">date</label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              placeholder="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="address"
              value={address}
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
  register: RegisterState;
}

interface MapDispatchToProps {
  register: (form: RegisterFormState) => void;
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
  register: state.register,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, RegisterActionTypes>
): MapDispatchToProps => ({
  register: bindActionCreators(register, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
