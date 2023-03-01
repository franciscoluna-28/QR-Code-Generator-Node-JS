"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var qrcode_1 = __importDefault(require("qrcode"));
var path = require('path');
// initializing express
var app = (0, express_1["default"])();
// setting ejs view engine
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
// using a middleware called body parser
app.use(body_parser_1["default"].urlencoded({ extended: false }));
app.use(body_parser_1["default"].json());
// exposing the dist folder so we can style properly
app.use(express_1["default"].static(path.join(__dirname, '../dist')));
// routing the index.ejs template
app.get("/", function (req, res) {
    res.render("index.ejs");
});
// creating a post request to convert the URL into a QR Code
app.post("/scan", function (req, res) {
    var url = req.body.url;
    // Verify if the URL is valid using regex
    var validUrlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
    if (!validUrlRegex.test(url)) {
        res.send("Invalid URL!");
        return;
    }
    // Let's check if the URL is empty
    if (typeof url !== "string" || url.trim() === "") {
        res.send("Empty data!");
        return;
    }
    // If everything is fine, generate the QR Code
    qrcode_1["default"].toDataURL(url, function (err, src) {
        if (err)
            res.send("Something went wrong");
        // returning the data if everything is fine
        res.render("scan", { src: src });
    });
});
// setting up the port for listening requests
var port = 5000;
app.listen(port, function () { return console.log("Server at ".concat(port)); });
