import dotenv from 'dotenv';
dotenv.config();

// emailconfig

const emailConfig = {
    host: process.env.EMAIL_HOST || '',
    port: process.env.EMAIL_PORT || '',
    secure: process.env.EMAIL_SECURE || '',
    auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || ''
    }
}

export default emailConfig
