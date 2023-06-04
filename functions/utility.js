export function PrepareDataStorage_(id, url) {
    this.pending_[id] = this.pending_[id] || {
    "UserId": null,
    // "openedInNewTab_onCreated": false, // col1
    // "source_onCreated_frameId": null, // col2
    // "source_onCreated_tabId": null, // col3
  
    // "start_onCreated": null, // col4
      
    // "start_onBefore": null, // col5
  
    // "source_onBefore_frameId": null,  // col6
    // "source_onBefore_tabId": null, // col7
    // "source_onBefore_parentFrameId": null, // col8
    
    // "start_onCommited": null, // col9
  
    // "source_onCommited_frameId" :null, // col10
    // "source_onCommited_tabId": null, // col11
    // "source_onCommited_parentFrameId": null, // col12
  
  
    // "transitionQualifiers": null, // col13
    // "transitionType": null,  // col 14
    
    // Start 'webRequest' collectors
    // onBeforeSendHeders (requestHeaders)
    // "sec_ch_ua": null,  // col15
    // "sec_ch_ua_arch": null, // col16
    // "sec_ch_ua_bitness": null, // col17
    // "sec_ch_ua_full_version": null, // col18
    // "sec_ch_ua_full_version_list": null, // col19
  
    // "sec_ch_ua_mobile": null, // col20
    // "sec_ch_ua_model": null, // col21
    // "sec_ch_ua_platform": null, // col22
    // "sec_ch_ua_platform_version": null, // col23
    // "user_agent": null, // col24
    // "sec_fetch_site": null, // col25
    // "sec_fetch_mode": null, // col26
    // "sec_fetch_user": null, // col27
    // "referer": null, // col28
    // "accept_encoding": null, // col29
    // "accept_language": null, // col30
  
    // "onBeforeSendHeders_frameId": null, // col31
    // "onBeforeSendHeders_method": null, // col32
    // "onBeforeSendHeders_requestId": null, // col33
    // "onBeforeSendHeders_tabid": null, // col34
    // "onBeforeSendHeders_timestamp": null, // col35
    // "onBeforeSendHeders_type": null, // col36
    // "onBeforeSendHeders_url": null, // col37
    // "onBeforeSendHeders_initiator": null, // col38
    
    // onSendHeader
    // "onSendHeaders_frameId": null,// col39
    // "onSendHeaders_method": null,// col40
    // "onSendHeaders_requestId": null,// col41
    // "onSendHeaders_tabid": null,// col42
    // "onSendHeaders_timestamp": null, // still need to put // col43
    // "onSendHeaders_type": null, // col 44
    // "onSendHeaders_url": null, //col 45
    // "onSendHeaders_initiator": null, // col 46
  
    // Use for tracking
    // "onCompleted_flag": 0, // col47
    // "onCompleted_webRequest_flag": 0, // col48
    // "onErrorred_flag": 0, // col 49
    // "onErrorred_webRequest_flag": 0, // col50
  
  
    // onCompletedWebReeuest
    "onCompletedWebRequest_frameId": null, // col51
    "onCompletedWebRequest_method": null, // col52 
    "onCompletedWebRequest_requestId": null, // col53
    "onCompletedWebRequest_tabid": null, // col54
    "onCompletedWebRequest_timestamp": null, // col55
    "onCompletedWebRequest_type": null, // col56
    "onCompletedWebRequest_url": null, // col57
    "onCompletedWebRequest_initiator": null, // col58
    "onCompletedWebRequest_statuscode": null, // col59 
    "onCompletedWebRequest_statusline": null, // col60
    "onCompletedWebRequest_fromcache": null, // col61
    
    // onErrorredWebRequest
    // "onErroredWebRequest_error": null, // col62
    // "onErroredWebRequest_frameId": null, // col63
    // "onErroredWebRequest_method": null, // col64
    // "onErroredWebRequest_requestId": null, // col65
    // "onErroredWebRequest_tabid": null, // col66
    // "onErroredWebRequest_timestamp": null, // col67
    // "onErroredWebRequest_type": null, // col68
    // "onErrorededWebRequest_url": null, // col69
    // "oonErroredWebRequest_initiator": null, // col70
    // "onErroredWebRequest_fromcache": null, // col71
    
    // onCompleted Webnavigate
    "start_onCompleted": null, // col72
    "source_onCompleted_tabId": null, // col73
    "source_onCompleted_frameId" : null, // col74
    "source_onCompleted_parentFrameId": null, // col75
    "url": null, // col76
  
    // onErorred
    // "onErrored_url": null,  // col77
    // "error": null,  // col78
    // "start_onErrored": null,  // col79
    // "source_onErrored_tabId": null,  // col80
    // "source_onErrored_frameId": null,  // col81
    // "source_onErrored_parentFrameId": null  // col82
    };
}

