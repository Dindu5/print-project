import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "styled-components/macro";
import { WalletContext } from "../context/WalletContext";
import { PaystackButton } from "react-paystack";
import baseUrl from "../api";
import swal from "sweetalert";
import axios from "axios";

const override = css`
  display: block;
  margin: 0 auto;
  > span {
    color: #000000 !important;
  }
`;

export default function WalletPage() {
  const { user } = useContext(UserContext);
  const { wallet, setWallet } = useContext(WalletContext);
  const [loading, setloading] = useState(false);
  const [values, setValues] = useState({});

  const endpointCall = async () => {
    try {
      const newAmount = values.amount;
      const updateUrl = `${baseUrl}/wallets/${wallet.id}`;
      const AuthToken = localStorage.getItem("AuthToken");
      axios.defaults.headers.common.Authorization = AuthToken;
      const updateResponse = await axios.put(updateUrl, {
        ...wallet,
        amount: newAmount + parseInt(wallet.amount),
      });
      swal(
        "Hurray! Your wallet has been topped up successfully successfully!",
        {
          icon: "success",
        }
      );
      setWallet({
        ...wallet,
        amount: updateResponse.data.amount,
      });
      const input = document.querySelector("#amount-update");
      input.value = "";
    } catch (e) {
      swal({
        title: "Failed!",
        icon: "error",
        text: "Something went wrong, could not complete your payment!",
        timer: 2000,
        button: false,
      });
    }
  };

  const componentProps = {
    email: user.data.email,
    amount: values.amount * 100,
    publicKey: "pk_test_4f8f5ae30de2149b4da6ebf12b7023d1eddf3678",
    text: "Pay Now",
    onSuccess: () => endpointCall(),
    onClose: () =>
      swal({
        text: "Wallet topup failed 😥",
        timer: 1000,
        icon: "info",
        button: false,
      }),
  };

  const handleIntegerInput = (e) => {
    setValues({ ...values, [e.target.name]: parseInt(e.target.value) });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setloading(true);
  };

  return (
    <div className="px-4">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              {user.data.isOrganisation ? "Organisation wallet" : "User Wallet"}
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={submitForm}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Wallet Details
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block text-blueGray-600 text-xs mb-2"
                    htmlFor="grid-password"
                  >
                    Balance
                  </label>

                  <p className="border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm">
                    {wallet.amount ? wallet.amount : 0}PP
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block text-blueGray-600 text-xs mb-2"
                    htmlFor="lastName"
                  >
                    ID
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    disabled
                    className="border-0 placeholder-blueGray-300 text-blueGray-700 rounded focus:outline-none focus:ring w-full ease-linear transition-all duration-150 bg-blueGray-100 px-0 pt-1 font-bold text-sm"
                    defaultValue={`POG-WA${wallet.id ? wallet.id : "00"}`}
                  />
                </div>
              </div>
            </div>
            {(user.data.organisation !== null && !user.isOrganisation) ||
            user.data.organisation === null ? (
              <>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Fund Wallet
                </h6>

                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      id="amount-update"
                      onChange={handleIntegerInput}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Enter Amount"
                    />
                  </div>
                </div>
                <PaystackButton
                  {...componentProps}
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mt-5"
                >
                  {!loading ? (
                    "Fund Wallet"
                  ) : (
                    <ClipLoader
                      color="#54E0C7"
                      loading={loading}
                      css={override}
                      size={20}
                    />
                  )}
                </PaystackButton>
                <button type="button"></button>
              </>
            ) : (
              <></>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
