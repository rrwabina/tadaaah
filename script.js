const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
})

app.listen(3000, () => {
  console.log('Server listening on port 3000');
})

function deleteCookie(domain, name) {
  chrome.cookies.remove({ 
    'domain': domain,
    'name': name, });}

function importCookies() {
  var nCookiesImportedThisTime = 0;
  var text = $('.value', '#pasteCookie').val();
  var error = $('.error', '#pasteCookie');
  error.hide();
  error.text('For format reference export cookies in JSON');
  error.html(error.html()+"<br> Also check&nbsp;<a href='http://developer.chrome.com/extensions/cookies.html#type-Cookie' target='_blank'>Developer Chrome Cookie</a><br>Error:");}

document.getElementById('id_ostype').onclick = () => {
  chrome.runtime.getPlatformInfo((info) => {
    let text = 'Architecture = ' + info.arch + '\n' +
               'Native Client Architecture = ' + info.nacl_arch + '\n' +
               'Operating System = ' + info.os;
    document.getElementById('id_osdisplay').value = text;});}

document.getElementById('id_button_getAll').onclick = () => {
  chrome.cookies.getAll(getDetails('getAll'), ((cookies) => {
    let text ='Number of cookies: ' + cookies.length + '\n';
    for (let cookie of cookies)
      {
        text += 'Domain: ' + cookie.domain + '\n' + 'Name: ' + cookie.name + '\n' + '\n';
      }
    document.getElementById('id_text').value = text;}));}

document.getElementById('id_button_getAdvanced').onclick = () => {
  chrome.cookies.getAll(getDetails('getAll'), ((cookies) => {
    let text ='Number of cookies: ' + cookies.length + '\n' + '\n';
    for (let cookie of cookies)
      {
        text += 
        'Domain: ' + cookie.domain + '\n' + 
        'Path: ' + cookie.path + '\n' + 
        'Name: ' + cookie.name + '\n' + 
        'Expiration Date: ' + cookie.expirationDate + '\n' +
        'Host: ' + cookie.hostOnly + '\n' +
        'HTTP: ' + cookie.httpOnly + '\n' + 
        'Site Status: ' + cookie.sameSite + '\n' + 
        'Marked as Secure: ' + cookie.sameSite + '\n' +
        'Session: ' + cookie.session + '\n' +
        'Store ID: ' + cookie.storeId + '\n' +
        'Value: ' + cookie.value + '\n' + '\n'; 
      }
    document.getElementById('id_text').value = text;}));}

const database = document.getElementById('id_button_getCassandra').onclick = () => {
  chrome.cookies.getAll(getDetails('getAll'), ((cookies) => {
    let text = 'db.cookiedb.insertMany([' + '\n';
    for (let cookie of cookies)
      {
        text +=
        '{' + '\n' + 
        '\t' + 'domain'    + ': ' + '\'' + cookie.domain          + '\'' +  ',' + '\n' +
        '\t' + 'name'      + ': ' + '\'' + cookie.name            + '\'' +  ',' + '\n' +
        '\t' + 'expiration'+ ': ' + '\'' + cookie.expirationDate  + '\'' +  ',' + '\n' +
        '\t' + 'host'      + ': '        + cookie.hostOnly        +  ',' + '\n' +
        '\t' + 'http'      + ': '        + cookie.httpOnly        +  ',' + '\n' +
        '\t' + 'site'      + ': ' + '\'' + cookie.sameSite        + '\'' +  ',' + '\n' +
        '\t' + 'session'   + ': '        + cookie.session         +  ',' + '\n' +
        '\t' + 'storeid'   + ': ' + '\'' + cookie.storeId         + '\'' + '\n' +
        '}' + ',' + '\n'
      }
    document.getElementById('id_text').value = text;}));}

