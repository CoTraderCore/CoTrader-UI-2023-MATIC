import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'
import { Provider } from 'mobx-react';
import MobXStorage from './MobXStorage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider MobXStorage={MobXStorage}>
    <App/>
  </Provider>
);
serviceWorker.unregister()

