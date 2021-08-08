import React from "react";
import { Switch, Redirect } from "react-router-dom";

// components

import AdminNavbar from "../components/AdminNavbar.js";
import Sidebar from "../components/Sidebar.js";
import HeaderStats from "../components/HeaderStats.js";
import FooterAdmin from "../components/FooterAdmin.js";

// views

import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import JobHistory from "../pages/JobHistory";
import JobDetails from "../pages/JobDetails";
import Account from "../pages/Account";
import AdminOrder from "../components/AdminOrder";
import ProtectedRoute from "../components/ProtectedRoute";
import WalletPage from "../pages/WalletPage";
import ManageUsers from "../pages/ManageUsers";
import Organisation from "../pages/Organisations";
import AllUsers from "../pages/AllUsers";

import baseUrl from "../api";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { OrganisationContext } from "../context/OrganisationContext";
import { PrintOrderContext } from "../context/PrintOrderContext";
import { WalletContext } from "../context/WalletContext";

export default function Admin() {
  const { setUser } = React.useContext(UserContext);
  const { setOrganisation } = React.useContext(OrganisationContext);
  const { setWallet } = React.useContext(WalletContext);
  const { setPrintOrders } = React.useContext(PrintOrderContext);
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

  React.useEffect(() => {
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
          if (
            userResponse.data.organisation !== null &&
            !userResponse.data.isAdmin
          ) {
            const organisationResponse = await axios.get(
              `${baseUrl}/organisations/${userResponse.data.organisation}`
            );
            setOrganisation(organisationResponse.data);
            const walletResponse = await axios.get(
              `${baseUrl}/wallets/${organisationResponse.data.wallet.id}`
            );
            setWallet(walletResponse.data);
          }
          if (userResponse.data.organisation === null) {
            const walletResponse = await axios.get(
              `${baseUrl}/wallets/${userResponse.data.wallet}`
            );
            setWallet(walletResponse.data);
          }
          if (!userResponse.data.isAdmin) {
            const printOrderResponse = await axios.get(
              `${baseUrl}/print-orders?_sort=created_at:DESC&&users_permissions_user=${userResponse.data.id}`
            );
            setPrintOrders(printOrderResponse.data);
          } else {
            const printOrderResponse = await axios.get(
              `${baseUrl}/print-orders`
            );
            setPrintOrders(printOrderResponse.data);
          }
        } catch (error) {
          errorNotification("Could not load user details, please try again");
          console.log(error);
        }
      }
      getData();
    }
  }, [AuthToken, setUser, setOrganisation, setPrintOrders, setWallet]);

  return (
    <div>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div
          style={{ minHeight: "72vh" }}
          className="flex flex-col justify-between px-4 md:px-10 mx-auto w-full -m-24"
        >
          <Switch>
            <ProtectedRoute
              path="/admin/dashboard"
              exact
              component={Dashboard}
            />
            <ProtectedRoute path="/admin/profile" exact component={Profile} />
            <ProtectedRoute path="/admin/jobs" exact component={JobHistory} />
            <ProtectedRoute
              path="/admin/jobs/:id"
              exact
              component={JobDetails}
            />
            <ProtectedRoute
              path="/admin/create-order"
              exact
              component={AdminOrder}
            />
            <ProtectedRoute path="/admin/wallet" exact component={WalletPage} />
            <ProtectedRoute path="/admin/account" exact component={Account} />
            <ProtectedRoute path="/admin/users" exact component={ManageUsers} />
            <ProtectedRoute
              path="/admin/organisations"
              exact
              component={Organisation}
            />
            <ProtectedRoute
              path="/admin/manage-users"
              exact
              component={AllUsers}
            />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </div>
  );
}
