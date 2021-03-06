import React, { useContext } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import HeaderBase, { NavLinks, NavLink, PrimaryLink } from "./Header";
import { SectionHeading } from "./misc/Headings";
import { SectionDescription } from "./misc/Typography.js";
import { PrimaryButton as PrimaryButtonBase } from "./misc/Button";
import { Container, ContentWithVerticalPadding } from "./misc/Layout.js";
import { ReactComponent as CheckboxIcon } from "feather-icons/dist/icons/check-circle.svg";
import { ReactComponent as QuotesLeftIconBase } from "../images/quotes-l.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "../images/dot-pattern.svg";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header = tw(HeaderBase)`max-w-none`;
const Row = tw.div`flex flex-col lg:flex-row justify-between items-center lg:pt-16 max-w-screen-2xl mx-auto sm:px-8`;
const Column = tw.div``;
const TextColumn = tw(
  Column
)`mr-auto lg:mr-0 max-w-lg lg:max-w-xl xl:max-w-2xl`;
const Heading = tw(
  SectionHeading
)`text-left text-primary-900 leading-snug xl:text-6xl`;
const Description = tw(
  SectionDescription
)`mt-4 lg:text-base text-gray-700 max-w-lg`;
const PrimaryButton = tw(
  PrimaryButtonBase
)`mt-8 inline-block w-56 tracking-wide text-center py-5`;
const FeatureList = tw.ul`mt-12 leading-loose`;
const Feature = tw.li`flex items-center`;
const FeatureIcon = tw(CheckboxIcon)`w-5 h-5 text-primary-500`;
const FeatureText = tw.p`ml-2 font-medium text-gray-700`;
const ImageColumn = tw(Column)`ml-auto lg:mr-0 relative mt-16 lg:mt-0 lg:ml-32`;
const ImageContainer = tw.div`relative z-40 transform xl:-translate-x-24 xl:-translate-y-16`;
const Image = tw.img`max-w-full w-96 rounded-t sm:rounded relative z-20`;
const Offsetbackground = tw.div`absolute inset-0 bg-gray-300 rounded xl:-mb-8`;
const ImageDecoratorBlob = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none z-10 absolute right-0 bottom-0 transform translate-x-10 translate-y-10 h-32 w-32 opacity-25 text-gray-900 fill-current`}
`;
const Testimonial = tw.div`max-w-sm rounded-b md:rounded-none relative sm:absolute bottom-0 inset-x-0 z-20 px-8 py-6 sm:px-10 sm:py-8 bg-primary-900 text-gray-400 font-medium transform md:-translate-x-32 text-sm leading-relaxed md:-mr-16 xl:mr-0`;
const QuotesLeftIcon = tw(
  QuotesLeftIconBase
)`w-16 h-16 md:w-12 md:h-12 absolute top-0 left-0 text-gray-100 md:text-red-500 transform translate-x-1 md:-translate-x-1/2 md:-translate-y-5 opacity-10 md:opacity-100`;
const Quote = tw.blockquote``;
const CustomerName = tw.p`mt-4 font-bold`;
const CustomerCompany = tw.p`mt-1 text-sm text-gray-500`;

export const Hero = ({
  heading = "Get Your Print Job Done.",
  description = "We got you covered with all your printing needs. Select from our comprehensive list of printing options for your B&W and color copies which best describe your finished product.",
  imageSrc = "https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=949&q=80",
  imageDecoratorBlob = true,
  primaryButtonUrl = "https://google.com",
  primaryButtonText = "Print Now",
  buttonRounded = true,
  features = [
    "Home Delivery Options",
    "Available Pickup Locations",
    "Additional Finishings",
  ],
  testimonial = {
    quote:
      "Pog Print offers a wide variety of printing and finishing services, including document vetting, home delivery and more...",
    customerName: "Dindu",
    customerCompany: "Pog-Print Inc.",
  },
}) => {
  let history = useHistory();
  const { user } = useContext(UserContext);
  const buttonRoundedCss = buttonRounded && tw`rounded-full`;
  const navLinks = [
    <NavLinks key={1}>
      <NavLink to="/create-order">Print Now</NavLink>
      <NavLink to="/contact">Contact Us</NavLink>
      <NavLink to="/track-order">Track Order</NavLink>
    </NavLinks>,

    <NavLinks key={2}>
      {user.authenticated ? (
        <PrimaryLink to="/admin/dashboard" css={buttonRoundedCss}>
          Go to dashboard
        </PrimaryLink>
      ) : (
        <>
          <NavLink to="/auth/login" tw="lg:ml-12!">
            Login
          </NavLink>

          <PrimaryLink to="/auth/signup" css={buttonRoundedCss}>
            Sign Up
          </PrimaryLink>
        </>
      )}
    </NavLinks>,
  ];
  const movePage = () => {
    history.push("/create-order");
  };
  return (
    <>
      <Header links={navLinks} />
      <Container>
        <ContentWithVerticalPadding>
          <Row>
            <TextColumn>
              <Heading>{heading}</Heading>
              <Description>{description}</Description>
              <PrimaryButton
                href={primaryButtonUrl}
                onClick={movePage}
                css={buttonRoundedCss}
              >
                {primaryButtonText}
              </PrimaryButton>
              <FeatureList>
                {features.map((feature, index) => (
                  <Feature key={index}>
                    <FeatureIcon />
                    <FeatureText>{feature}</FeatureText>
                  </Feature>
                ))}
              </FeatureList>
            </TextColumn>
            <ImageColumn>
              <ImageContainer>
                <Image src={imageSrc} />
                {imageDecoratorBlob && <ImageDecoratorBlob />}
                <Testimonial>
                  <QuotesLeftIcon />
                  <Quote>{testimonial.quote}</Quote>
                  <CustomerName>{testimonial.customerName}</CustomerName>
                  <CustomerCompany>
                    {testimonial.customerCompany}
                  </CustomerCompany>
                </Testimonial>
              </ImageContainer>
              <Offsetbackground />
            </ImageColumn>
          </Row>
        </ContentWithVerticalPadding>
      </Container>
    </>
  );
};

export default Hero;
