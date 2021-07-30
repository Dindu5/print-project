import React, { useState, createContext } from "react";

const UserContext = createContext();

export { UserContext };

function UserContextProvider(props) {
  const { children } = props;
  const [user, setUser] = useState({
    authenticated: false,
    data: {},
  });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
