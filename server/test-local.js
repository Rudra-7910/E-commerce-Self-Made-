import sendOtp from "./utils/otp.js";

async function testNodeMailer() {
    try {
        console.log("Sending OTP via Nodemailer locally...");
        await sendOtp({
            email: "grudraksh826@gmail.com",
            subject: "Local Nodemailer Test",
            otp: 111222
        });
        console.log("Email sent successfully via Nodemailer!");
    } catch (err) {
        console.error("Failed to send:", err.message);
    }
}

testNodeMailer();
