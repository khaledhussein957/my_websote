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
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Reset your password",
    html: FORGOT_PASSWORD_EMAIL_TEMPLATE(name, resetCode, clientURL),
  });

  if (error) {
    console.error("Error in sending forgot password email", error);
    throw new Error("Failed to send forgot password email");
  }

  console.log("Reset code sent successfully", data);
};

export const sendPasswordResetSuccessEmail = async (email: string) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Your password has been reset",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE(email),
  });

  if (error) {
    console.error("Error in sending password reset success email", error);
    throw new Error("Failed to send password reset success email");
  }

  console.log("Reset code sent successfully", data);
};
