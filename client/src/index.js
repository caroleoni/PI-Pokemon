import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

//process.env.REACT_APP_API ||
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001" 

//Necesito pasarle el PROVIDER para poder asignarle el STORE
//Hay que envolver el index en un PROVIDER para que funcione REDUX
ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
