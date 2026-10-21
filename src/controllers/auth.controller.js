import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { StoreService } from "../services/store.service.js";

export const AuthController = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide both email and password.",
        });
      }

      const isValidEmail = email.trim().toLowerCase() === ENV.ADMIN_EMAIL.toLowerCase();
      const isValidPassword = password === ENV.ADMIN_PASSWORD;

      if (!isValidEmail || !isValidPassword) {
        return res.status(401).json({
          success: false,
          message: "Invalid admin credentials. Please try again.",
        });
      }

      const token = jwt.sign(
        {
          email: ENV.ADMIN_EMAIL,
          role: "admin",
          name: "Onushilon Super Admin",
        },
        ENV.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        success: true,
        message: "Authentication successful",
        token,
        admin: {
          email: ENV.ADMIN_EMAIL,
          name: "Onushilon Super Admin",
          role: "admin",
        },
        systemStatus: StoreService.getStatus(),
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Login server error",
        error: error.message,
      });
    }
  },

  async getMe(req, res) {
    try {
      return res.status(200).json({
        success: true,
        user: req.user,
        systemStatus: StoreService.getStatus(),
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching admin profile",
        error: error.message,
      });
    }
  },
};
