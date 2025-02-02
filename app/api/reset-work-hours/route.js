import { NextResponse } from "next/server"
import nodemailer from "nodemailer"



export async function POST(request) {

    const {secret} = await request.json()

    if (!secret) {
        return NextResponse.json({ message: "Secret is required" }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "terry@strictlywebdev.com",
        pass: process.env.STRICTLY_EMAIL_APP_PASS
    }
    })

    const mailOptions = {
    from: "terry@strictlywebdev.com",
    to: ["terry@dacapomusic.ca"],
    subject: "Cron Job Ran",
    html: `
    <strong>The secret from EasyCron is:</strong><br />
    <small>${secret}</small>
    `
}


    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "email sent successfully" },{ status: 200 })
    } catch (error) {
        console.log("An error occurred:", error.message)
        return NextResponse.json({ message: "there was a problem sending an email"},{ status: 500 })
    }
}
