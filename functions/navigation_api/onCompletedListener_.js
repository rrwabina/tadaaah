import parseId from '../utility/parseId.js';
import { PrepareDataStorage_ } from '../utility/PrepareDataStorage_.js';
import  sendData_  from '../utility/sendData_.js';
import logEvent from '../utility/logEvent.js'

 export function onCompletedListener_(pending, data) {
    if (data.frameId === 0) {
        var id = parseId(data);
        PrepareDataStorage_(pending, id);
        pending[id].onCompleted_flag = 1; 
        pending[id].start_onCompleted = data.timeStamp;
        pending[id].source_onCompleted_tabId = data.tabId;
        pending[id].source_onCompleted_frameId = data.frameId;
        pending[id].source_onCompleted_parentFrameId = data.parentFrameId;
        pending[id].url = data.url;
        
        var eventName = 'onCompletedListener'
        var eventDetailed = data.url
        logEvent(eventName, eventDetailed)

        
        if (pending[id].onCompleted_flag + pending[id].onCompleted_webRequest_flag == 2 ){

            var eventName = 'Process_onCompletedListener'
            var eventDetailed = data.url
            logEvent(eventName, eventDetailed)

            var eventName = 'Sending_onCompletedListener';
            var eventDetailed = data.url;
            logEvent(eventName, eventDetailed);

            sendData_(pending[id]);

            var eventName = 'Deleting_onCompletedListener'
            var eventDetailed = data.url
            logEvent(eventName, eventDetailed)

    
            delete pending[id];
            var eventName = 'Deleting_onCompletedListener_success'
            var eventDetailed = data.url
            logEvent(eventName, eventDetailed)

          }


    }      
}