import { createStore, applyMiddleware, AnyAction } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { ThunkDispatch } from "redux-thunk";

type DispatchFunctionType = ThunkDispatch<StateType, undefined, AnyAction>;

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware<DispatchFunctionType, StateType>(thunkMiddleware)
  )
);

type StateType = ReturnType<typeof rootReducer>;

export default store;
