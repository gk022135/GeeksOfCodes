const nodemailer = require('nodemailer')
const dotenv = require('dotenv')


async function EmailSendToUser(user_email, otp) {
    try {
        dotenv.config();
        console.log("user email is: ",user_email);

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, // Example: "smtp.gmail.com"
            port: 465, // Use 587 for TLS, 465 for SSL
            secure: true, // true for 465, false for 587
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        console.log("Email sent successfully to:", user_email);
        console.log("SMTP User:", process.env.MAIL_USER);
        console.log("SMTP Password Length:", process.env.MAIL_PASS ? process.env.MAIL_PASS.length : 0);
        console.log("Sending email to:", user_email);

        let info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: user_email,
            subject: "Test Email",
            text: `Hello, your otp is : ${otp}`,
        });

        console.log("Email sent successfully to:", user_email);
        console.log("Email Message ID:", info.messageId);

        if(info.messageId){
            return true;
        }
        else return false;
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports = EmailSendToUser;