const ReformatCookies = require('./reformatCookies');
const getURLCookies   = require('./getURLCookies');


getURLCookies('https://www.youtube.com/watch?v=E0mZzt8em4U', 
                (cookies) => {
                                ReformatCookies(cookies);
                            }
             );