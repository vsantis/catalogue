import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productReducer from './ducks/product';

export type DispatchType<ActionsType> = (args: ActionsType) => void;

const reducer = combineReducers({ products: productReducer });

export type RootState = ReturnType<typeof reducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function generateStore() {
  const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));
  return store;
}
