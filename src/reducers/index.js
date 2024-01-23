
import { combineReducers } from 'redux';
import menuReducer from '../reducers/menuReducer';
import authReducer from '../reducers/authReducer';

const reducers = combineReducers({ menuReducer, authReducer });

export default reducers;
