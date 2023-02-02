const request = require("request");

function getBrowserCookies() {
  request("http://localhost:9222/json/cookies", (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const cookies = JSON.parse(body);
      cookies.forEach((cookie) => {
        console.log("domain: ", cookie.domain);
        console.log("name: ", cookie.name);
        console.log("expiration: ", cookie.expirationDate);
        console.log("host: ", cookie.hostOnly);
        console.log("http: ", cookie.httpOnly);
        console.log("site: ", cookie.sameSite);
        console.log("session: ", cookie.session);
        console.log("storeId: ", cookie.storeId);
      });
    }
  });
}

getBrowserCookies();
