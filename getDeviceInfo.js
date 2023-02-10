const navigator = require('navigator');

function getDeviceInfo() {
    const deviceInfo = {};
    deviceInfo.appCodeName = navigator.appCodeName;
    deviceInfo.appName = navigator.appName;
    deviceInfo.appVersion = navigator.appVersion;
    deviceInfo.platform = navigator.platform;
    deviceInfo.userAgent = navigator.userAgent;
    deviceInfo.language = navigator.language;
    return deviceInfo;
  }
  
const deviceInfo = getDeviceInfo();
console.log(deviceInfo);
  