import {combineReducers} from 'redux';
import CustomerReducer from '../reducers/CustomerReducer';
import AuthReducer from '../reducers/AuthReducer';
import ProviderReducer from './ProviderReducer';
export default combineReducers({
  auth: AuthReducer,
  customer: CustomerReducer,
  provider: ProviderReducer,
});
