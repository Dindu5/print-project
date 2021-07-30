import React, { useContext } from "react";
import { createPopper } from "@popperjs/core";
import { UserContext } from "../context/UserContext";
import { WalletContext } from "../context/WalletContext";
import { PrintOrderContext } from "../context/PrintOrderContext";
import { OrganisationContext } from "../context/OrganisationContext";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const { user, setUser } = useContext(UserContext);
  const { setWallet } = useContext(WalletContext);
  const { setPrintOrders } = useContext(PrintOrderContext);
  const { setOrganisation } = useContext(OrganisationContext);

  const history = useHistory();

  const successNotification = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("AuthToken");
    setUser();
    setPrintOrders([]);
    setWallet({});
    setOrganisation({});
    successNotification("Sign out successful");
    history.push("/");
  };

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={require("../images/team-1-800x800.jpg").default}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Logged In as{" "}
          {user.data
            ? user.data.username || "Unknown User"
            : "Unidentified User"}
        </a>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => logout()}
        >
          Logout
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
