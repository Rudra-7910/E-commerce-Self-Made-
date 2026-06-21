import { createTransport } from "nodemailer";

const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    family: 4,
    auth: {
        user: "test",
        pass: "test"
    }
});
console.log("transport config:", transport.options.family);
