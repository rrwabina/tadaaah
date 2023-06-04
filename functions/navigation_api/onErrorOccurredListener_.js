import parseId from '../utility/parseId.js';
import { PrepareDataStorage_ } from '../utility/PrepareDataStorage_.js';
import  sendData_  from '../utility/sendData_.js';
import logEvent from '../utility/logEvent.js'

export function onErrorOccurredListener_(pending, data) {
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



    var eventName = 'onErrorOccurredListener';
    var eventDetailed = data.url;
    logEvent(eventName, eventDetailed);

    if (pending[id].onErrorred_flag + pending[id].onErrorred_flag_webRequest_flag == 2 ){

      var eventName = 'Process_completed_onErrorOccurredListener';
      var eventDetailed = data.url;
      logEvent(eventName, eventDetailed);


      var eventName = 'Sending_onErrorOccurredListener';
      var eventDetailed = data.url;
      logEvent(eventName, eventDetailed);
      sendData_(pending_[id]);

      var eventName = 'Deleting_onErrorOccurredListener';
      var eventDetailed = data.url;
      logEvent(eventName, eventDetailed);
      
      delete pending_[id];
      var eventName = 'Deleting_onErrorOccurredListener_success';
      var eventDetailed = data.url;
      logEvent(eventName, eventDetailed);
    }
 }
