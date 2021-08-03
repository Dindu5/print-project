import React from "react";
import swal from "sweetalert";

// components

import JobDetailsCard from "../components/JobDetailsCard.js";

export default function JobDetails() {
  swal("Hello world!");
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
