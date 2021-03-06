import React, { useContext } from "react";
import { createPopper } from "@popperjs/core";
import { UserContext } from "../context/UserContext";
import { PrintOrderContext } from "../context/PrintOrderContext";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import baseUrl from "../api";

const NotificationDropdown = ({ id }) => {
  const { user } = useContext(UserContext);
  const { printOrders, setPrintOrders } = useContext(PrintOrderContext);
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const endpointCall = async () => {
    try {
      const deleteUrl = `${baseUrl}/print-orders/${id}`;
      const AuthToken = localStorage.getItem("AuthToken");
      axios.defaults.headers.common.Authorization = AuthToken;
      const deleteResponse = await axios.delete(deleteUrl);
      console.log(deleteResponse);
      swal("Poof! Print order has been deleted successfully!", {
        icon: "success",
      });
      setPrintOrders(
        printOrders.filter((order) => order.id !== deleteResponse.data.id)
      );
    } catch (e) {
      console.log(e.request);
      swal({
        title: "Failed!",
        icon: "error",
        text: "Something went wrong, could not delete order please try again!",
        timer: 2000,
        button: false,
      });
    }
  };
  const deleteOrder = async () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Print Order!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
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
  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        {user.data.isAdmin ? (
          <Link
            to={`/admin/jobs/${id}`}
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
          >
            <i className="fas fa-user-edit mr-3"></i>
            Update Order
          </Link>
        ) : (
          <Link
            to={`/admin/jobs/${id}`}
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
          >
            <i className="fas fa-binoculars mr-3"></i>
            View Order
          </Link>
        )}
        <a
          href="#delete"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transperent text-red-500"
          }
          onClick={(e) => {
            e.preventDefault();
            deleteOrder();
          }}
        >
          <i className="fas fa-trash mr-4"></i>
          Delete Order
        </a>
      </div>
    </>
  );
};

export default NotificationDropdown;
