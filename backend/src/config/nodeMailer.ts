import nodemailer, { Transporter } from "nodemailer";
import ENV from "./ENV";

let cachedTransporter: Transporter | null = null;

export const getTransporter = async () => {
  if (cachedTransporter) return cachedTransporter;

  const smtUser = ENV.SMTP_EMAIL;
  const smtPass = ENV.SMTP_PASSWORD;

  if (!smtUser || !smtPass) {
    throw new Error("SMTP_EMAIL and SMTP_PASSWORD are required");
  }

  cachedTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: smtUser,
      pass: smtPass,
    },
  });
  return cachedTransporter;
};
