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
import Account from "../pages/Account";
import AdminOrder from "../components/AdminOrder";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Admin() {
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
            <ProtectedRoute
              path="/admin/jobhistory"
              exact
              component={JobHistory}
            />
            <ProtectedRoute
              path="/admin/create-order"
              exact
              component={AdminOrder}
            />
            <ProtectedRoute path="/admin/wallet" exact component={JobHistory} />
            <ProtectedRoute path="/admin/account" exact component={Account} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </div>
  );
}
