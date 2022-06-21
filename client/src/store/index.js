import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

//aca se hace el pedido asyncrono en nuestras acciones
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));