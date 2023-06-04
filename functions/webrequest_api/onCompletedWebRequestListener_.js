import parseId from '../utility/parseId.js';
import { PrepareDataStorage_ } from '../utility/PrepareDataStorage_.js';
import  sendData_  from '../utility/sendData_.js';
import logEvent from '../utility/logEvent.js'


export function onCompletedWebRequestListener_(pending, data) {
    var id = parseId(data);
    PrepareDataStorage_(pending, id);
    pending[id].onCompleted_webRequest_flag = 1;
    pending[id].onCompletedWebRequest_frameId = data.frameId;
    pending[id].onCompletedWebRequest_method = data.method;
    pending[id].onCompletedWebRequest_requestId = data.requestId;
    pending[id].onCompletedWebRequest_tabid = data.tabId;
    pending[id].onCompletedWebRequest_timestamp = data.timeStamp;
    pending[id].onCompletedWebRequest_type = data.type;
    pending[id].onCompletedWebRequest_url = data.url;
    pending[id].onCompletedWebRequest_initiator = data.initiator;
    pending[id].onCompletedWebRequest_statuscode = data.statusCode;
    pending[id].onCompletedWebRequest_statusline = data.statusLine;
    pending[id].onCompletedWebRequest_fromcache = data.fromCache;


    // logEvent("Event: onCompletedWebRequestListener on " + data.url + "At" + new Date().getTime())

    if (pending[id].onCompleted_flag + pending[id].onCompleted_webRequest_flag == 2 ){
        // logEvent("Process completed for id : " + id + "at event on onCompletedWebRequestListener")
        // logEvent("Sending data...")
        sendData_(pending[id]);
        // logEvent('Deleting data ' + id);
        delete pending[id];
        // logEvent('Deleting data successful')
      }

 }
