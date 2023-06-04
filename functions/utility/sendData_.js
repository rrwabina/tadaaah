import logEvent from './logEvent.js'

export default function sendData_(data) { 

  
   
  chrome.cookies.get({ url: 'http://localhost:3000', name: 'connect.sid' }, function(cookie) {
    if (cookie) {
        // do something with the cookie value
        let data_for_send = JSON.stringify(data);
        // console.log(data)
        // console.log(cookie)
        fetch('http://localhost:5000/histories', {
            method: 'POST',
            credentials: 'include', // Include cookies in request
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body:data_for_send,
            })
            .then(response => response)
            .then(data => {
              eventName = 'SendSuccess'
              eventdetailed = data
            logEvent(eventName, eventdetailed);
            })
            .catch((error) => {
              eventName = 'SendFailed'
              eventdetailed = error
            logEvent(eventName, eventdetailed);
            });
      } else {
        eventName = 'SendFailed'
        eventdetailed = 'Cookies not Found'
        logEvent(eventName, eventdetailed);
      }         
        }
  )
    
  }
  