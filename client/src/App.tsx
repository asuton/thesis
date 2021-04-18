import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Patients from "./components/Patients";

import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/patients" component={Patients} />
      </Router>
    </Provider>
  );
}

export default App;
