import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import  thunk from "redux-thunk";
import {Student} from "./reducer/StudentReducer";

const reducers = combineReducers({
    Student
});

export const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
