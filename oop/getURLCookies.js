// THIS IS FINAL

const request = require('request');

function getURLCookies(url, callback) {
    request({ url, jar: true }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const cookies = response.headers['set-cookie'];
            console.log("Cookies:", cookies);
        } else {
            console.error("Error:", error);
        }
    });
}

// module.exports = getURLCookies;
getURLCookies('https://www.youtube.com/')