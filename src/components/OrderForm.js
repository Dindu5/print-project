import React from "react";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SvgDotPatternIcon } from "../images/dot-pattern.svg";
import docx4js from "docx4js";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,
  textarea {
    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
  input#file-upload-button {
    background-color: #fefefe !important;
    border-radius: 9px !important;
  }
  textarea {
    max-height: 15rem;
  }
`;

const CheckoutContainer = styled.div`
  background-color: #1a202c;
  padding: 1.5rem;
  border-radius: 16px;

  .total-amount {
    color: #54e0c7;
  }
  .detail-b {
    color: #e5e5e5;
    opacity: 0.3;
    border-bottom: 1px solid #f5f5f5;
  }
`;
const CheckboxContainer = styled.ul`
  .inputGroup {
    background-color: #f5f5f5;
    display: block;
    margin: 10px 0;
    position: relative;
    border-radius: 6px;
    margin-top: 1.2rem;

    label {
      padding: 19px 30px;
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
        right: 5rem;
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
        width: 32px;
        height: 32px;
        content: "";
        border: 2px solid #d1d7dc;
        background-color: #fff;
        background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");
        background-repeat: no-repeat;
        background-position: 2px 3px;
        border-radius: 10px;
        z-index: 2;
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        transition: all 200ms ease-in;
      }
    }

    input:checked ~ label {
      color: #fff;

      &:before {
        transform: translate(-50%, -50%) scale3d(56, 56, 1);
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

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const TextArea = tw.textarea`h-24 sm:h-full w-full px-8 py-4 text-gray-900 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-6 resize-none`;
const Select = tw.select`w-full px-8 py-4 text-gray-900 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`;
const SubmitButton = tw.button`w-full sm:w-40 mt-6 px-3 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;
const Input = tw.input`w-full px-8 py-4 text-gray-900 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`;

const SvgDotPattern1 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`;

export const OrderForm = () => {
  const [deliveryOption, setdeliveryOption] = useState("home");
  const [values, setValues] = useState({});
  const [file, setFile] = useState();
  const [pages, setPages] = useState(0);
  const [totalAmount, setTotalAmount] = useState(1);
  const form = useRef(null);

  const calculateAmount = () => {
    let amount = 0;
    amount = pages * 15;
    if (values.documentVetting) {
      amount = amount + 50;
    }
    if (values.proofReading) {
      amount = amount + 70;
    }
    setTotalAmount(amount);
  };
  useEffect(() => {
    let amount = 0;
    amount = pages * 15;
    if (values.documentVetting) {
      amount = amount + 50;
    }
    if (values.proofReading) {
      amount = amount + 70;
    }
    if (deliveryOption === "home") {
      amount = amount + 100;
    }
    setTotalAmount(amount);
  }, [values, deliveryOption, pages]);
  const handleCheckbox = (e) => {
    setValues({ ...values, [e.target.name]: e.target.checked });
  };
  const handleSubmit = (e) => {
    calculateAmount();
    e.preventDefault();
    setTimeout(() => {
      console.log(totalAmount);
    }, 1000);
    const data = new FormData(form.current);
    data.append("file", file);
  };
  const uploadFile = (e) => {
    setFile(e.target.files[0]);
    getPages(e.target.files[0]);
  };
  const getPages = (files) => {
    docx4js
      .load(files)
      .then((docx) => {
        const propsAppRaw = docx.parts["docProps/app.xml"]._data.getContent();
        const propsApp = new TextDecoder("utf-8").decode(propsAppRaw);
        const match = propsApp.match(/<Pages>(\d+)<\/Pages>/);
        if (match && match[1]) {
          const count = Number(match[1]);
          setPages(count);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <Container>
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2>Initialize Order</h2>
            <form ref={form} onSubmit={handleSubmit}>
              <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="name-input">Personal Details</Label>
                    <Input
                      type="text"
                      name="first-name"
                      onChange={handleInput}
                      placeholder="First Name"
                    />
                    <Input
                      type="text"
                      name="last-name"
                      onChange={handleInput}
                      placeholder="Last Name"
                    />
                    <Input
                      type="email"
                      name="email"
                      onChange={handleInput}
                      placeholder="Email Address"
                    />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="email-input">Document Details</Label>
                    <Input
                      type="text"
                      name="document-name"
                      onChange={handleInput}
                      placeholder="Document Name"
                    />
                    <Input
                      type="file"
                      name="file"
                      placeholder="Upload File"
                      onChange={uploadFile}
                    />
                    <Input
                      type="number"
                      name="no-of-input"
                      onChange={handleInput}
                      placeholder="Number of copies"
                      required
                    />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="email-input">Additional Options</Label>
                    <CheckboxContainer>
                      <div className="inputGroup">
                        <input
                          id="option"
                          name="basicFormatting"
                          checked
                          onChange={handleCheckbox}
                          type="checkbox"
                        />
                        <label htmlFor="option">
                          Basic formatting <span>₦ 00.00</span>
                        </label>
                      </div>

                      <div className="inputGroup">
                        <input
                          id="option1"
                          name="documentVetting"
                          onChange={handleCheckbox}
                          type="checkbox"
                        />
                        <label htmlFor="option1">
                          Document vetting <span>₦ 50.00</span>
                        </label>
                      </div>

                      <div className="inputGroup">
                        <input
                          id="option2"
                          name="proofReading"
                          onChange={handleCheckbox}
                          type="checkbox"
                        />
                        <label htmlFor="option2">
                          Proof-reading <span>₦ 70.00</span>
                        </label>
                      </div>
                    </CheckboxContainer>
                  </InputContainer>
                </Column>
                <Column>
                  <InputContainer tw="flex-1">
                    <Label htmlFor="name-input">Delivery Details</Label>
                    <CheckboxContainer>
                      <div className="inputGroup">
                        <input
                          id="radio1"
                          name="delivery"
                          onChange={() => setdeliveryOption("home")}
                          checked={deliveryOption === "home"}
                          type="radio"
                        />
                        <label htmlFor="radio1">
                          Home Delivery option <span>₦ 100.00</span>
                        </label>
                      </div>
                      <div className="inputGroup">
                        <input
                          id="radio2"
                          onChange={() => setdeliveryOption("pickup")}
                          name="delivery"
                          checked={deliveryOption === "pickup"}
                          type="radio"
                        />
                        <label htmlFor="radio2">
                          Pickup Location <span>₦ 00.00</span>
                        </label>
                      </div>
                    </CheckboxContainer>
                    {deliveryOption !== "home" ? (
                      <InputContainer>
                        <Label htmlFor="document-pickup">
                          Document Pickup options
                        </Label>
                        <Select name="pickup-location" onChange={handleInput}>
                          <option>
                            --- Select the nearest pickup location ---
                          </option>
                          <option>Home Delivery</option>
                          <option>Pick up location</option>
                        </Select>
                      </InputContainer>
                    ) : (
                      <InputContainer>
                        <Label htmlFor="document-delivery">
                          Document Delivery options
                        </Label>
                        <Select name="state" onChange={handleInput}>
                          <option>--- select state ---</option>
                          <option>Home Delivery</option>
                          <option>Pick up location</option>
                        </Select>
                        <Select name="lga" onChange={handleInput}>
                          <option>--- select LGA ---</option>
                          <option>Home Delivery</option>
                          <option>Pick up location</option>
                        </Select>
                        <TextArea
                          id="message-input"
                          name="address"
                          onChange={handleInput}
                          placeholder="Your Address"
                        />
                      </InputContainer>
                    )}
                  </InputContainer>
                  <CheckoutContainer className="flex mb-5">
                    <div className="flex-auto p-6">
                      <div className="flex flex-wrap">
                        <h1 className="flex-auto text-xl font-semibold">
                          Total
                        </h1>
                        <div className="text-xl font-semibold text-gray-500 total-amount">
                          ${totalAmount}.00
                        </div>
                        <div className="w-full flex-none text-sm font-medium text-gray-200 mt-6 mb-4 detail-b">
                          Order Summary
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">Pages : {pages}</p>
                      {values.documentVetting && (
                        <p className="text-sm text-gray-500">
                          Document Vetting : N 50
                        </p>
                      )}
                      {values.proofReading && (
                        <p className="text-sm text-gray-500">
                          Proof Reading : N 70
                        </p>
                      )}
                    </div>
                  </CheckoutContainer>
                </Column>
              </TwoColumn>

              <SubmitButton type="submit" value="Submit">
                Create Order
              </SubmitButton>
            </form>
          </div>
          <SvgDotPattern1 />
        </FormContainer>
      </Content>
    </Container>
  );
};

export default OrderForm;
