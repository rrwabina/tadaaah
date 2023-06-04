import parseId from '../utility/parseId.js';
import { PrepareDataStorage_ } from '../utility/PrepareDataStorage_.js';
import logEvent from '../utility/logEvent.js'

 export function onCommittedListener_(pending, data) {
    if (data.frameId === 0) {
        var id = parseId(data);
        PrepareDataStorage_(pending, id);
        pending[id].start_onCommited = data.timeStamp;
        pending[id].source_onCommited_tabId = data.tabId;
        pending[id].source_onCommited_frameId = data.frameId;
        pending[id].source_onCommited_parentFrameId = data.parentFrameId;
        pending[id].transitionType = data.transitionType;
        pending[id].transitionQualifiers = data.transitionQualifiers;

        // Event log
        var eventName = 'onCommittedListener';
        var eventDetailed = data.url;
        // console.log(eventName, eventDetailed)
        logEvent(eventName, eventDetailed);

        // console.log(`onCommittedListener_ Completed:`)
        // console.log(pending[id])
    }      
}