import React from "react";
import { createPopper } from "@popperjs/core";
// import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const UserTableDropdown = ({ id }) => {
  // const { user } = useContext(UserContext);
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
      const deleteResponse = await axios.delete(`/print-orders/${id}`);

      console.log(deleteResponse);
      return true;
    } catch (e) {
      console.log(e.reponse);
      return false;
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
        if (endpointCall()) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        }
      } else {
        swal("Loan offer not deleted!");
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
        <Link
          to={`/admin/jobs/${id}`}
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          <i className="fas fa-binoculars mr-3"></i>
          View User
        </Link>

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
          Remove User
        </a>
      </div>
    </>
  );
};

export default UserTableDropdown;
