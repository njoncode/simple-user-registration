import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import { ToastProvider } from 'react-toast-notifications';

import './index.css';

import { persistor, store }  from './redux/store';
import history from './utils/history';

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider style={{ zIndex: '9999999' }}>
    <Provider store={store}>
    <ConnectedRouter history={history}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </ConnectedRouter>
    </Provider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
