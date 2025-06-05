const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const { sendContactEmail } = require("../utils/emailSender");

router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();

    await sendContactEmail(req.body);

    res.status(201).json({ message: "Contact submitted successfully and email sent" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to submit contact or send email" });
  }
});

module.exports = router;
