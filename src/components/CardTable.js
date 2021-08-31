import React from "react";
import PropTypes from "prop-types";
import Pagination from "./Pagination";
import formatNaira from "format-to-naira";
import img from "../assets/empty.svg";

// components

import TableDropdown from "./TableDropdown.js";

export default function CardTable({ color, printOrders, title }) {
  const getWidth = (status) => {
    let width = "";
    switch (status) {
      case "pending":
        width = "25%";
        break;
      case "processing":
        width = "50%";
        break;
      case "completed":
        width = "75%";
        break;
      case "delivered":
        width = "100%";
        break;
      default:
        break;
    }
    return width;
  };

  const formatName = (str) => {
    const slicedString = str.slice(0, 20);
    if (str.length > 20) {
      return slicedString + "....";
    } else {
      return slicedString;
    }
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                {title}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Order Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Amount
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Owner
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Completion
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            {printOrders.length > 0 ? (
              <tbody>
                {printOrders.map((order) => {
                  return (
                    <tr key={order.id}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0hjxbQj0i-I3pfkx4iKiGbBGdRfTOZ1mhZg&usqp=CAU"
                          className="h-8 w-8 bg-white rounded-full border"
                          alt="..."
                        ></img>{" "}
                        <span
                          className={
                            "ml-3 font-bold " +
                            +(color === "light"
                              ? "text-blueGray-600"
                              : "text-white")
                          }
                        >
                          {formatName(order.name)}
                        </span>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {formatNaira(order.amount)}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i
                          className={`fas fa-circle mr-2 ${
                            order.status === "pending" && "text-red-500"
                          } ${
                            order.status === "processing" && "text-orange-500"
                          } ${
                            order.status === "completed" && "text-emerald-500"
                          }
                          ${
                            order.status === "delivered" && "text-emerald-500"
                          }`}
                        ></i>{" "}
                        {order.status}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {order.users_permissions_user?.username ||
                          order.firstName + " " + order.lastName}
                        {/* <div className="flex">
                      <img
                        src={require("../images/team-1-800x800.jpg").default}
                        alt="..."
                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                      ></img>
                      <img
                        src={require("../images/team-2-800x800.jpg").default}
                        alt="..."
                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      ></img>
                      <img
                        src={require("../images/team-3-800x800.jpg").default}
                        alt="..."
                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      ></img>
                      <img
                        src={require("../images/team-4-470x470.png").default}
                        alt="..."
                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      ></img>
                    </div> */}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">{getWidth(order.status)}</span>
                          <div className="relative w-full">
                            <div
                              className={`overflow-hidden h-2 text-xs flex rounded ${
                                order.status === "pending" && "bg-red-200"
                              } ${
                                order.status === "processing" &&
                                "text-orange-200"
                              } ${
                                order.status === "completed" && "bg-teal-200"
                              } ${
                                order.status === "delivered" &&
                                "text-emerald-200"
                              }`}
                            >
                              <div
                                style={{ width: getWidth(order.status) }}
                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                  order.status === "pending" && "bg-red-500"
                                } ${
                                  order.status === "processing" &&
                                  "text-orange-500"
                                } ${
                                  order.status === "completed" && "bg-teal-500"
                                } ${
                                  order.status === "delivered" &&
                                  "text-emerald-500"
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <TableDropdown id={order.id} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="6">
                    <div>
                      <p className="text-center my-4">No data found</p>
                      <img
                        src={img}
                        className="empty-image"
                        alt="no data found"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
          <Pagination />
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
  printOrders: PropTypes.array,
};
