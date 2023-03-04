import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "App";
import { store } from "./store/store";
import "index.scss";
import {PlayerContextProvider} from './context/PlayerContext'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PlayerContextProvider>
                <App />
            </PlayerContextProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
