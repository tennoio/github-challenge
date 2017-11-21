import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import searchReducer from './scenes/Search/reducer';

const reducers = combineReducers({
  search: searchReducer,
});

let storeTemp = createStore(reducers, applyMiddleware(ReduxThunk));

if (process.env.NODE_ENV === 'development') {
  const composeEnhancers = composeWithDevTools({});
  storeTemp = createStore(reducers, composeEnhancers(applyMiddleware(ReduxThunk)));
}

const store = storeTemp;

export default store;
