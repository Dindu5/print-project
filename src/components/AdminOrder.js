import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "styled-components/macro";
import styled from "styled-components";

const override = css`
  display: block;
  margin: 0 auto;
  > span {
    color: #000000 !important;
  }
`;

const CheckboxContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .inputGroup {
    display: block;
    margin: 10px 0;
    position: relative;
    border-radius: 6px;
    margin-top: 1.2rem;

    label {
      background-color: #ffffff;
      padding: 0.8rem 0.9rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
        0 1px 2px 0 rgba(0, 0, 0, 0.06);
      width: 100%;
      display: block;
      text-align: left;
      color: #a1afc0;
      cursor: pointer;
      position: relative;
      font-size: 14px;
      z-index: 2;
      transition: color 200ms ease-in;
      position: relative;
      overflow: hidden;
      border-radius: 6px;

      span {
        right: 2.6rem;
        position: absolute;
      }

      &:before {
        width: 10px;
        height: 10px;
        border-radius: 30px;
        content: "";
        background-color: #1a202c;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale3d(1, 1, 1);
        transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
        z-index: -1;
      }

      &:after {
        width: 1.5rem;
        height: 1.5rem;
        content: "";
        border: 2px solid #d1d7dc;
        background-color: #fff;
        background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");
        background-repeat: no-repeat;
        background-position: 0rem 0.15rem;
        border-radius: 4px;
        z-index: 2;
        position: absolute;
        right: 0.9rem;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        transition: all 200ms ease-in;
      }
    }

    input:checked ~ label {
      color: #fff;

      &:before {
        transform: translate(-50%, -100%) scale3d(65, 65, 1);
        opacity: 1;
      }

      &:after {
        background-color: #54e0c7;
        border-color: #54e0c7;
      }
    }

    input {
      width: 32px;
      height: 32px;
      order: 1;
      z-index: 2;
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      visibility: hidden;
    }
  }
`;
// components

export default function CardSettings() {
  const { user } = useContext(UserContext);
  const [deliveryOption, setdeliveryOption] = useState("home");
  const [loading, setloading] = useState(false);

  const [values, setValues] = useState({
    proofReading: false,
    basicFormatting: true,
    documentVetting: false,
  });

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleIntegerInput = (e) => {
    setValues({ ...values, [e.target.name]: parseInt(e.target.value) });
  };

  const handleCheckbox = (e) => {
    setValues({ ...values, [e.target.name]: e.target.checked });
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
              Create Order
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={submitForm}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Personal Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={user.data.firstName}
                    placeholder="Document Name"
                    name="firstName"
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleInput}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={user.data.lastName}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={user.data.email}
                    name="email"
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4"></div>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300" />
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Document Details
            </h6>

            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleInput}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Document Name"
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    File
                  </label>
                  <input
                    type="file"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Document Name"
                    name="firstName"
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="noOfCopies"
                  >
                    No of copies
                  </label>
                  <input
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Number of copies"
                    name="noOfCopies"
                    onChange={handleIntegerInput}
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Additional Options
            </h6>
            <div className="flex flex-wrap">
              <CheckboxContainer>
                <div className="w-full lg:w-4/12 px-4">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="basicFormatting"
                  >
                    Basic Formatting
                  </label>
                  <div className="relative w-full mb-3 inputGroup">
                    <input
                      id="option"
                      name="basicFormatting"
                      checked
                      onChange={handleCheckbox}
                      type="checkbox"
                    />
                    <label htmlFor="option">₦ 00.00</label>
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="documentVetting"
                  >
                    Document Vetting
                  </label>
                  <div className="relative w-full mb-3 inputGroup">
                    <input
                      id="option1"
                      name="documentVetting"
                      onChange={handleCheckbox}
                      type="checkbox"
                    />
                    <label htmlFor="option1">₦ 50.00</label>
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="proofReading"
                  >
                    Proof Reading
                  </label>
                  <div className="relative w-full mb-3 inputGroup">
                    <input
                      id="option2"
                      name="proofReading"
                      onChange={handleCheckbox}
                      type="checkbox"
                    />
                    <label htmlFor="option2">₦ 70.00</label>
                  </div>
                </div>
              </CheckboxContainer>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Delivery Options
            </h6>
            <CheckboxContainer>
              <div className="w-full lg:w-6/12 px-4">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="basicFormatting"
                >
                  Document Delivery
                </label>
                <div className="relative w-full mb-3 inputGroup">
                  <input
                    id="radio1"
                    name="delivery"
                    onChange={() => setdeliveryOption("home")}
                    checked={deliveryOption === "home"}
                    type="radio"
                  />
                  <label htmlFor="radio1">₦ 100.00</label>
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="documentVetting"
                >
                  Pickup Option
                </label>
                <div className="relative w-full mb-3 inputGroup">
                  <input
                    id="radio2"
                    onChange={() => setdeliveryOption("pickup")}
                    name="delivery"
                    checked={deliveryOption === "pickup"}
                    type="radio"
                  />
                  <label htmlFor="radio2">₦ 0.00</label>
                </div>
              </div>
            </CheckboxContainer>
            <div className="flex flex-wrap">
              {deliveryOption === "home" ? (
                <>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="state"
                      >
                        State
                      </label>
                      <select
                        name="state"
                        onChange={handleInput}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        <option>Select state</option>
                        <option>Home Delivery</option>
                        <option>Pick up location</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="lga"
                      >
                        LGA
                      </label>
                      <select
                        name="lga"
                        onChange={handleInput}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Select LGA"
                      >
                        <option>Select LGA</option>
                        <option>Home Delivery</option>
                        <option>Pick up location</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="deliveryAddress"
                      >
                        Address
                      </label>
                      <textarea
                        type="text"
                        name="deliveryAddress"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleInput}
                        placeholder="What address will this be delivered to"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="pickUpLocation"
                      >
                        Pickup Location
                      </label>
                      <select
                        name="pickUpLocation"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleInput}
                        placeholder="Select the nearest pickup location"
                      >
                        <option>Home Delivery</option>
                        <option>Pick up location</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mt-5"
              type="button"
            >
              {!loading ? (
                "Create Order"
              ) : (
                <ClipLoader
                  color="#54E0C7"
                  loading={loading}
                  css={override}
                  size={20}
                />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
