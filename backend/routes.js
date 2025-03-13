import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Customers from "./userModel";
import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: 'parnemanoharreddy19@gmail.com', pass: 'manoharreddy' },
});

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await Customers.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new Customers({
      username,
      email,
      password: hashedPassword,
      otp,
      otpExpires: new Date(Date.now() + 10 * 60 * 1000),
    });

    await newUser.save();

    await transporter.sendMail({
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
    });

    res.status(201).json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Error registering" });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await Customers.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    res.status(500).json({ message: "Verification failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Customers.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Verify your email first" });
    }

    const token = jwt.sign({ id: user._id }, 'mykey', {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
