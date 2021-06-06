import { Switch, Route, Redirect } from "react-router-dom";
import tw from "twin.macro";

// views

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

export const Section = tw.section`relative w-full h-full py-24 sm:py-0 min-h-screen`;

export default function Auth() {
  return (
    <>
      <main>
        <Section>
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/signup" exact component={SignUp} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          {/* <FooterSmall absolute /> */}
        </Section>
      </main>
    </>
  );
}
