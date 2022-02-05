import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import firebase from 'firebase/app';
import { BrowserRouter } from 'react-router-dom';

console.log(firebase);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,

  document.getElementById('root')
);
