import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import store from './Redux/store'
import { Provider } from 'react-redux';

store.subscribe(() => console.log(store.getState()));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
  </BrowserRouter>
);

