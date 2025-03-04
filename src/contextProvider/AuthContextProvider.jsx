import React, { createContext, useContext, useState } from "react";
const AuthContext = createContext();
const useAuthContext = () => {
  return useContext(AuthContext);
};
const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div>
      <AuthContext.Provider
        value={{ isLoggedIn, setIsLoggedIn, user, setUser }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export { useAuthContext };

export default AuthContextProvider;
