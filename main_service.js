import parseId from './functions/utility/parseId.js';
import { onBeforeSendHeadersListener_ }  from './functions/webrequest_api/onBeforeSendHeadersListener_.js';
import { onSendHeadersListener_ }  from './functions/webrequest_api/onSendHeadersListener_.js';
import { onCompletedWebRequestListener_ }  from './functions/webrequest_api/onCompletedWebRequestListener_.js';
import { onErrorOccurredWebRequestListener_ }  from './functions/webrequest_api/onErrorOccurredWebRequestListener_.js';

import {PrepareDataStorage_} from './functions/utility/PrepareDataStorage_.js'
import { onCreatedNavigationTargetListener_ }  from './functions/navigation_api/onCreatedNavigationTargetListener_.js';
import { onBeforeNavigateListener_ }  from './functions/navigation_api/onBeforeNavigateListener_.js';
import { onCommittedListener_ }  from './functions/navigation_api/onCommittedListener_.js';
import { onCompletedListener_ }  from './functions/navigation_api/onCompletedListener_.js';
import { onErrorOccurredListener_ }  from './functions/navigation_api/onErrorOccurredListener_.js';

import { checkLoginStatus }  from './functions/check_auth/checkLoginStatus.js';



// chrome.action.onClicked.addListener(function(tab) {
//     chrome.tabs.create({ url: 'http://localhost:3000/login' }, function(tab) {
//     //   chrome.windows.getCurrent(function (currentWindow) {
//     //     chrome.windows.remove(currentWindow.id); // close the popup when the tab is created
//     //   });
//     });
//   });
chrome.action.onClicked.addListener(function(tab) {
    checkLoginStatus();
  });


function HistoryCollector() {
    
    /**
     * A list of requests that errored off, implemented as a hash of each
     * request's tab ID, frame ID, and URL in order to ensure uniqueness.
     *
     * @type {Object<string, Array<NavigationCollector.Request>>}
     * @private
     */
    this.pending_ = {};
    this.completed_ = {};
    this.errored_ = {};


    /**
     * Bind handlers to the event from 'webNavigation' API
     */
    chrome.webNavigation.onCreatedNavigationTarget.addListener(
        this.onCreatedNavigationTargetListener_.bind(this, this.pending_));
    chrome.webNavigation.onBeforeNavigate.addListener(
        this.onBeforeNavigateListener_.bind(this, this.pending_));
    chrome.webNavigation.onCommitted.addListener(
        this.onCommittedListener_.bind(this, this.pending_));
    chrome.webNavigation.onCompleted.addListener(
        this.onCompletedListener_.bind(this, this.pending_));
    chrome.webNavigation.onErrorOccurred.addListener(
        this.onErrorOccurredListener_.bind(this, this.pending_));

    /**
     * Bind handlers to the event from 'webRequest' API
     */

    const filters = {
        types: ["main_frame"],
        urls: ["<all_urls>"]
    };
  
    const extraInfoSpec = ["requestHeaders","extraHeaders"];
    const extraInfoSpec2 = ["responseHeaders","extraHeaders"];

    chrome.webRequest.onBeforeSendHeaders.addListener(
        onBeforeSendHeadersListener_.bind(this, this.pending_), 
        filters, extraInfoSpec);

    chrome.webRequest.onSendHeaders.addListener(
        onSendHeadersListener_.bind(this, this.pending_), 
        filters, extraInfoSpec);

    chrome.webRequest.onCompleted.addListener(
        onCompletedWebRequestListener_.bind(this, this.pending_),
        filters, extraInfoSpec2); 
    chrome.webRequest.onErrorOccurred.addListener(
        onErrorOccurredWebRequestListener_.bind(this,this.pending_,), 
        filters, ["extraHeaders"]);

    
    // TODO : What is this use fors
    // this.loadDataStorage_();

}

HistoryCollector.prototype = {
    parseId_: parseId,
    PrepareDataStorage_: PrepareDataStorage_,
    
    // WebNavigation
    onCreatedNavigationTargetListener_:onCreatedNavigationTargetListener_,
    onBeforeNavigateListener_:onBeforeNavigateListener_,
    onCommittedListener_:onCommittedListener_,
    onCompletedListener_: onCompletedListener_,
    onErrorOccurredListener_:onErrorOccurredListener_,

    // WebRequest
    onBeforeSendHeadersListener_: onBeforeSendHeadersListener_,
    onSendHeadersListener_: onSendHeadersListener_,
    onCompletedWebRequestListener_: onCompletedWebRequestListener_,
    onErrorOccurredWebRequestListener_: onErrorOccurredWebRequestListener_

  };

var Hist  = new HistoryCollector();