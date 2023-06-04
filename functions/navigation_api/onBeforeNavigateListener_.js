import parseId from '../utility/parseId.js';
import { PrepareDataStorage_ } from '../utility/PrepareDataStorage_.js';
import logEvent from '../utility/logEvent.js'

 export function onBeforeNavigateListener_(pending, data) {
    if (data.frameId === 0) {
        var id = parseId(data);
        PrepareDataStorage_(pending, id);
        pending[id].source_onBefore_tabId =  data.tabId;
        pending[id].source_onBefore_frameId =  data.frameId;
        pending[id].source_onBefore_parentFrameId =  data.parentFrameId;
        pending[id].start_onBefore =   data.timeStamp;
        
        // Event log
        var eventName = 'onBeforeNavigateListerner';
        var eventDetailed = data.url;
        // console.log(eventName, eventDetailed)
        logEvent(eventName, eventDetailed);


        // console.log(`onBeforeNavigateListener_ Completed:`)
        // console.log(pending[id])
    }      
}