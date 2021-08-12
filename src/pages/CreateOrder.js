import React from "react";
import tw from "twin.macro";

import { SectionHeading } from "../components/misc/Headings";
import { NavLinks, NavLink, PrimaryLink } from "../components/Header";
import { SectionDescription } from "../components/misc/Typography.js";
import OrderForm from "../components/OrderForm";
import Header from "../components/Header";
import AnimationRevealPage from "../helpers/AnimationRevealPage";

const Heading = tw(
  SectionHeading
)`text-left text-primary-900 text-center leading-snug xl:text-6xl mt-40`;
const Description = tw(
  SectionDescription
)`mt-4 lg:text-base text-center text-gray-700 max-w-lg mt-10 mx-auto`;

function CreateOrder() {
  // const buttonRoundedCss = tw`rounded-full`;
  const navLinks = [
    <NavLinks key={1}>
      <NavLink to="/create-order">Print-Now</NavLink>
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
        <Heading>Create You Print Order</Heading>
        <Description>
          Fill out the form below and create your print order. You can add
          choose to include our optional services and each comes with its own
          additional price
        </Description>
        <OrderForm />
      </AnimationRevealPage>
    </>
  );
}

export default CreateOrder;
