import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Patients from "./components/Patients";
import Doctors from "./components/Doctors";
import PrivateWebAuthnRoute from "./components/PrivateWebAuthnRoute";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/auth";
import { IAuth } from "./redux/types/auth/user";
import setAuthToken from "./redux/utils/setAuthToken";
import Layout from "./components/Layout";
import Patient from "./components/Patient";
import MedicalRecord from "./components/MedicalRecord";
import MedicalRecordForm from "./components/MedicalRecordForm";
import DiagnosticTesting from "./components/DiagnosticTesting";
import DiagnosticTestingForm from "./components/DiagnosticTestingForm";
import Doctor from "./components/Doctor";
import { checkWebAuthnSession } from "./redux/actions/webauthn";
import Landing from "./components/Landing";
import Alert from "./components/Alert";
import AppointmentForm from "./components/AppointmentForm";
import Appointments from "./components/Appointments";
import PatientUpdateForm from "./components/PatientUpdateForm";
import DoctorUpdateForm from "./components/DoctorUpdateForm";

const storage = localStorage.getItem("user");

if (storage) {
  const user: IAuth = JSON.parse(storage);
  setAuthToken(user.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(checkWebAuthnSession());
  }, []);
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Layout>
            <Alert></Alert>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/patients" component={Patients} />
            <PrivateRoute exact path="/doctors" component={Doctors} />
            <PrivateRoute exact path="/patients/:id" component={Patient} />
            <PrivateRoute exact path="/doctors/:id/" component={Doctor} />
            <PrivateRoute
              exact
              path="/doctors/:id/appointment"
              component={AppointmentForm}
            />
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
              path="/patients/:patId/test/:id"
              component={DiagnosticTesting}
            />
            <PrivateWebAuthnRoute
              exact
              path="/patients/:id/new-test"
              component={DiagnosticTestingForm}
            />
          </Layout>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
