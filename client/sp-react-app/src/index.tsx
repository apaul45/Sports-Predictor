import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import authReducer from './slices/auth';
import predictionReducer from './slices/prediction';

/*
  The redux toolkit simplifies setting up Redux. To set up Redux in 
  a React app, import configureStore and define the store. Then, 
  pass it to App by wrapping it around App with a Provider tag imported 
  from the 'react-redux' library.
*/
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from "react-redux";

/*
  After defining a slice, the reducer in the slice gets imported and 
  configured into the store 
*/

const store = configureStore({
  reducer: {
    auth: authReducer,
    predictions: predictionReducer
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Infer the `RootState` and `AppDispatch` types from the store itself (define the types for state and dispatch)
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
