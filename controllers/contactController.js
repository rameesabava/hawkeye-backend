const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendContactEmail = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate fields
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // Send email
    await transporter.sendMail({
      from: `"Hawkeye Vision Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Enquiry from ${name}`,

      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}

Message:
${message}
      `,

      html: `
        <h2>New Contact Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Your enquiry has been sent successfully!",
    });

  } catch (error) {
    console.error("Contact email error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send your enquiry. Please try again.",
    });
  }
};