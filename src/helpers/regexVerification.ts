import { Response } from "express";

// Regex authentication
export function isValidRegexForUrl(url: string, res: Response, qr: any): void {
  const validUrlRegex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;

  if (!validUrlRegex.test(url)) {
    res.send("Invalid URL!");
    return;
  }

  if (typeof url !== "string" || url.trim() === "") {
    res.send("Empty data!");
    return;
  }

  qr.toDataURL(url, (err: Error, src: string) => {
    if (err) res.send("Something went wrong");
    res.render("scan", { src });
  });
}

