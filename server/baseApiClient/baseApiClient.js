const request = require('request');

exports.get = function (url) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            if (response.statusCode !== 200 || error !== null) {
                reject(new Error(`Status code was ${response.statusCode}`));
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
};

