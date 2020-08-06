import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAtKstPX9uy9eFd_xkV05Lrf_MQPZhfUm4",
    authDomain: "cart-4e7d7.firebaseapp.com",
    databaseURL: "https://cart-4e7d7.firebaseio.com",
    projectId: "cart-4e7d7",
    storageBucket: "cart-4e7d7.appspot.com",
    messagingSenderId: "894289453300",
    appId: "1:894289453300:web:6cecc3be21935e4b0ffea1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
