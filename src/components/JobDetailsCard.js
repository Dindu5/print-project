import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
// import { OrganisationContext } from "../context/OrganisationContext";
import { css } from "styled-components/macro";
import { PrintOrderContext } from "../context/PrintOrderContext";
import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from "../api";
import axios from "axios";
import swal from "sweetalert";

// components
const override = css`
  display: block;
  margin: 0 auto;
  > span {
    color: #000000 !important;
  }
`;

export default function CardSettings() {
  const { user } = useContext(UserContext);
  // const { organisation } = useContext(OrganisationContext);
  const { setPrintOrders, printOrders } = useContext(PrintOrderContext);
  const [loading, setloading] = React.useState(false);
  const [printOrder, setprintOrder] = React.useState({});
  const [isEditing, setIsEditing] = React.useState(false);
  const [values, setValues] = React.useState({
    proofReading: false,
    basicFormatting: true,
    documentVetting: false,
  });

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

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

  let { id } = useParams();

  const submitForm = async (e) => {
    e.preventDefault();
    swal({
      title: "Order Update?",
      text: "Are you sure you want to update this print order?!",
      icon: "warning",
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        endpointCall();
      } else {
        swal({
          text: "Order not not deleted!",
          timer: 1000,
          icon: "info",
          button: false,
        });
      }
    });
  };

  const endpointCall = async () => {
    try {
      const deleteUrl = `${baseUrl}/print-orders/${id}`;
      const AuthToken = localStorage.getItem("AuthToken");
      axios.defaults.headers.common.Authorization = AuthToken;
      const updateResponse = await axios.put(deleteUrl, {
        ...printOrder,
        ...values,
      });
      console.log(updateResponse);
      setPrintOrders(
        printOrders.map((order) => {
          if (order.id === updateResponse.data.id) {
            return { ...order, ...updateResponse.data };
          } else {
            return order;
          }
        })
      );
      try {
        const emailData = {
          email: updateResponse.data.email,
          name: updateResponse.data.firstName,
          documentName: updateResponse.data.name,
          status: updateResponse.data.status,
          id: updateResponse.data.id,
        };
        const emailResponse = await axios.post(
          `${baseUrl}/emails/update`,
          emailData
        );
        console.log(emailResponse);
      } catch (error) {
        console.log(error);
      }
      swal("Poof! Print order has been deleted successfully!", {
        icon: "success",
      });
      setloading(false);
    } catch (e) {
      console.log(e.request);
      swal({
        title: "Update Failed!",
        icon: "error",
        text: "Something went wrong, could not update order, please try again!",
        timer: 2000,
        button: false,
      });
      setloading(false);
    }
  };

  React.useEffect(() => {
    const AuthToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common.Authorization = AuthToken;
    async function getData() {
      const userUrl = `${baseUrl}/print-orders/${id}`;
      try {
        const printOrderResponse = await axios.get(userUrl);
        setprintOrder(printOrderResponse.data);
        console.log(printOrderResponse.data);
      } catch (error) {
        errorNotification(
          "Could not get print order details, please refresh your browser"
        );
      }
    }
    getData();
  }, [setprintOrder, id]);

  const editOrder = () => {
    if (printOrder.status === "processing" && !user.data.isAdmin) {
      errorNotification(
        "You cant update this print order while it is processing"
      );
    } else if (printOrder.status === "completed" && !user.data.isAdmin) {
      errorNotification("You cant update a completed print order");
    } else if (printOrder.status === "delivered" && !user.data.isAdmin) {
      errorNotification("Cannot edit, Print order is already delivered");
    } else setIsEditing(true);
  };

  // const downloadOrder = () => {
  //   console.log("downloaded");
  // };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Job Details</h6>
            <div className="d-flex align-center">
              <a
                href={`${baseUrl}${printOrder.file?.url}`}
                target="_blank"
                rel="noreferrer"
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                download
              >
                Download File
              </a>
              {!isEditing && (
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => editOrder()}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={submitForm}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              User Information
            </h6>

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
                    defaultValue={
                      printOrder.users_permissions_user
                        ? printOrder.users_permissions_user.username || ""
                        : ""
                    }
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
                    onChange={handleInput}
                    disabled={!isEditing}
                    className={
                      isEditing
                        ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                        : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                    }
                    defaultValue={
                      printOrder.email ? printOrder.email || "" : ""
                    }
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
                    disabled={!isEditing}
                    onChange={handleInput}
                    className={
                      isEditing
                        ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                        : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                    }
                    defaultValue={printOrder.firstName || ""}
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
                    disabled={!isEditing}
                    onChange={handleInput}
                    className={
                      isEditing
                        ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                        : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                    }
                    defaultValue={printOrder.lastName}
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Document Details
            </h6>
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
                    name="name"
                    disabled={!isEditing}
                    onChange={handleInput}
                    className={
                      isEditing
                        ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                        : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                    }
                    defaultValue={printOrder.name || ""}
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
                    htmlFor="noOfCopies"
                  >
                    No of copies
                  </label>
                  <input
                    type="number"
                    name="noOfCopies"
                    onChange={handleInput}
                    disabled
                    className={
                      isEditing
                        ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                        : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                    }
                    defaultValue={
                      printOrder.noOfCopies ? printOrder.noOfCopies || "" : ""
                    }
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
                    htmlFor="noOfPages"
                  >
                    No of Pages
                  </label>
                  <input
                    type="text"
                    name="noOfPages"
                    onChange={handleInput}
                    disabled
                    className={
                      isEditing
                        ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                        : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                    }
                    defaultValue={printOrder.noOfPages || ""}
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
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <select
                    onChange={handleInput}
                    name="status"
                    defaultValue={printOrder.status}
                    disabled={!user.data.isAdmin || !isEditing}
                    className={
                      isEditing
                        ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                        : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Print Options
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
                    htmlFor="status"
                  >
                    Document Delivery
                  </label>
                  <select
                    onChange={handleInput}
                    name="status"
                    defaultValue={printOrder.homeDelivery}
                    disabled
                    className={
                      isEditing
                        ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                        : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                    }
                  >
                    <option value={true}>Home Delivery</option>
                    <option value={false}>Pickup</option>
                  </select>
                </div>
              </div>
              {!printOrder.homeDelivery ? (
                <>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={
                          isEditing
                            ? "block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            : "block text-blueGray-600 text-xs mb-2"
                        }
                        htmlFor="state"
                      >
                        State
                      </label>
                      <select
                        onChange={handleInput}
                        name="state"
                        defaultValue={printOrder.state}
                        disabled={!isEditing}
                        className={
                          isEditing
                            ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                            : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                        }
                      >
                        <option value="you don see am">Test</option>
                        <option value="Big Nigerian">Another</option>
                      </select>
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
                        htmlFor="lga"
                      >
                        Lga
                      </label>
                      <select
                        onChange={handleInput}
                        name="lga"
                        defaultValue={printOrder.lga}
                        disabled={!isEditing}
                        className={
                          isEditing
                            ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                            : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                        }
                      >
                        <option value="Rice market">Somewhere l</option>
                        <option value="Big Nigerian">Another</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className={
                          isEditing
                            ? "block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            : "block text-blueGray-600 text-xs mb-2"
                        }
                        htmlFor="deliveryAddress"
                      >
                        Address
                      </label>
                      {isEditing ? (
                        <textarea
                          type="text"
                          name="deliveryAddress"
                          onChange={handleInput}
                          className={
                            isEditing
                              ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                              : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                          }
                          defaultValue={printOrder.deliveryAddress}
                          rows="4"
                        ></textarea>
                      ) : (
                        <input
                          type="text"
                          name="deliveryAddress"
                          onChange={handleInput}
                          className={
                            isEditing
                              ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                              : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                          }
                          defaultValue={printOrder.deliveryAddress}
                        />
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={
                        isEditing
                          ? "block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          : "block text-blueGray-600 text-xs mb-2"
                      }
                      htmlFor="pickUpLocation"
                    >
                      Pickup Location
                    </label>
                    <select
                      onChange={handleInput}
                      name="pickUpLocation"
                      defaultValue={printOrder.pickUpLocation}
                      disabled={!isEditing}
                      className={
                        isEditing
                          ? "border-0 placeholder-blueGray-300 text-blueGray-600 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-white text-sm shadow px-3 py-3"
                          : "border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                      }
                    >
                      <option value="12 avenue awka">Hostel E</option>
                      <option value="Big Nigerian">Another</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            {isEditing && (
              <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mt-5"
                type="submit"
              >
                {!loading ? (
                  "Update Order"
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
