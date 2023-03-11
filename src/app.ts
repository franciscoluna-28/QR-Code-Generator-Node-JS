import express, { Request, Response } from "express";
import bp from "body-parser";
import * as dotenv from "dotenv";
import qr from "qrcode";
const path = require('path');
import { isValidRegexForUrl } from "./helpers/regexVerification";

// initializing app dependencies
const app = express();
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

dotenv.config();

// Exposing dist
app.use(express.static(path.join(__dirname, '/public')));

// Index route
app.get("/", (req: Request, res: Response) => {
  res.render("index.ejs");
});

// Post request to generate the url
app.post("/scan", (req: Request, res: Response) => {
  const url: string = req.body.url;

  // Regex verification check
  isValidRegexForUrl(url, res, qr)
});

// setting up the port for listening requests
const port = (process.env["SERVER_PORT"])
app.listen(port, () => console.log(`Server at ${port}`));