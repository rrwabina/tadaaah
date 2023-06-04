export function displayCookieMessage(cookieName) {
    const message = document.getElementById('message');
    if (cookieName) {
      message.textContent = 'Cookie exists: ' + cookieName;
    } else {
      message.textContent = 'Cookie does not exist';
    }
  }