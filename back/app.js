"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv = __importStar(require("dotenv"));
var qrcode_1 = __importDefault(require("qrcode"));
var path = require('path');
var regexVerification_1 = require("./utilities/regexVerification");
// initializing app dependencies
var app = (0, express_1["default"])();
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(body_parser_1["default"].urlencoded({ extended: false }));
app.use(body_parser_1["default"].json());
dotenv.config();
// Exposing dist
app.use(express_1["default"].static(path.join(__dirname, '../dist')));
// Index route
app.get("/", function (req, res) {
    res.render("index.ejs");
});
// Post request to generate the url
app.post("/scan", function (req, res) {
    var url = req.body.url;
    // Regex verification check
    (0, regexVerification_1.isValidRegexForUrl)(url, res, qrcode_1["default"]);
});
// setting up the port for listening requests
var port = (process.env["SERVER_PORT"]);
app.listen(port, function () { return console.log("Server at ".concat(port)); });
