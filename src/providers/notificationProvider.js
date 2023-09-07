import { createContext, useContext, useState } from "react";

const NotificationContext = createContext({});
export const NotificationProvider = (props) => {
  const [openNotification, setOpenNotification] = useState(false)
  const [notificationText, setNotificationText] = useState()

  const showCard = (text) => {
    setNotificationText(text);
    setOpenNotification(true);
  }

  const value = {
    openNotification,
    setOpenNotification,
    notificationText,
    showCard,
  };

  return (
    <NotificationContext.Provider value={value}>{props.children}</NotificationContext.Provider>
  );
};

export function useNotification() {
  return useContext(NotificationContext);
}