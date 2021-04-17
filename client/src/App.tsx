import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import PrivateRoute from "./components/privateRoute";
import Patients from "./components/patients";

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
