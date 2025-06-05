const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");
const { sendDonationEmail } = require("../utils/emailSender");

router.post("/", async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();

    await sendDonationEmail(req.body);

    res.status(201).json({ message: "Donation submitted successfully and email sent" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to submit donation or send email" });
  }
});

module.exports = router;
