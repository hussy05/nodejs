// Local Imports
const userRoutes = require("./user.routes");

const express = require("express");
const router = express.Router();

class Router {
  static getRoutes = () => {
    // Routes
    router.use("/users", userRoutes);

    // default index route
    router.get("/", (_, res) => res.send("Welcome."));

    return router;
  };
}

module.exports = Router;
