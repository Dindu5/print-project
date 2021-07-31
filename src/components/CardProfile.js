import React from "react";

// components

export default function CardProfile() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  src="data:image/jpeg;base64,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"
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    22
                  </span>
                  <span className="text-sm text-blueGray-400">Friends</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    10
                  </span>
                  <span className="text-sm text-blueGray-400">Photos</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    89
                  </span>
                  <span className="text-sm text-blueGray-400">Comments</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
              Jenna Stones
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
              Los Angeles, California
            </div>
            <div className="mb-2 text-blueGray-600 mt-10">
              <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
              Solution Manager - Creative Tim Officer
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
              University of Computer Science
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            {/* <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                  An artist of considerable range, Jenna the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
                  and records all of his own music, giving it a warm, intimate
                  feel with a solid groove structure. An artist of considerable
                  range.
                </p>
                <a
                  href="#pablo"
                  className="font-normal text-lightBlue-500"
                  onClick={(e) => e.preventDefault()}
                >
                  Show more
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
