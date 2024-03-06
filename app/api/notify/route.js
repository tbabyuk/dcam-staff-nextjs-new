import nodemailer from "nodemailer"
import { NextResponse } from "next/server";
import { connectToStaffDB } from "@/db/database";
import { Meta } from "@/models/models";


export const POST = async (request) => {

    const {pay, teacher, payday} = await request.json()


    const updateNotifyEmailSentStatus = async () => {
        try {
            await Meta.updateOne({"teacher": teacher}, {$set: {"notifyEmailSent": true}})
            return NextResponse.json({message: "notify email status updated"}, {status: 200})
        } catch (error) {
            return NextResponse.json({message: "email failed to send"}, {status: 500})
        }
    }

    try {
        await connectToStaffDB()
        const {notifyEmailSent} = await Meta.findOne({"teacher": teacher},  {_id: 0, notifyEmailSent: 1})


        if (!notifyEmailSent) {
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
                    Teacher ${teacher[0].toUpperCase() + teacher.slice("1")} has submitted their pay for ${payday} payday!<br><br>
                    Their total for this pay period is: $${pay}
                    `
                }
        
                try {
                    await transporter.sendMail(mailOptions);
                    updateNotifyEmailSentStatus()
                    return NextResponse.json({message: "notify email sent successfully"}, {status: 200})
                } catch (error) {
                    return NextResponse.json({message: "email failed to send"}, {status: 500})
                }
        } else {
            return NextResponse.json({message: "Notification email for this pay period has already been sent"}, {status: 200});
        }
    } catch (error) {
        return NextResponse.json({message: "Failed to check notify status"}, {status: 500})
    }
}