/* globals __dirname */

const path = require('path');
const fs = require('fs');
const attachRoutes = (app, controllers) => {
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('-routes.js'))
        .map((file) => path.join(__dirname, file))
        .forEach((modulePath) => {
            require(modulePath)(app, controllers);
        });
};

module.exports = attachRoutes;
