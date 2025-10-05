import ENV from "../config/ENV";
import { getTransporter } from "../config/nodeMailer";
import {
  FORGOT_PASSWORD_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "../emails/emailTemplate";

export const forgotPasswordEmail = async (
  name: string,
  email: string,
  resetCode: string,
  clientURL: string
) => {
  const transporter = await getTransporter();
  const info = await transporter.sendMail({
    from: `${ENV.SMTP_EMAIL} <${ENV.SMTP_EMAIL}>`,
    to: email,
    subject: "Reset your password",
    html: FORGOT_PASSWORD_EMAIL_TEMPLATE(name, resetCode, clientURL),
  });

  if (!info.messageId) {
    console.error("Error in sending forgot password email", info);
    throw new Error("Failed to send forgot password email");
  }

  console.log("Reset code sent successfully", info.messageId);
};

export const sendPasswordResetSuccessEmail = async (email: string) => {
  const transporter = await getTransporter();
  const info = await transporter.sendMail({
    from: `${ENV.SMTP_EMAIL} <${ENV.SMTP_EMAIL}>`,
    to: email,
    subject: "Your password has been reset",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE(email),
  });

  if (!info.messageId) {
    console.error("Error in sending password reset success email", info);
    throw new Error("Failed to send password reset success email");
  }

  console.log("Password reset success email sent successfully", info.messageId);
};
