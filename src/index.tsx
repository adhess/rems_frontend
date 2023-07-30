import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import {SnackbarProvider} from 'notistack';
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./store/reducer";
import axios from "axios";
import {ACCESS_TOKEN} from "./constants";

const store = createStore(reducer);

axios.interceptors.request.use(
    (request: any) => {
        let accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) {
            request.headers.Authorization = `Bearer ${accessToken}`;
        }
        return request;
    },
    error => {
        return Promise.reject(error);
    }
)
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <Provider store={store}>
        <Router>
            <React.StrictMode>
                <SnackbarProvider maxSnack={3}>
                    <App/>
                </SnackbarProvider>
            </React.StrictMode>
        </Router>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
