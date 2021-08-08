import React from "react";
import tw from "twin.macro";

import { SectionHeading } from "../components/misc/Headings";
import { NavLinks, NavLink, PrimaryLink } from "../components/Header";
import { SectionDescription } from "../components/misc/Typography.js";
import TrackForm from "../components/TrackForm";
import Header from "../components/Header";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import Footer from "../components/Footer";

const Heading = tw(
  SectionHeading
)`text-left text-primary-900 text-center leading-snug xl:text-6xl mt-40`;
const Description = tw(
  SectionDescription
)`mt-4 lg:text-base text-center text-gray-700 max-w-lg mt-10 mx-auto`;

function TrackOrder() {
  // const buttonRoundedCss = tw`rounded-full`;
  const navLinks = [
    <NavLinks key={1}>
      <NavLink to="/contact">Contact Us</NavLink>
      <NavLink to="/track-order">Track Order</NavLink>
    </NavLinks>,
    <NavLinks key={2}>
      <NavLink to="/auth/login" tw="lg:ml-12!">
        Login
      </NavLink>
      <PrimaryLink to="/auth/signup" className="rounded-full">
        Sign Up
      </PrimaryLink>
    </NavLinks>,
  ];
  return (
    <>
      <AnimationRevealPage>
        <Header links={navLinks} />
        <Heading>Track your order</Heading>
        <Description>
          All we need is your order ID and we would get the details of your
          order to know if its ready or not
        </Description>
        <TrackForm />
        <Footer />
      </AnimationRevealPage>
    </>
  );
}

export default TrackOrder;
