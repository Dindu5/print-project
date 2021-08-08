import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { OrganisationContext } from "../context/OrganisationContext";
import { css } from "styled-components/macro";
import ClipLoader from "react-spinners/ClipLoader";

// components
const override = css`
  display: block;
  margin: 0 auto;
  > span {
    color: #000000 !important;
  }
`;

export default function CardSettings({ title, isOrganisation }) {
  const { user } = useContext(UserContext);
  const { organisation } = useContext(OrganisationContext);
  const [loading, setloading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    setloading(true);
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">{title}</h6>
            {!isEditing && (
              <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={submitForm}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              {isOrganisation ? "Organization Information" : "User Information"}
            </h6>

            {isOrganisation ? (
              <>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={
                          isEditing
                            ? "block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            : "block text-blueGray-600 text-xs mb-2"
                        }
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        className={
                          isEditing
                            ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                            : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                        }
                        defaultValue={organisation.name}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={
                          isEditing
                            ? "block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            : "block text-blueGray-600 text-xs mb-2"
                        }
                        htmlFor="grid-password"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        className={
                          isEditing
                            ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                            : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                        }
                        defaultValue={organisation.email}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={
                          isEditing
                            ? "block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            : "block text-blueGray-600 text-xs mb-2"
                        }
                        htmlFor="id"
                      >
                        ID
                      </label>
                      <input
                        type="text"
                        name="id"
                        className={
                          isEditing
                            ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                            : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                        }
                        defaultValue={organisation.id}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={
                          isEditing
                            ? "block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            : "block text-blueGray-600 text-xs mb-2"
                        }
                        htmlFor="username"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        disabled
                        className={
                          isEditing
                            ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                            : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                        }
                        defaultValue={user.data.username || ""}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={
                          isEditing
                            ? "block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            : "block text-blueGray-600 text-xs mb-2"
                        }
                        htmlFor="email"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        className={
                          isEditing
                            ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                            : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                        }
                        defaultValue={user.data ? user.data.email || "" : ""}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={
                          isEditing
                            ? "block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            : "block text-blueGray-600 text-xs mb-2"
                        }
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className={
                          isEditing
                            ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                            : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                        }
                        defaultValue={user.data.firstName || ""}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={
                          isEditing
                            ? "block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            : "block text-blueGray-600 text-xs mb-2"
                        }
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className={
                          isEditing
                            ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                            : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                        }
                        defaultValue={user.data.lastName}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Contact Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className={
                      isEditing
                        ? "block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        : "block text-blueGray-600 text-xs mb-2"
                    }
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <textarea
                    type="text"
                    className={
                      isEditing
                        ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                        : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                    }
                    defaultValue={
                      isOrganisation ? organisation.address : user.data.address
                    }
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>
            {isEditing && (
              <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mt-5"
                type="button"
              >
                {!loading ? (
                  "Update Account"
                ) : (
                  <ClipLoader
                    color="#54E0C7"
                    loading={loading}
                    css={override}
                    size={20}
                  />
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
