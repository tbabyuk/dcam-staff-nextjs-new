
import { NextResponse } from "next/server";
import nodemailer from "nodemailer"



export const POST = async (request) => {

    const {pay, teacher, payday} = await request.json()

    console.log("logging totalPay from 'notify' route: ==============", pay, teacher, payday)

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "terry@dacapomusic.ca",
            pass: "fbcaqouhkghjywtd"
        }
        })
    
    
        const mailOptions = {
            from: "terry@dacapomusic.ca",
            to: "terry@dacapomusic.ca",
            // bcc: "tbabyuk@gmail.com",
            subject: "Attendance Submitted!",
            html: `
            <small>(This is an automated message)</small><br><br>
            Teacher ${teacher} has submitted their pay for ${payday} payday!<br><br>
            Their total for this pay period is: $${pay}
            `
        }

        try {
            await transporter.sendMail(mailOptions);
            return NextResponse.json({message: "email sent successfully"})
        } catch (error) {
            return NextResponse.json({message: "email failed to send", details: error})
        }

}