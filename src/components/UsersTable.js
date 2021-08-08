import React from "react";
import PropTypes from "prop-types";
import Pagination from "./Pagination";

// components

import UserTableDropdown from "./UserTableDropdown.js";

export default function UsersTable({ color, users, title }) {
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
                  Username
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Email
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
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <img
                        src="data:image/png;base64,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"
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
                        {user.username}
                      </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {user.email}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      <UserTableDropdown id={user.id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination />
        </div>
      </div>
    </>
  );
}

UsersTable.defaultProps = {
  color: "light",
};

UsersTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
  printOrders: PropTypes.array,
};
