import React from "react";

// components

import JobDetailsCard from "../components/JobDetailsCard.js";

export default function JobDetails() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <JobDetailsCard />
        </div>
      </div>
    </>
  );
}
