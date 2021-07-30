import React, { useState, createContext } from "react";

const OrganisationContext = createContext();

export { OrganisationContext };

function OrganisationContextProvider(props) {
  const { children } = props;
  const [organisation, setOrganisation] = useState({});

  return (
    <OrganisationContext.Provider
      value={{
        organisation,
        setOrganisation,
      }}
    >
      {children}
    </OrganisationContext.Provider>
  );
}

export default OrganisationContextProvider;
