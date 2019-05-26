import { combineReducers } from 'redux';

import { connectRouter } from 'connected-react-router'
import appReducer from './app-reducer';

export default history => combineReducers({
  router : connectRouter(history),
  appReducer,
})
