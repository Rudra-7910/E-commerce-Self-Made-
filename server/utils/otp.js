import { Resend } from "resend";
import dotenv from "dotenv"
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOtp= async({email,subject,otp})=>{
    const html =`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            color: red;
        }
        p {
            margin-bottom: 20px;
            color: #666;
        }
        .otp {
            font-size: 36px;
            color: #7b68ee;
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>OTP Verification</h1>
        <p>Hello ${email}, your One-Time Password for account verification is:</p>
        <p class="otp">${otp}</p>
    </div>
</body>
</html>`

    const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: email,
        subject: subject,
        html: html
    });

    if (error) {
        console.error("Resend Error:", error);
        throw new Error(error.message);
    }
}
export default sendOtp;