import React from "react";
import { useContext } from "react";
import { PrintOrderContext } from "../context/PrintOrderContext";
import { Link } from "react-router-dom";
import formatNaira from "format-to-naira";

// components

export default function CardPageVisits() {
  // Context
  const { printOrders } = useContext(PrintOrderContext);

  const formatName = (str) => {
    const slicedString = str.slice(0, 20);
    if (str.length > 20) {
      return slicedString + " ....";
    } else {
      return slicedString;
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Recent Orders
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <Link
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                to="/admin/orders"
              >
                See all
              </Link>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 capitalize align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Order Id
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Pages
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {printOrders.map((order) => {
                return (
                  <tr key={order.id}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {formatName(order.name)}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {`POG-${order.id}`}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {order.noOfPages}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {order.status === "processing" && (
                        <i className="fas fa-print text-emerald-500 mr-4"></i>
                      )}
                      {order.status === "pending" && (
                        <i className="fas fa-ellipsis-h text-emerald-500 mr-4"></i>
                      )}
                      {order.status === "completed" && (
                        <i className="fas fa-check-circle text-orange-500 mr-4"></i>
                      )}
                      {order.status === "cancelled" && (
                        <i className="fas fa-ban text-red-500 mr-4"></i>
                      )}
                      {formatNaira(order.amount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
