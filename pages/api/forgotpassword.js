import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  try {
    await connectDb();

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    let dbuser = await User.findOne({ email });
    if (!dbuser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate Reset Token
    const resetToken = crypto.randomBytes(32).toString("hex");
    // const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    // const tokenExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes from now

    
    // Password reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset?token=${resetToken}`;

    // Email Configuration
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === "true", // Convert to boolean
      auth: {
        user: process.env.EMAIL_USER, // Use env variable
        pass: process.env.EMAIL_PASS, // Use env variable
      },
    });

    // Email Content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email, // Send to the requested email
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>Hello,</p>
          <p>You requested to reset your password. Click the button below to reset it:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #4F46E5; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>This link will expire in 30 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Thanks,<br>Your App Team</p>
          <p style="font-size: 12px; color: #666;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            ${resetUrl}
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: "Password reset email sent!" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
