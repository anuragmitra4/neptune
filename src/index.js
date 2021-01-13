import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';
import { createStore, combineReducers } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCqOhWUCIfJJw1k0kDTHq7R_55AOntBLQ8",
  authDomain: "h2ok-innovations.firebaseapp.com",
  databaseURL: "https://h2ok-innovations.firebaseio.com",
  projectId: "h2ok-innovations",
  storageBucket: "h2ok-innovations.appspot.com",
  messagingSenderId: "1011591021382",
  appId: "1:1011591021382:web:fef587cc97efc136905b47",
  measurementId: "G-X7CWWDSSZW"
};

export { firebaseConfig };

firebase.initializeApp(firebaseConfig);
firebase.functions().useFunctionsEmulator('http://localhost:5001');

// Initialize other services on firebase instance
firebase.firestore()

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers and initial state
const store = createStore(rootReducer, composeWithDevTools());

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
