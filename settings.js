/**
 * settings.js
 * @author Francisco J. Medina <francisco@seedburysquare.com>
 * @copyright Seedbury Square, LLC. All Rights Reserved.
 * 
 * @version 2020-04-04 Initial Version 
 */

const commonSettings = {
    pathPrefix: '',
    contentTypesByExtension: {
        '.html': "text/html",
        '.css': "text/css",
        '.js': "text/javascript",
        '.ttf': "application/octet-stream",
        '.woff': "application/octet-stream",
        '.svg': "image/svg+xml",
        '.jpg': "image/jpg",
        '.jpeg': "image/jpeg",
        '.png': "image/png",
        '.gif': "image/gif"
    },
    maxReceivedFrameSize: 131072,
    maxReceivedMessageSize: 10 * 1024 * 1024,
    autoAcceptConnections: false,
    webServerPort: 1237
};

module.exports = commonSettings;