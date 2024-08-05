import {combineReducers} from 'redux';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';

const reducers = combineReducers({
    auth : authReducer,
    user : userReducer
})

export default reducers;