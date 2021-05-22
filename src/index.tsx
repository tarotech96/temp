import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import reducers from "./redux/reducers/reducers";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "data",
  storage: storageSession,
  stateReconciler: autoMergeLevel2,
};

const pReducer = persistReducer(persistConfig, reducers);

const store: any = createStore(pReducer, applyMiddleware(thunk));
const persitor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persitor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
