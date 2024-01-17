// Package Imports
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const nodemailer = require("nodemailer");
// Local Imports
const { UserService } = require("../services");
const { log } = require("util");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

module.exports = class {
  // Update Password
  static async updatePassword(req, res) {
    const { id, password } = req.body;

    const data = await UserService.update(id, {
      password: password,
    });
    if (data.error) {
      res
        .status(500)
        .json({ success: false, message: "Request could not be processed." });
    } else {
      res.status(200).json({ success: true });
    }
  }

  // Login
  static async login(req, res) {
    const { email, password } = req.body;

    // Validate Email
    if (!email || email.trim() === "") {
      res
        .status(200)
        .json({ success: false, message: "Please provide an email." });
      return;
    }

    // Validate Password
    if (!password || password.trim() === "") {
      res
        .status(200)
        .json({ success: false, message: "Please provide an password." });
      return;
    }

    // Fetch user with the email
    const emailCheck = await UserService.getByColumn("email", email);
    if (emailCheck.error) {
      res.status(200).json({
        success: false,
        message: "Looks like you haven't registered this Email yet...",
      });
      return;
    }

    const [result] = emailCheck.result;
    // Compare the passwords
    if (result.password!=password) {
      res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
      return;
    }
    log
    // Data to send as API response
    const response = {
      id: result.id,
      email: result.email,
      clientId: result.clientId,
      name: result.name,
      role:result.role,
      userId: result.role === 'teacher' ? result.teachers[0].id : 
      result.role === 'parent' ? result.parents[0].id : 
      result.role === 'superAdmin' ? result.admins[0].id : 
      result.role === 'admin' ? result.clients[0].id : null
    };

    // Generate JWT Token
    const token = jwt.sign(response, JWT_SECRET);

    // Final Response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: response,
      token,
    });
  }
  // Login
  static async getToken(req, res) {
    const { email, password } = req.body;

    // Validate Email
    if (!email || email.trim() === "") {
      res
        .status(200)
        .json({ success: false, message: "Please provide an email." });
      return;
    }

    // Validate Password
    if (!password || password.trim() === "") {
      res
        .status(200)
        .json({ success: false, message: "Please provide an password." });
      return;
    }

    // Fetch user with the email
    const emailCheck = await UserService.getByColumn("email", email);
    if (emailCheck.error) {
      res.status(200).json({
        success: false,
        message: "Looks like you haven't registered this Email yet...",
      });
      return;
    }

    const [result] = emailCheck.result;

    // Compare the passwords
    if (result.password!=password) {
      res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
      return;
    }

    // Data to send as API response
    const response = {
      id: result.id,
      email: result.email,
      name: result.name,
      role:result.role
    };

    // Generate JWT Token
    const token = jwt.sign(response, JWT_SECRET);

    // Final Response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: response,
      token,
    });
  }

  // Get All
  static async getAll(req, res) {
    const { role } = req.query;
    if (!role) {
      res
        .status(200)
        .json({ success: false, message: "Please provide an role." });
      return;
    }
    const data = await UserService.getByRole(role);
    if (data.error) {
      res
        .status(500)
        .json({ success: false, message: "data not found." });
    } else {
      res.json({ success: true, Users: data.result });
    }
  }
  // Get By Id
  static async getById(req, res) {
    const { id } = req.params;

    if (id) {
      const data = await UserService.getById(id);
      if (data.error) {
        res.status(200).json({ success: false, message: "Not found." });
      } else {
        res.status(200).json({ success: true, User: data.result });
      }
    } else {
      res
        .status(200)
        .json({ success: false, message: "Please provide an ID." });
    }
  }

  // Create
  static async create(req, res) {
    const { email, password,role,clientId, ...rest } = req.body;
    if (!email) {
      res
        .status(200)
        .json({ success: false, message: "Please provide an email." });
      return;
    }

    const existingUserCheck = await UserService.getByEmailRole(email,role,clientId);
    if (!existingUserCheck.error) {
      res.json({ success: true, message: "Email Already Registered." });
      return;
    }

    const data = await UserService.create({
      password: password,
      role,
      email,
      clientId,
      ...rest,
    });
    if (data.error) {
      res
        .status(500)
        .json({ success: false, message: "Request could not be processed." });
    } else {
      res.status(201).json({ success: true, user: data.result });
    }
  }

  // Update
  static async update(req, res) {
    const { id,...rest } = req.body;

    if (id) {
      const data = await UserService.update(id, { ...rest });
      if (data.error) {
        res.status(500).json({
          success: false,
          message: "Request could not be processed.",
        });
      } else {
        res.status(200).json({ success: true });
      }
    } else {
      res
        .status(200)
        .json({ success: false, message: "Please provide an ID." });
    }
  }
  // Login
  static async loginByUsername(req, res) {
    const { username, password } = req.body;

    // Validate Username
    if (!username || username.trim() === "") {
      res
          .status(200)
          .json({ success: false, message: "Please provide an username." });
      return;
    }

    // Validate Password
    if (!password || password.trim() === "") {
      res
          .status(200)
          .json({ success: false, message: "Please provide an password." });
      return;
    }

    // Fetch user with the email
    const userCheck = await UserService.getByColumnForLogin("userName", username);
    if (userCheck.error) {
      res.status(200).json({
        success: false,
        message: "Looks like you haven't registered this User NAme yet...",
      });
      return;
    }

    const [result] = userCheck.result;

    if (result.password!=password) {
      res.status(200).json({
        success: false,
        message: "invalid credentials",
      });
      return;
    }

    // Data to send as API response
    const response = {
      id: result.id,
      email: result.email,
      name: result.name,
      role: result.role,
    };

    // Generate JWT Token
    const token = jwt.sign(response, JWT_SECRET);

    // Final Response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
      token,
    });
  }

  static async loginByEmail(req, res) {
    const { email } = req.body;

    // Validate Email
    if (!email || email.trim() === "") {
      res
          .status(200)
          .json({ success: false, message: "Please provide an email." });
      return;
    }



    // Fetch user with the email
    const userCheck = await ParentService.getByColumn("email", email);
    if (userCheck.error) {
      res.status(200).json({
        success: false,
        message: "Looks like you haven't registered this User yet...",
      });
      return;
    }

    const [result] = userCheck.result;

    // Data to send as API response
    const response = {
      id: result.id,
      role: result.name,
      email: result.email,
      name: result.name,
    };

    // Generate JWT Token
    const token = jwt.sign(response, JWT_SECRET);

    // Final Response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
      token,
    });
  }
  static async forgotPassword(req, res) {
    const { userName, email } = req.body;

    if (!userName && !email) {
        return res.status(400).json({ success: false, message: "Username or email is required." });
    }

    try {
        let data;
        if (email) {
            data = await UserService.getByColumn("email", email);
        } else if (userName) {
            data = await UserService.getByColumn("userName", userName);
        }

        if (data.error) {
            return res.status(200).json({ success: false, message: "User not found." });
        }

        const user = data.result[0];

        if (!user.email) {
            return res.status(200).json({ success: false, message: "Email not found for the user." });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });

        // Create a transporter object
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your_email@gmail.com', // Replace with your Gmail email
                pass: 'your_email_password', // Replace with your Gmail password
            },
        });

        // Define the email template
        const emailTemplate = `
            <p>Hello,</p>
            <p>We received a request to reset your password. Please click the link below to reset your password:</p>
            <p><a href="http://yourwebsite.com/reset-password?token=${token}">Reset Password</a></p>
            <p>If you didn't make this request, you can ignore this email, and your password will remain unchanged.</p>
            <p>Thank you,</p>
            <p>Your Company Name</p>
        `;

        // Send mail with defined transport object
        await transporter.sendMail({
            from: '"EZPick" <your_email@gmail.com>', // Replace with your email
            to: user.email,
            subject: "Forgot Password ✔",
            html: emailTemplate,
        });

        // Update user's forgetAt and forget fields
        await UserService.update(user.id, {
            forgetAt: new Date().toLocaleString(),
            forget: false,
        });

        return res.status(200).json({ success: true, message: "Email sent successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
  // forgot Password check
  static async forgotPasswordCheck(req, res) {
    const { id } = req.body;
    // Validate Username
    if (!id) {
      res
          .status(200)
          .json({ success: false, message: "Please provide an Id." });
      return;
    }
    const users = await UserService.getById(id);

    if (users.error) {
      res.status(200).json({ success: false ,message:'User not found'});
      return;
    }else {
      const user = users.result;
      const DATA = {
        forget: user?.forget,
        forgetAt: user?.forgetAt,
      };
      res
          .status(200)
          .json({ success: true, data: DATA });
    }
  }
  
  // Delete
  static async delete(req, res) {
    const { id } = req.params;

    if (id) {
      const data = await UserService.delete(id);
      if (data.error) {
        res.status(500).json({
          success: false,
          message: "Request could not be processed.",
        });
      } else {
        res.status(200).json({ success: true });
      }
    } else {
      res.status(200).json({ success: false, message: "Please provide an ID" });
    }
  }
  static async delete(req, res) {
    const { id } = req.params;

    if (id) {
      const data = await UserService.delete(id);
      if (data.error) {
        res.status(500).json({
          success: false,
          message: "Request could not be processed.",
        });
      } else {
        res.status(200).json({ success: true });
      }
    } else {
      res.status(200).json({ success: false, message: "Please provide an ID" });
    }
  }
  static async fetchOuterApi(req, res) {
    try {
        const response = await axios.get('https://api.publicapis.org/entries');

        const responseData = {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data: response.data,
        };

        // Convert responseData to JSON
        const jsonString = JSON.stringify(responseData, null, 2);
        if (response.status == 200) {
            res.status(200).json({ success: true, message: "great", response: responseData });
        } else {
            res.status(200).json({ success: false, message: "something went wrong" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
      
};
