import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import emailConfig from '../config/email';
dotenv.config();

interface UserData{
    name: string;
    email: string;
}

const sendEmail = (userData: UserData): void => {

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });

     transporter.sendMail({
        from: 'process.env.EMAIL_USER',
        to: userData.email,
        subject: 'Welcome',
        text: `Welcome ${userData.name}!, Thank you for registering with us.`,
    })
}

export default sendEmail
