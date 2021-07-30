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
const override = css`
  display: block;
  margin: 0 auto;
  > span {
    color: #000000 !important;
  }
`;
const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const TextArea = tw.textarea`h-24 sm:h-full w-full px-8 py-4 text-gray-900 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-6 resize-none`;
const SubmitButton = tw.button`w-full sm:w-40 mt-6 px-3 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;
const Input = tw.input`w-full px-8 py-4 text-gray-900 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`;

const SvgDotPattern1 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`;

export const ContactForm = () => {
  const [values, setValues] = useState({});
  const [loading, setloading] = useState(false);
  const successNotification = () =>
    toast.success("Print order successfully initiated", {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

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
      const response = await axios.post(`${baseUrl}/print-orders`);
      console.log(response);
      successNotification();
      setloading(false);
    } catch (err) {
      if (err.request) {
        console.log(err.request);
        console.log(err.response);
      } else {
        console.log(err.response);
      }
      setloading(false);
      errorNotification();
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
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="name-input">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      onChange={handleInput}
                      placeholder="Your Name"
                    />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      type="email"
                      name="email"
                      onChange={handleInput}
                      placeholder="Your Email Address"
                    />
                  </InputContainer>
                </Column>
                <Column>
                  <InputContainer tw="flex-1">
                    <Label htmlFor="message-input">Message</Label>
                    <TextArea
                      id="message-input"
                      name="message"
                      onChange={handleInput}
                      placeholder="What would you like to say?"
                    />
                  </InputContainer>
                </Column>
              </TwoColumn>

              <SubmitButton type="submit" value="Submit">
                {!loading ? (
                  "Submit Form"
                ) : (
                  <ClipLoader
                    color="#54E0C7"
                    loading={loading}
                    css={override}
                    size={20}
                  />
                )}
              </SubmitButton>
            </form>
          </div>
          <SvgDotPattern1 />
        </FormContainer>
      </Content>
    </Container>
  );
};

export default ContactForm;
