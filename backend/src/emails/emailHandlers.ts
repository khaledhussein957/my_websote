import { resendClient, sender } from "../config/resend.ts";
import {
  FORGOT_PASSWORD_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "../emails/emailTemplate.ts";

export const forgotPasswordEmail = async (
  name: string,
  email: string,
  resetCode: string,
  clientURL: string
) => {
  const { data, error } = await resendClient.email.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Reset your password",
    html: FORGOT_PASSWORD_EMAIL_TEMPLATE(name, resetCode, clientURL),
  });

  if (error) {
    console.error("Error in sending forgot password rmail", error);
    throw new Error("Filed to send forgot password email");
  }

  console.log("Reset code sent successfully", data);
};

export const sendPasswordResetSuccessEmail = async (email: string) => {
  const { data, error } = await resendClient.email.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Reset your password",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE(email),
  });

  if (error) {
    console.error("Error in sending forgot password rmail", error);
    throw new Error("Filed to send forgot password email");
  }

  console.log("Reset code sent successfully", data);
};
