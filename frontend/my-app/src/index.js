import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; // Import Provider
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from './redux/store'; // Import store and persistor

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap your app in Provider */}
      <PersistGate loading={null} persistor={persistor}> {/* Wrap App in PersistGate */}
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
