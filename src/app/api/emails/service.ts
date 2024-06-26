import nodemailer from 'nodemailer';

async function sendMail(email: string, subject: string, message: string) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: message,
  });
}

export { sendMail };
