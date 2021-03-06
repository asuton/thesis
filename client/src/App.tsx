import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PrivateRoute from "./components/Route/PrivateRoute";
import Patients from "./components/Patient/Patients";
import Doctors from "./components/Doctor/Doctors";
import PrivateWebAuthnRoute from "./components/Route/PrivateWebAuthnRoute";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/auth";
import { IAuth } from "./redux/types/auth/user";
import setAuthToken from "./redux/utils/setAuthToken";
import Layout from "./components/Layout/Layout";
import Services from "./components/Landing/Services";
import Patient from "./components/Patient/Patient";
import MedicalRecord from "./components/MedicalRecord/MedicalRecord";
import MedicalRecordForm from "./components/MedicalRecord/MedicalRecordForm";
import DiagnosticTesting from "./components/DiagnosticTesting/DiagnosticTesting";
import DiagnosticTestingForm from "./components/DiagnosticTesting/DiagnosticTestingForm";
import Doctor from "./components/Doctor/Doctor";
import Landing from "./components/Landing/Landing";
import Alert from "./components/Alert/Alert";
import Appointments from "./components/Appointment/Appointments";
import PatientUpdateForm from "./components/Patient/PatientUpdateForm";
import DoctorUpdateForm from "./components/Doctor/DoctorUpdateForm";
import MedicalRecordUpdateForm from "./components/MedicalRecord/MedicalRecordUpdateForm";
import DoctorForm from "./components/Doctor/DoctorForm";

const storage = localStorage.getItem("user");

if (storage) {
  const user: IAuth = JSON.parse(storage);
  setAuthToken(user.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Layout>
            <Alert></Alert>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/services" component={Services} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/patients" component={Patients} />
              <PrivateRoute exact path="/doctors" component={Doctors} />
              <PrivateRoute exact path="/patients/:id" component={Patient} />
              <PrivateRoute
                exact
                path="/doctors/create"
                component={DoctorForm}
              />
              <PrivateRoute exact path="/doctors/:id/" component={Doctor} />
              <PrivateRoute
                exact
                path="/appointments"
                component={Appointments}
              ></PrivateRoute>
              <PrivateWebAuthnRoute
                exact
                path="/patients/:id/update"
                component={PatientUpdateForm}
              />
              <PrivateWebAuthnRoute
                exact
                path="/doctors/:id/update"
                component={DoctorUpdateForm}
              ></PrivateWebAuthnRoute>
              <PrivateWebAuthnRoute
                exact
                path="/patients/:patId/record/:id"
                component={MedicalRecord}
              />
              <PrivateWebAuthnRoute
                exact
                path="/patients/:id/new-medical"
                component={MedicalRecordForm}
              />
              <PrivateWebAuthnRoute
                exact
                path="/patients/:patId/record/:id/update"
                component={MedicalRecordUpdateForm}
              />
              <PrivateWebAuthnRoute
                exact
                path="/patients/:patId/test/:id"
                component={DiagnosticTesting}
              />
              <PrivateWebAuthnRoute
                exact
                path="/patients/:id/new-test"
                component={DiagnosticTestingForm}
              />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
