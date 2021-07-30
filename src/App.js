import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./layouts/Admin.js";
import Auth from "./layouts/Auth";
import CreateOrder from "./pages/CreateOrder";
import ContactUs from "./pages/ContactUs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { OrganisationContext } from "./context/OrganisationContext";
import { PrintOrderContext } from "./context/PrintOrderContext";
import { WalletContext } from "./context/WalletContext";

import baseUrl from "./api";
import axios from "axios";
import { toast } from "react-toastify";

function App() {
  const { setUser } = useContext(UserContext);
  const { setOrganisation } = useContext(OrganisationContext);
  const { setWallet } = useContext(WalletContext);
  const { setPrintOrders } = useContext(PrintOrderContext);
  const errorNotification = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const AuthToken = localStorage.getItem("AuthToken");

  useEffect(() => {
    if (AuthToken) {
      axios.defaults.headers.common.Authorization = AuthToken;
      async function getData() {
        const userUrl = `${baseUrl}/users/me`;
        try {
          const userResponse = await axios.get(userUrl);
          setUser({
            authenticated: true,
            data: userResponse.data,
          });
          if (userResponse.data.isOrganisation) {
            const organisationResponse = await axios.get(
              `${baseUrl}/organisations/${userResponse.data.organisation}`
            );
            setOrganisation(organisationResponse.data);
            const walletResponse = await axios.get(
              `${baseUrl}/wallets/${organisationResponse.data.wallet.id}`
            );
            setWallet(walletResponse.data);
          }
          if (!userResponse.data.isOrganisation) {
            const walletResponse = await axios.get(
              `${baseUrl}/wallets/${userResponse.data.wallet.id}`
            );
            setWallet(walletResponse.data);
          }
          const printOrderResponse = await axios.get(
            `${baseUrl}/print-orders?_sort=created_at:DESC&&users_permissions_user=${userResponse.data.id}`
          );
          setPrintOrders(printOrderResponse.data);
        } catch (error) {
          errorNotification("Could not load user details, please try again");
        }
      }
      getData();
    }
  }, [AuthToken, setUser, setOrganisation, setPrintOrders, setWallet]);

  console.log(AuthToken);
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/create-order">
          <CreateOrder />
        </Route>
        <Route exact path="/contact">
          <ContactUs />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
