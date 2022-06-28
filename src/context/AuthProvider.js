import { createContext, useState, useEffect } from "react";

// create context

const AuthContext = createContext();

// AuthProvider component

export const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getUser();
  }, []);

  // get user from api
  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await fetch("http://localhost:4000/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      setProfile(data);
    }
  };

  return (
    <AuthContext.Provider value={{ profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
