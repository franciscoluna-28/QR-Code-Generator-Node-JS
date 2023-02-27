import express, { Request, Response } from "express";
import bp from "body-parser";
import qr from "qrcode";

// initializing express
const app = express();

// setting ejs view engine
app.set("view engine", "ejs");

// using a middleware called body parser
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

// routing the index.ejs template
app.get("/", (req: Request, res: Response) => {
  res.render("index.ejs");
});

// creating a post request to convert the URL into a QR Code
app.post("/scan", (req: Request, res: Response) => {
  const url: string = req.body.url;

  // Verify if the URL is valid using regex
  const validUrlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;

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
  qr.toDataURL(url, (err, src) => {
    if (err) res.send("Something went wrong");

    // returning the data if everything is fine
    res.render("scan", { src });
  });
});

// setting up the port for listening requests
const port = 5000;
app.listen(port, () => console.log(`Server at ${port}`));