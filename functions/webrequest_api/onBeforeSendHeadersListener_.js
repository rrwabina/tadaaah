import parseId from '../utility/parseId.js';
import { PrepareDataStorage_ } from '../utility/PrepareDataStorage_.js';
import logEvent from '../utility/logEvent.js'

export function onBeforeSendHeadersListener_(pending, data) {
    var id = parseId(data);
    PrepareDataStorage_(pending, id);

    const headerMap = new Map([    ['User-Agent', 'user_agent'],
    ['sec-ch-ua', 'sec_ch_ua'],
    ['sec-ch-ua-arch', 'sec_ch_ua_arch'],
    ['sec-ch-ua-bitness', 'sec_ch_ua_bitness'],
    ['sec-ch-ua-full-version', 'sec_ch_ua_full_version'],
    ['sec-ch-ua-full-version-list', 'sec_ch_ua_full_version_list'],
    ['sec-ch-ua-mobile', 'sec_ch_ua_mobile'],
    ['sec-ch-ua-model', 'sec_ch_ua_model'],
    ['sec-ch-ua-platform', 'sec_ch_ua_platform'],
    ['sec-ch-ua-platform-version', 'sec_ch_ua_platform_version'],
    ['Sec-Fetch-Site', 'sec_fetch_site'],
    ['Sec-Fetch-Mode', 'sec_fetch_mode'],
    ['Sec-Fetch-User', 'sec_fetch_user'],
    ['Referer', 'referer'],
    ['Accept-Encoding', 'acception_encoding'],
    ['Accept-Language', 'accept_language']
  ]);
  
  for (var i = 0; i < data.requestHeaders.length; ++i ){
      const headerName = data.requestHeaders[i].name;
      if (headerMap.has(headerName)) {
        const propName = headerMap.get(headerName);
        pending[id][propName] = data.requestHeaders[i].value;
      }
  }

  pending[id].onBeforeSendHeders_frameId = data.frameId;
  pending[id].onBeforeSendHeders_method = data.method;
  pending[id].onBeforeSendHeders_requestId = data.requestId;
  pending[id].onBeforeSendHeders_tabid = data.tabId;
  pending[id].onBeforeSendHeders_timestamp = data.timeStamp;
  pending[id].onBeforeSendHeders_type = data.type;
  pending[id].onBeforeSendHeders_url = data.url;
  pending[id].onBeforeSendHeders_initiator = data.initiator;

  // logEvent("Event: onBeforeSendHeadersListener on " + data.url + "At" + new Date().getTime())


 }
