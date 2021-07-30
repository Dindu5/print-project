import React, { useState } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "../components/misc/Layout";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "../images/signup-illustration.svg";
import logo from "../images/logo.svg";
// import googleIconImageSrc from "../images/google-icon.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
// import { css } from "@emotion/react";
import ClockLoader from "react-spinners/ClockLoader";
import axios from "axios";
import baseUrl from "../api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Container = tw(
  ContainerBase
)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

// const SocialButtonsContainer = tw.div`flex flex-col items-center`;
// const SocialButton = styled.a`
//   ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
//   .iconContainer {
//     ${tw`bg-white p-2 rounded-full`}
//   }
//   .icon {
//     ${tw`w-4`}
//   }
//   .text {
//     ${tw`ml-4`}
//   }
// `;

// const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
// const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const override = css`
  display: block;
  margin: 0 auto;
`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const Select = tw.select`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:bg-gray-500`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const SubmitButtonTwo = styled.button`
  ${tw`mt-5 tracking-wide font-semibold border-primary-200 text-primary-100 w-full py-4 rounded-lg hover:bg-gray-300 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:bg-gray-500`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

export const SignUp = ({
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Create an account with Pog Print",
  // socialButtons = [
  //   {
  //     iconImageSrc: googleIconImageSrc,
  //     text: "Sign Up With Google",
  //     url: "https://google.com",
  //   },
  // ],
  SubmitButtonIcon = SignUpIcon,
  // tosUrl = "#",
  // privacyPolicyUrl = "#",
  signInUrl = "/login",
}) => {
  const [step, setStep] = useState(0);
  const [isOrganisation, setisOrganisation] = useState(false);
  const [loading, setloading] = useState(false);
  const [values, setValues] = useState({});
  const [organisationValues, setOrganisationValues] = useState({});
  const history = useHistory();
  const change = (event) => {
    if (event.target.value === "single") {
      setisOrganisation(false);
    } else {
      setisOrganisation(true);
    }
  };
  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleOrgInput = (e) => {
    setOrganisationValues({
      ...organisationValues,
      [e.target.name]: e.target.value,
    });
  };

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
  const infoNotification = (msg) =>
    toast.warn(msg, {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  // Submit fuunction
  const submitForm = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const signupUrl = `${baseUrl}/auth/local/register`;
      const organisationUrl = `${baseUrl}/organisations`;
      const walletUrl = `${baseUrl}/wallets`;

      const walletValues = {
        amount: parseInt(0),
        walletId: `${Math.random(1000)}`,
      };
      const walletResponse = await axios.post(walletUrl, walletValues);
      console.log(walletResponse);

      let organizationResponse;
      if (isOrganisation) {
        const orgValues = {
          ...organisationValues,
          organisationId: `${Math.random(200)}`,
          wallet: walletResponse.data.id,
        };
        organizationResponse = await axios.post(organisationUrl, orgValues);
      }
      console.log(organizationResponse);
      const modifiedValues = {
        ...values,
        username: `${values.firstName} ${values.lastName}`,
        isOrganisation,
        organisation: isOrganisation ? organizationResponse.data : {},
        wallet: isOrganisation ? {} : walletResponse.data.id,
      };
      const userResponse = await axios.post(signupUrl, modifiedValues);
      console.log(userResponse);
      successNotification("Your account has been created successfully");
      setloading(false);
      setValues({});
      history.push("/login");
    } catch (error) {
      console.log(error.response);
      errorNotification(
        "Something went wrong while creating your account, please try again"
      );
      setTimeout(() => {
        infoNotification(error.response.data.message[0].messages[0].message);
      }, 1000);

      setloading(false);
    }
  };
  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <Link to={logoLinkUrl}>
              <LogoImage src={logo} />
            </Link>
            <MainContent>
              <Heading className="text-center">{headingText}</Heading>
              <FormContainer>
                {/* <SocialButtonsContainer>
                {socialButtons.map((socialButton, index) => (
                  <SocialButton key={index} href={socialButton.url}>
                    <span className="iconContainer">
                      <img
                        src={socialButton.iconImageSrc}
                        className="icon"
                        alt=""
                      />
                    </span>
                    <span className="text">{socialButton.text}</span>
                  </SocialButton>
                ))}
              </SocialButtonsContainer> */}
                {/* <DividerTextContainer>
                <DividerText>Or Sign up with your e-mail</DividerText>
              </DividerTextContainer> */}
                <Form onSubmit={submitForm}>
                  {step === 0 ? (
                    <div>
                      <p>Basic Details</p>
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        required
                        onChange={handleInput}
                      />
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        required
                        onChange={handleInput}
                      />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        onChange={handleInput}
                      />
                      <SubmitButton
                        onClick={() => {
                          setStep(1);
                        }}
                      >
                        <span className="text">Next</span>
                      </SubmitButton>
                    </div>
                  ) : (
                    <div>
                      <p>Choose account type</p>
                      <Select name="account-type" required onChange={change}>
                        <option disabled>Choose Account type</option>
                        <option value="single">Single User</option>
                        <option value="organization">Organization</option>
                      </Select>
                      {isOrganisation && (
                        <>
                          <Input
                            type="text"
                            name="name"
                            onChange={handleOrgInput}
                            placeholder="Organization Name"
                            required
                          />
                          <Input
                            name="email"
                            type="email"
                            onChange={handleOrgInput}
                            placeholder="Email"
                            required
                            autoComplete="off"
                          />
                        </>
                      )}
                      <Input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleInput}
                        required
                        autoComplete="off"
                      />
                      <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                      />
                      <SubmitButtonTwo
                        className="my-3"
                        onClick={() => setStep(0)}
                        disabled={loading}
                      >
                        <span className="text">Back</span>
                      </SubmitButtonTwo>
                      <SubmitButton type="submit" disabled={loading}>
                        {!loading && <SubmitButtonIcon className="icon" />}

                        <ClockLoader
                          color="#ffffff"
                          loading={loading}
                          css={override}
                          size={25}
                        />
                        <span className="text">
                          {loading ? "Creating Account..." : "SignUp"}
                        </span>
                      </SubmitButton>
                    </div>
                  )}

                  {/* <p tw="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by {" "}
                    <a
                      href={tosUrl}
                      tw="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>{" "}
                    and its{" "}
                    <a
                      href={privacyPolicyUrl}
                      tw="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p> */}

                  <p tw="mt-8 text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <Link
                      to={signInUrl}
                      tw="border-b border-gray-500 border-dotted"
                    >
                      Sign In
                    </Link>
                  </p>
                </Form>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};

export default SignUp;
