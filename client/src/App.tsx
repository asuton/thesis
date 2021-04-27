import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Patients from "./components/Patients";
import MiniDrawer from "./components/MiniDrawer";

import { Provider } from "react-redux";
import store from "./redux/store";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/auth/loadUser";
import { IAuth } from "./redux/types/auth/user";
import setAuthToken from "./redux/utils/setAuthToken";
import WebAuthnRegister from "./components/WebAuthnRegister";

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
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <MiniDrawer>
          <PrivateRoute path="/patients" component={Patients} />
          <WebAuthnRegister></WebAuthnRegister>
        </MiniDrawer>
      </Router>
    </Provider>
  );
}

export default App;
