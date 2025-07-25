import nodemailer from "nodemailer";
import Mailgen from "mailgen"; 

export const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "NeetLabs",
      link: `${process.env.FRONTEND_URL}`,
    },
  });

  const emailHtml = mailGenerator.generate(options.mailGenContent);
  const emailText = mailGenerator.generatePlaintext(options.mailGenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const mailOptions = {
    from: '"NeetLabs" <no-reply@leetlab.com>',
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailHtml,
  };

  await transporter.sendMail(mailOptions);
};

export const emailVerificationMailGenContent = (username, verificationUrl) => {
    return {
      body: {
        name: username,
        intro: "Welcome to NeetLabs! Let's verify your email to get started.",
        action: {
          instructions: "Click the button below to verify your email address.",
          button: {
            color: "#22BC66",
            text: "Verify Email",
            link: verificationUrl,
          },
        },
        outro: "If you did not sign up, you can safely ignore this email.",
      },
    };
  };
  

export const forgotPasswordMailGenContent = (username, resetUrl) => {
  return {
    body: {
      name: username,
      intro: "We received a request to reset your password.",
      action: {
        instructions:
          "Click the button below to reset your password. This link will expire in 15 minutes.",
        button: {
          color: "#FF5C5C",
          text: "Reset Password",
          link: resetUrl,
        },
      },
      outro:
        "If you didn't request a password reset, you can safely ignore this email.",
    },
  };
};
