import tw from "twin.macro";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { WalletContext } from "../context/WalletContext";
import { PrintOrderContext } from "../context/PrintOrderContext";
import { OrganisationContext } from "../context/OrganisationContext";
import formatNaira from "format-to-naira";
import axios from "axios";

// components

import CardStats from "../components/CardStats.js";

const Cover = tw.div`relative bg-primary-900 md:pt-32 pb-32 pt-12`;

export default function HeaderStats() {
  // Context
  const { wallet } = useContext(WalletContext);
  const { printOrders } = useContext(PrintOrderContext);
  const { user } = useContext(UserContext);
  // const { organisation } = useContext(OrganisationContext);
  const [orgUsers, setorgUsers] = useState("0");
  const [users, setusers] = useState("0");

  // State update
  const pendingOrders = printOrders.filter(
    (order) => order.status === "pending"
  );
  const completedOrders = printOrders.filter(
    (order) => order.status === "completed"
  );
  const submitForm = async () => {
    const AuthToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common.Authorization = AuthToken;
    try {
      const orgsResponse = await axios.get(
        "https://pog-print-backend.herokuapp.com/organisations/count"
      );
      const usersResponse = await axios.get(
        "https://pog-print-backend.herokuapp.com/users/count"
      );
      console.log("fileResponse", orgsResponse);
      setorgUsers(orgsResponse.data);
      setusers(usersResponse.data);
      console.log(usersResponse);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    submitForm();
  }, []);
  return (
    <>
      {/* Header */}
      <Cover>
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PENDING"
                  statTitle={`${pendingOrders.length}` || "0"}
                  statPercentColor="text-emerald-500"
                  statDescripiron="Orders"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total"
                  statTitle={`${printOrders.length}` || "0"}
                  statPercentColor="text-red-500"
                  statDescripiron="Orders"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle={
                    user.data.isOrganisation || user.data.isAdmin
                      ? "Users"
                      : "Completed"
                  }
                  statTitle={
                    user.data.isOrganisation || user.data.isAdmin
                      ? `${users}` || "0"
                      : `${completedOrders.length}`
                  }
                  statPercentColor="text-orange-500"
                  statDescripiron={
                    user.data.isOrganisation || user.data.isAdmin
                      ? "Organisation"
                      : "Orders"
                  }
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle={`${user.data.isAdmin ? "Orgs" : "Wallet"}`}
                  statTitle={`${
                    user.data.isAdmin
                      ? orgUsers
                      : formatNaira(wallet.amount || 0)
                  }`}
                  statPercentColor="text-emerald-500"
                  statDescripiron={`${
                    user.data.isAdmin ? "Organisations" : "Balance"
                  }`}
                  statIconName="fas fa-money-check-alt"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </Cover>
    </>
  );
}
