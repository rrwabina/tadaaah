export default function parseId(data) {
    return data.tabId + '-' + (data.frameId ? data.frameId : 0);
  }
  