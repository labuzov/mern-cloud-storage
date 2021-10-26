import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "./reducers/appReducer";
import fileReducer from "./reducers/fileReducer";
import userReducer from "./reducers/userReducer";

const reducers = combineReducers({
    auth: userReducer,
    app: appReducer,
    disk: fileReducer,
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store;

export default store