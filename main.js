// Setting Environment
require("dotenv").config();

// Setting up Alias Module Imports
process.env.NODE_PATH = __dirname;
require("module").Module._initPaths();

// Package Imports

// Local Imports
const Server = require("./server");

// Starting Server
Server.init();
