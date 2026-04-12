const userModel = require("../models/user.model");
const sendEmail = require("../services/mail.service");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  try {
    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (isUserAlreadyExists) {
      return res.status(404).json({
        message: "Username or Email already exist",
      });
    }

    const user = await userModel.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const emailVerificationToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET,
    );

    try {
      await sendEmail({
        to: user.email,
        subject: "Verify your Lumen.AI account",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; border: 1px solid #eee; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="margin: 0; color: #f97316; font-size: 28px;">Lumen AI</h1>
            </div>
            
            <p style="font-size: 16px; line-height: 1.5;">Hi <strong>${user.username}</strong>,</p>
            
            <p style="font-size: 16px; line-height: 1.5;">
              Thank you for joining <strong>Lumen.AI</strong>. We're excited to help you illuminate the web with AI-powered search.
            </p>
            
            <p style="font-size: 16px; line-height: 1.5;">
              To activate your account and start exploring, please verify your email address:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://lumen-ai-kn51.onrender.com/api/auth/verify-email?token=${emailVerificationToken}" 
                 style="background-color: #f97316; background-image: linear-gradient(135deg, #f97316 0%, #dc2626 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 4px 10px rgba(249, 115, 22, 0.3);">
                Verify Email Address
              </a>
            </div>
            
            <p style="font-size: 14px; color: #666; line-height: 1.5;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <span style="color: #f97316;">${`https://lumen-ai-kn51.onrender.com/api/auth/verify-email?token=${emailVerificationToken}`}</span>
            </p>
            
            <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #999; text-align: center;">
              If you did not create a Lumen.AI account, you can safely ignore this email.<br>
              &copy; ${new Date().getFullYear()} Lumen.AI Team
            </p>
          </div>
        `,
      });
    } catch (error) {
      console.error("Failed to send verification email:", error);
    }

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function verifyEmailController(req, res) {
  const { token } = req.query;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findOne({
    email: decoded.email,
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid token",
      success: false,
      err: "User not found",
    });
  }

  user.verified = true;

  await user.save();

  // const html = `<p>Hi ${user.username},</p>
  //   <p>Your email has been successfully verified. You can now log in to your account and start using our services.</p>
  //   <p>Best regards, <br> The Lumen Team</p>
  //   <a href="http://localhost:3000/login">Login</a>`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Reset for email clients */
    body, html {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      height: 100% !important;
      background-color: #030712 !important;
    }
    /* Ensure the wrapper also stretches */
    .wrapper {
      width: 100% !important;
      table-layout: fixed;
      background-color: #030712;
      padding-bottom: 40px;
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #030712;">
  <center class="wrapper" style="width: 100%; table-layout: fixed; background-color: #030712; padding-top: 60px; padding-bottom: 60px;">
    
    <div style="background-color: #0f172a; max-width: 600px; margin: 0 auto; padding: 40px 20px; border-radius: 16px; color: #f8fafc; text-align: center; border: 1px solid #1e293b; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.4);">
      
      <div style="margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px; background: linear-gradient(to right, #f97316, #dc2626); -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: #f97316;">
          LUMEN.AI
        </h1>
      </div>

      <div style="width: 60px; height: 60px; background-color: rgba(34, 197, 94, 0.1); color: #22c55e; border-radius: 50%; margin: 0 auto 25px auto; font-size: 30px; line-height: 60px; text-align: center;">
        ✓
      </div>

      <h2 style="color: #ffffff; margin-bottom: 15px; font-size: 22px;">Verification Successful!</h2>
      
      <p style="color: #94a3b8; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
        Hi <strong>${user.username}</strong>, your email has been verified. <br> 
        You are now ready to illuminate your search with <strong>Lumen.AI</strong>.
      </p>

      <div style="margin: 35px 0;">
        <a href="http://localhost:5173/login" 
           style="background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); background-color: #f97316; color: #ffffff; padding: 14px 35px; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px; display: inline-block;">
          Go to Dashboard
        </a>
      </div>

      <p style="color: #64748b; font-size: 14px; margin-top: 40px; border-top: 1px solid #1e293b; padding-top: 20px;">
        Best regards, <br> 
        <strong>The Lumen Team</strong>
      </p>

      <div style="margin-top: 20px; font-size: 12px; color: #475569;">
        &copy; ${new Date().getFullYear()} Lumen.AI • Kolkata, India
      </div>
    </div>
  </center>
</body>
</html>
`;
  return res.send(html);
}

async function loginController(req, res) {
  const user = await userModel
    .findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    })
    .select("+password");

  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials",
      success: false,
      err: "User not found",
    });
  }

  const isPasswordCorrect = await user.comparePassword(req.body.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Invalid credentials",
      success: false,
      err: "Wrong Password",
    });
  }

  const isVerified = user.verified;

  if (!isVerified) {
    return res.status(401).json({
      message: "Account not verified",
      success: false,
      err: "User account is not verified",
    });
  }

  const token = jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "User logged in succefully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  });
}

async function getMeController(req, res) {
  const user = req.user;

  return res.status(200).json({
    message: "User details fetched successfully",
    success: true,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
  });
}

async function logoutController(req, res){
  res.clearCookie("token");
  
  return res.status(200).json({
    message: "User logged out successfully",
    success: true,
  });
}

module.exports = {
  registerController,
  verifyEmailController,
  loginController,
  getMeController,
  logoutController
};
