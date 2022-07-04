import { createContext, useEffect, useState } from "react";
import { API_URL } from "../../src/config";

// create context
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setInterval(getNotifications, 10000);
  }, []);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await fetch(`${API_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setNotifications(data);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
