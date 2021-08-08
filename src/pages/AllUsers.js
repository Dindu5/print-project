import React, { useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Pagination from "../components/Pagination";
import baseUrl from "../api";
import axios from "axios";
import { toast } from "react-toastify";

// components

import UserTableDropdown from "../components/UserTableDropdown.js";

export default function Organisations({ color, title }) {
  const [allUsers, setAllUsers] = useState([]);
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

  useEffect(() => {
    const AuthToken = localStorage.getItem("AuthToken");
    if (AuthToken) {
      axios.defaults.headers.common.Authorization = AuthToken;
      async function getData() {
        try {
          const usersResponse = await axios.get(`${baseUrl}/users/`);
          setAllUsers(usersResponse.data);
        } catch (error) {
          errorNotification(
            "Could not get organisations data, please try again"
          );
        }
      }
      getData();
    }
  }, [setAllUsers]);

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
                  Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Print Orders
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Account Type
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
              {allUsers.map((user) => {
                return (
                  <tr key={user.id}>
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
                        {formatName(user.username)}
                      </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {user.email}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {user.print_orders?.length || "0"}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        {!user.isOrganisation && user.organisation === null && (
                          <div className="flex justify-center items-center m-1 px-2 py-1 rounded-full bg-blueGray-200 text-base text-blueGray font-medium">
                            <div className="flex-initial max-w-full leading-none text-xs font-normal">
                              Single User
                            </div>
                          </div>
                        )}

                        {!user.isOrganisation && user.organisation !== null && (
                          <div className="flex justify-center items-center m-1 px-2 py-1 rounded-full bg-teal-200 text-base text-orange-800 font-medium">
                            <div className="flex-initial max-w-full leading-none text-xs font-normal">
                              Organisation User
                            </div>
                          </div>
                        )}

                        {user.isOrganisation && (
                          <div className="flex justify-center items-center m-1 px-2 py-1 rounded-full bg-lightBlue-200 text-base text-orange-800 font-medium">
                            <div className="flex-initial max-w-full leading-none text-xs font-normal">
                              Organisation Admin
                            </div>
                          </div>
                        )}
                      </div>
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

Organisations.defaultProps = {
  color: "light",
};

Organisations.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
  printOrders: PropTypes.array,
};
