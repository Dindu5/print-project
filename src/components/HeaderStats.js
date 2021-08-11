import tw from "twin.macro";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { WalletContext } from "../context/WalletContext";
import { PrintOrderContext } from "../context/PrintOrderContext";
import { OrganisationContext } from "../context/OrganisationContext";
import formatNaira from "format-to-naira";

// components

import CardStats from "../components/CardStats.js";

const Cover = tw.div`relative bg-primary-900 md:pt-32 pb-32 pt-12`;

export default function HeaderStats() {
  // Context
  const { wallet } = useContext(WalletContext);
  const { printOrders } = useContext(PrintOrderContext);
  const { user } = useContext(UserContext);
  const { organisation } = useContext(OrganisationContext);

  // State update
  const pendingOrders = printOrders.filter(
    (order) => order.status === "pending"
  );
  const completedOrders = printOrders.filter(
    (order) => order.status === "completed"
  );
  let organisationUsers = 0;
  if (organisation.users) {
    organisationUsers = `${organisation.users.length}`;
  }
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
                      ? `${organisationUsers}` || "0"
                      : `${completedOrders}`
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
                    wallet.amount ? formatNaira(wallet.amount) : 0
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
