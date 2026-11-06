// hawkeye-backend/controllers/authController.js
// --------------------------------------------------
// Public logout controller – simply acknowledges the request.
// The frontend clears the JWT token locally, so no server‑side state is needed.

exports.logoutController = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

