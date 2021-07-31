import React from "react";

// components

import CardSettings from "../components/CardSettings.js";

export default function JobDetails() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <CardSettings title="Profile" isOrganisation={false} />
        </div>
      </div>
    </>
  );
}
