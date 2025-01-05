import http from "http";
import path from "path"
import fs from "fs";

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    let filePath;

    if (req.url === "/") {
        filePath = "./static/index.html";
    } else {
        switch (req.url) {
            case "/about":
                filePath = "./static/about.html";
                break;
            case "/contact-me":
                filePath = "./static/contact-me.html";
                break;
            default:
                filePath = "./static/404.html";
        }
    }

    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            res.statusCode = 404;
            console.log("ENOENT")
            return;
        }

        res.setHeader("Content-Type", "text/html");
        res.write(data);
        res.end();
        return;
    });

});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});