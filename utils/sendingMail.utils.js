// email sending using nodemailer
import nodemailer from "nodemailer";

const buildTransporter = () =>
  nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

/**
 * Sends a verification or password-reset email.
 * @param {string} email - recipient
 * @param {string} token - the (un-hashed) token
 * @param {string} [url] - optional explicit URL (used for reset)
 * @param {"verify"|"reset"} [type="verify"]
 */
const sendVerificationEmail = async (email, token, url, type = "verify") => {
  try {
    const transporter = buildTransporter();

    const isReset = type === "reset";
    const link =
      url ||
      `${process.env.BASE_URL}/api/v1/users/${
        isReset ? "reset-password" : "verify"
      }/${token}`;

    const mailOptions = {
      from: `"Authentication App" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: isReset
        ? "Reset your password"
        : "Please verify your email address",
      text: isReset
        ? `
        You requested a password reset. Click the link below to set a new password.
        ${link}
        This reset link will expire in 15 mins.
        If you did not request this, please ignore this email.
      `
        : `
        Thank you for registering! Please verify your email address to complete your registration.
        ${link}
        This verification link will expire in 10 mins.
        If you did not create an account, please ignore this email.
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(
      `${isReset ? "Reset" : "Verification"} email sent: %s`,
      info.messageId
    );
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export { sendVerificationEmail };
