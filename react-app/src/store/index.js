import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import habitsReducer from './habits';
import dailiesReducer from './dailies';
import todosReducer from './todos';
import rewardsReducer from './rewards';

const rootReducer = combineReducers({
  session,
  habits: habitsReducer,
  dailies: dailiesReducer,
  todos: todosReducer,
  rewards: rewardsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
