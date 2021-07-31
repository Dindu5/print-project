import React from "react";

// components

import CardSettings from "../components/CardSettings.js";
import CardProfile from "../components/CardProfile.js";

export default function Account() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings title="Account" isOrganisation={true} />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  );
}
