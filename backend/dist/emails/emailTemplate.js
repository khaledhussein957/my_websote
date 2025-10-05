export const FORGOT_PASSWORD_EMAIL_TEMPLATE = (name, resetCode, clientURL) => `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; padding: 32px;">
    <table width="100%" style="max-width: 480px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
      <tr>
        <td style="padding: 32px;">
          <h1 style="color: #2563eb; font-size: 2rem; margin-bottom: 8px;">Password Reset Request</h1>
          <p style="font-size: 1rem; color: #222; margin-bottom: 16px;">Hello <strong>${name}</strong>,</p>
          <p style="font-size: 1rem; color: #222; margin-bottom: 16px;">
            We received a request to reset your password. Please use the code below to proceed:
          </p>
          <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; text-align: center; margin-bottom: 24px;">
            <span style="font-size: 2.2em; font-weight: 700; letter-spacing: 2px; color: #2563eb;">${resetCode}</span>
          </div>
          <p style="font-size: 1rem; color: #222; margin-bottom: 16px;">
            Enter this code on the password reset page:
          </p>
          <a href="${clientURL}/reset-password" style="display: inline-block; background: #2563eb; color: #fff; text-decoration: none; font-weight: 600; padding: 12px 28px; border-radius: 6px; font-size: 1rem; margin-bottom: 24px;">
            Reset Password
          </a>
          <p style="font-size: 0.95rem; color: #555; margin-top: 24px;">
            If you did not request a password reset, please ignore this email or contact our support team.
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0 16px 0;">
          <p style="font-size: 0.9rem; color: #888;">Best regards,<br/>The ${clientURL.replace(/^https?:\/\//, '').split('/')[0]} Team</p>
        </td>
      </tr>
    </table>
  </div>
`;
export const PASSWORD_RESET_SUCCESS_TEMPLATE = (email) => `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; padding: 32px;">
    <table width="100%" style="max-width: 480px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
      <tr>
        <td style="padding: 32px;">
          <h1 style="color: #16a34a; font-size: 2rem; margin-bottom: 8px;">Password Reset Successful</h1>
          <p style="font-size: 1rem; color: #222; margin-bottom: 16px;">
            Hello <strong>${email}</strong>,
          </p>
          <p style="font-size: 1rem; color: #222; margin-bottom: 24px;">
            Your password has been changed successfully. If you did not perform this action, please contact our support team immediately.
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0 16px 0;">
          <p style="font-size: 0.9rem; color: #888;">Best regards,<br/>The Team</p>
        </td>
      </tr>
    </table>
  </div>
`;
//# sourceMappingURL=emailTemplate.js.map