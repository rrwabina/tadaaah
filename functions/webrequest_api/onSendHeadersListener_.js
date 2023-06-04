import parseId from '../utility/parseId.js';
import { PrepareDataStorage_ } from '../utility/PrepareDataStorage_.js';
import logEvent from '../utility/logEvent.js'


export function onSendHeadersListener_(pending, data) {
    var id = parseId(data);
    PrepareDataStorage_(pending, id);

    pending[id].onSendHeaders_frameId = data.frameId;
    pending[id].onSendHeaders_method = data.method;
    pending[id].onSendHeaders_requestId = data.requestId;
    pending[id].onSendHeaders_tabid = data.tabId;
    pending[id].onSendHeaders_timestamp = data.timeStamp;
    pending[id].onSendHeaders_type = data.type;
    pending[id].onSendHeaders_url = data.url;
    pending[id].onSendHeaders_initiator = data.initiator;

    // logEvent("Event: onSendHeadersListener on " + data.url + "At" + new Date().getTime())

 }
