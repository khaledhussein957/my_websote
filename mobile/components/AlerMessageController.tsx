import React, { createRef } from "react";
import AlertMessage, { AlertMessageHandles } from "./AlertMessage";

const alertRef = createRef<AlertMessageHandles>();

export const AlertMessageProvider = () => <AlertMessage ref={alertRef} />;

const AlertMessageController = {
  success: (message: string) => {
    alertRef.current?.show(message, "success");
  },
  error: (message: string) => {
    alertRef.current?.show(message, "error");
  },
  hide: () => {
    alertRef.current?.hide();
  },
};

export default AlertMessageController;