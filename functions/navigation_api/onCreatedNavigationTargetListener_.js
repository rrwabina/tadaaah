import parseId from '../utility/parseId.js';
import { PrepareDataStorage_ } from '../utility/PrepareDataStorage_.js';
import logEvent from '../utility/logEvent.js'

 export function onCreatedNavigationTargetListener_(pending, data) {
    if (data.frameId === 0) {
        var id = parseId(data);
        PrepareDataStorage_(pending, id);
        pending[id].openedInNewTab_onCreated = data.tabId;
        pending[id].source_onCreated_tabId = data.sourceTabId;
        pending[id].source_onCreated_frameId = data.sourceFrameId;    
        pending[id].start_onCreated  = data.timeStamp;

        var eventName = 'onCreatedNavigationTargetListener'
        var eventDetailed = data.url
        logEvent(eventName, eventDetailed)

    }      
}