function get_database() {
  const database = document.getElementById('id_button_getCassandra').onclick = () => {
    chrome.cookies.getAll(getDetails('getAll'), ((cookies) => {
      let text = 'db.cookiedb.insertMany([' + '\n';
      for (let cookie of cookies)
        {
          text +=
          '{' + '\n' + 
          '\t' + 'domain'    + ': ' + '\'' + cookie.domain          + '\'' +  ',' + '\n' +
          '\t' + 'name'      + ': ' + '\'' + cookie.name            + '\'' +  ',' + '\n' +
          '\t' + 'expiration'+ ': ' + '\'' + cookie.expirationDate  + '\'' +  ',' + '\n' +
          '\t' + 'host'      + ': '        + cookie.hostOnly        +  ',' + '\n' +
          '\t' + 'http'      + ': '        + cookie.httpOnly        +  ',' + '\n' +
          '\t' + 'site'      + ': ' + '\'' + cookie.sameSite        + '\'' +  ',' + '\n' +
          '\t' + 'session'   + ': '        + cookie.session         +  ',' + '\n' +
          '\t' + 'storeid'   + ': ' + '\'' + cookie.storeId         + '\'' + '\n' +
          '}' + ',' + '\n'
        }
      document.getElementById('id_text').value = text;}));}
}
   
document.getElementById('id_button_remove').onclick = () => {
  chrome.cookies.remove(getDetails('remove'));}

document.getElementById('id_button_deleteAll').onclick = () => {
  var allCookies = document.cookie.split(';');
  for (var i = 0; i < allCookies.length; i++)
    document.cookie = allCookies[i] + '=;expires='
    + new Date(0).toUTCString();
  document.getElementById('id_text').value = allCookies}

function getDetails(kind){
  let domain = document.getElementById('id_domain').value;
  let path   = document.getElementById('id_path').value;
  let name   = document.getElementById('id_name').value;
  let value  = document.getElementById('id_value').value;
  let details = {};

  switch(kind){
  case 'getAll':
    if (domain != ''){
      details['domain'] = domain;
    }
    if (name != ''){
      details['name'] = name;
    }
    break;
  case 'set':
    details['url'] = 'https://' + domain + path;
    details['name'] = name;
    details['value'] = value;
    break;
  case 'remove':
    details['url'] = 'https://' + domain + path;
    details['name'] = name;
    break;
  }
  return details;
}

document.getElementById('id_button_exec').onclick = () => {
  let url = document.getElementById('id_url').value;
  fetch(url, {
    method: 'GET',
    mode: 'cors'
  })
  .then(response => {
    if (response.ok) {
      return response.text();
    }
    throw new Error('Response was not ok.');
  })
  .then(data => {
    document.getElementById('id_response').value = data;
  })
 .catch(error => {
    document.getElementById('id_response').value = error;
  })
}

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((mrd) => {
  console.log(mrd.request.url)
});

function success(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  elLatitude.innerText  = "Latitude="  + latitude;
  elLongitude.innerText = "Longitude=" + longitude;
}

function blockRequest(details) {
  console.log("Blocked: ", details.url);
  return {
    cancel: true
  };
}

function isValidPattern(urlPattern) {
  var validPattern = /^(file:\/\/.+)|(https?|ftp|\*):\/\/(\*|\*\.([^\/*]+)|([^\/*]+))\//g;
  return !!urlPattern.match(validPattern);
}

function updateFilters(urls) {
  if (chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) {
    chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
  }

  var validPatterns = patterns.filter(isValidPattern);

  if (patterns.length) {
    try{
      chrome.webRequest.onBeforeRequest.addListener(blockRequest, {
        urls: validPatterns
      }, ['blocking']);
    } catch (e) {
      console.error(e);
    }
  }
}

function load(callback) {
  chrome.storage.sync.get('blocked_patterns', function(data) {
    callback(data['blocked_patterns'] || []);
  });
}

function save(newPatterns, callback) {
  patterns = newPatterns;
  chrome.storage.sync.set({
    'blocked_patterns': newPatterns
  }, function() {
    updateFilters();dom
    callback.call();
  });
}

load(function(p) {
  patterns = p;
  updateFilters();
});

function blockCookies() {
  var date = new Date();
  date.setTime(date.getTime() - 1000);
  document.cookie = "";
  document.cookie = "expires=" + date.toUTCString();
}