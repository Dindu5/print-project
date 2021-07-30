import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "tailwindcss/dist/base.min.css";
import "./assets/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import UserContextProvider from "./context/UserContext";
import OrganisationContextProvider from "./context/OrganisationContext";
import WalletContextProvider from "./context/WalletContext";
import PrintOrderContextProvider from "./context/PrintOrderContext";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <OrganisationContextProvider>
        <WalletContextProvider>
          <PrintOrderContextProvider>
            <App />
          </PrintOrderContextProvider>
        </WalletContextProvider>
      </OrganisationContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
