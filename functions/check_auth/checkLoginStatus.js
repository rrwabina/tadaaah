// Function to check the login status
// import { displayCookieMessage }  from './displayCookieMessage.js';


export function checkLoginStatus() {
  chrome.cookies.get({ url: 'http://localhost:3000', name: 'connect.sid'  }, function(cookie) {
    if (cookie) {
      // Cookie exists, the user is logged in
      chrome.runtime.sendMessage({ loggedIn: true, cookieName: cookie });
    } else {
      // Cookie does not exist, the user is not logged in
      chrome.runtime.sendMessage({ loggedIn: false });
    }
  });
}