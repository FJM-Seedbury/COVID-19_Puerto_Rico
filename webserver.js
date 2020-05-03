/**
 * webserver.js
 * @author Francisco J. Medina <francisco@seedburysquare.com>
 * @copyright Seedbury Square, LLC. All Rights Reserved.
 * 
 * @version 2020-04-04 Initial Version 
 */

const settings = require('./settings');

const http = require('http');
const fs = require("fs");
const url = require("url");
const path = require("path");
const server = http.createServer((request, response) => {
    const uri = url.parse(request.url).pathname;
    let filename = path.join(process.cwd(), settings.pathPrefix + uri);
    fs.exists(filename, (exists) => {
        if (!exists) {
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.write("404 Not Found\n");
            response.end();
            return;
        }
        if (fs.statSync(filename).isDirectory()) { filename += 'index.html'; }
        fs.readFile(filename, "binary", (err, file) => {
            if (err) {
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.write(err + "\n");
                response.end();
                return;
            }
            const headers = {};
            const contentType = settings.contentTypesByExtension[path.extname(filename).toLowerCase()];
            if (contentType) headers["Content-Type"] = contentType;
            response.writeHead(200, headers);
            response.write(file, "binary");
            response.end();
        });
    });
});
server.listen(settings.webServerPort, () => {
    console.log((new Date()) + " Server is listening on port " + settings.webServerPort);
});