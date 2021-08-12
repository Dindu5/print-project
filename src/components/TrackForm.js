import React from "react";
import { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SvgDotPatternIcon } from "../images/dot-pattern.svg";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import baseUrl from "../api";
import { toast } from "react-toastify";
import swal from "sweetalert";
import Moment from "react-moment";
import formatNaira from "format-to-naira";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const FormContainer = styled.div`
  ${tw`p-4 sm:p-10 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
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
const override = css`
  display: block;
  margin: 0 auto;
  > span {
    color: #000000 !important;
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
  .colored-text 
`;

const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const SubmitButton = tw.button`w-full sm:w-40 mt-6 px-3 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;
const Input = tw.input`w-full px-3 sm:px-8 py-4 text-gray-900 rounded-lg font-normal bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`;

const SvgDotPattern1 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`;

export const TrackForm = () => {
  const [values, setValues] = useState({});
  const [printOrder, setPrintOrder] = useState({});
  const [loading, setloading] = useState(false);
  // const successNotification = () =>
  //   toast.success("Print order successfully initiated", {
  //     position: "top-right",
  //     autoClose: 7000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });

  const errorNotification = () =>
    toast.error("Something went wrong could you try again", {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  // Submit function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/print-orders/${parseInt(values.id)}`
      );
      setPrintOrder(response.data);
      swal({
        text: "Print order details successfully retrieved",
        timer: 2000,
        icon: "success",
        button: false,
      });
      setloading(false);
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        swal({
          text: "Print order not found 😥",
          timer: 2000,
          icon: "info",
          button: false,
        });
      } else {
        console.log(err.request);
        errorNotification();
      }
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2>Order Details</h2>
            <form onSubmit={handleSubmit}>
              <InputContainer>
                <Label htmlFor="name-input">ID</Label>
                <Input
                  type="text"
                  name="id"
                  onChange={handleInput}
                  placeholder="Your Order ID"
                />
              </InputContainer>
              <SubmitButton type="submit" value="Submit">
                {!loading ? (
                  "Get Order"
                ) : (
                  <ClipLoader
                    color="#54E0C7"
                    loading={loading}
                    css={override}
                    size={20}
                  />
                )}
              </SubmitButton>
              {printOrder.name && (
                <>
                  <hr className="mt-10" />
                  <CheckoutContainer className="flex mb-5 mt-12">
                    <div className="flex-auto p-6">
                      <div className="flex flex-wrap">
                        <h1 className="flex-auto text-xl font-semibold total-amount">
                          {printOrder.name}
                        </h1>

                        <div className="w-full flex-none text-sm font-medium text-gray-200 mt-6 mb-4 detail-b">
                          Order Summary
                        </div>
                      </div>

                      <p className="text-sm text-gray-500">
                        ID: <strong>{printOrder.id}</strong>
                      </p>
                      <p className="text-sm text-gray-500">
                        Status:{" "}
                        <strong className="total-amount">
                          {printOrder.status}
                        </strong>
                      </p>
                      <p className="text-sm text-gray-500">
                        Number of pages : {printOrder.noOfPages}
                      </p>
                      <p className="text-sm text-gray-500">
                        Number of copies : {printOrder.noOfCopies}
                      </p>
                      <p className="text-sm text-gray-500">
                        Created :{" "}
                        <Moment interval={5000} fromNow>
                          {printOrder.created_at}
                        </Moment>
                      </p>
                      <div className="w-full flex-none text-sm font-medium text-gray-200 mt-6 mb-4 detail-b">
                        Order Price
                      </div>
                      <p className="text-sm text-gray-500">
                        {" "}
                        Total Amount :{" "}
                        <strong className="total-amount">
                          {formatNaira(printOrder.amount)}
                        </strong>
                      </p>
                    </div>
                  </CheckoutContainer>
                </>
              )}
            </form>
          </div>
          <SvgDotPattern1 />
        </FormContainer>
      </Content>
    </Container>
  );
};

export default TrackForm;
