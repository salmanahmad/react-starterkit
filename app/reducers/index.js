
import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'

var reducer = combineReducers({
  router: router
});

export default reducer;
