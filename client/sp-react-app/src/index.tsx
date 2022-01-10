import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import authReducer from './slices/auth';
import predictionReducer from './slices/prediction';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from "@apollo/client";

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

/* 
  Initialize Apollo Client with two fields: uri specifies the URL of the server, and 
  cache is an instance of InMemoryCahce which caches queries after fetching them
*/
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  // Credentials: include is necessary to pass along the auth cookies with each server request
	credentials: "include",

});

//Connect Redux and Apollo Client to React using the Provider and ApolloProvider tags respectfully
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
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
