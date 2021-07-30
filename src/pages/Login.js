import React, { useState } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "../components/misc/Layout";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "../images/login-illustration.svg";
import logo from "../images/logo.svg";
import googleIconImageSrc from "../images/google-icon.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
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
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold pb-20`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const override = css`
  display: block;
  margin: 0 auto;
`;
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

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
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
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

export const Login = ({
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Sign In To Pog-Print",
  socialButtons = [
    {
      iconImageSrc: googleIconImageSrc,
      text: "Sign In With Google",
      url: "https://google.com",
    },
  ],
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = "#",
  signupUrl = "/signup",
}) => {
  const [loading, setloading] = useState(false);
  const [values, setValues] = useState({});
  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
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
  const submitForm = async (e) => {
    e.preventDefault();
    setloading(true);
    delete axios.defaults.headers.common.Authorization;
    try {
      const loginUrl = `${baseUrl}/auth/local`;
      const loginResponse = await axios.post(loginUrl, values);
      const AuthToken = `Bearer ${loginResponse.data.jwt}`;
      localStorage.setItem("AuthToken", AuthToken);
      axios.defaults.headers.common.Authorization = AuthToken;
      console.log(loginResponse);
      const welcomeMsg = `Login Successful, welcome ${loginResponse.data.user.firstName}`;
      successNotification(welcomeMsg);
      setloading(false);
      setValues({});
      history.push("/admin/dashboard");
    } catch (error) {
      console.log(error.response);
      const errorMsg = `${error.response.data.message[0].messages[0].message}`;
      errorNotification(errorMsg);
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
              <Heading>{headingText}</Heading>
              <FormContainer className="pb-10">
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
                </SocialButtonsContainer>
                <DividerTextContainer>
                  <DividerText>Or Sign in with your e-mail</DividerText>
                </DividerTextContainer> */}
                <Form onSubmit={submitForm}>
                  <Input
                    type="email"
                    name="identifier"
                    placeholder="Email"
                    onChange={handleInput}
                  />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInput}
                  />
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
                </Form>
                <p tw="mt-6 text-xs text-gray-600 text-center">
                  <a
                    href={forgotPasswordUrl}
                    tw="border-b border-gray-500 border-dotted"
                  >
                    Forgot Password ?
                  </a>
                </p>
                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Dont have an account?{" "}
                  <Link
                    to={signupUrl}
                    tw="border-b border-gray-500 border-dotted"
                  >
                    Sign Up
                  </Link>
                </p>
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

export default Login;
