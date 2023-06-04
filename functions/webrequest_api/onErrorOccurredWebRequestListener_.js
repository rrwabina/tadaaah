import parseId from '../utility/parseId.js';
import { PrepareDataStorage_ } from '../utility/PrepareDataStorage_.js';
import  sendData_  from '../utility/sendData_.js';
import logEvent from '../utility/logEvent.js'

export function onErrorOccurredWebRequestListener_(pending, data) {
    var id = parseId(data);
    PrepareDataStorage_(pending, id);

    pending[id].onErrorred_webRequest_flag = 1;
    pending[id].onErroredWebRequest_error = data.error;
    pending[id].onErroredWebRequest_frameId = data.frameId;
    pending[id].onErroredWebRequest_method = data.method;
    pending[id].onErroredWebRequest_requestId = data.requestId;
    pending[id].onErroredWebRequest_tabid = data.tabId;
    pending[id].onErroredWebRequest_timestamp = data.timeStamp;
    pending[id].onErroredWebRequest_type = data.type;
    pending[id].onErrorededWebRequest_url = data.url;
    pending[id].oonErroredWebRequest_initiator = data.initiator;
    pending[id].onErroredWebRequest_fromcache = data.fromCache;

    // logEvent("Event: onErrorOccurredWebRequestListener on " + data.url + "At" + new Date().getTime());

    if (pending[id].onErrorred_flag + pending[id].onErrorred_flag_webRequest_flag == 2 ){
        // logEvent("Process completed for id : " + id + "at event on onErrorOccurredWebRequestListener");
        // logEvent("Sending data...");
        sendData_(pending_[id]);
        // logEvent('Deleting data ' + id);
        delete pending_[id];
        // logEvent('Deleting data successful')
      }
 }
