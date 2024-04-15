//////////////////////////////////////////////////////////////////////
// Sponsored Result Checker v1.0
//
//    / \   __   _   ____ ___  _ ___  __ _ _ __ _  __
//   / _ \ / _` \ \ / / _ \ '__/ __|/ _` | '__| | | |  
//  / ___ \ (_| |\ V /  __/ |  \__ \ (_| | |  | |_| |  
// /_/  _\_\__,_| \_/ \___|_|  |___/\__,_|_|   \__, |  
// |  \/  (_)_ __   __| |___  ___| |_          |___/   
// | |\/| | | '_ \ / _` / __|/ _ \ __|                 
// | |  | | | | | | (_| \__ \  __/ |_                  
// |_|  |_|_|_| |_|\__,_|___/\___|\__|                 
//
// Copyright 2024 Adversary Mindset LLC
// https://www.adversarymindset.com
//
// This Google Chrome extension performs the following tasks: 
//    * Identifies if the current page contains Google Search results
//    * Gathers all sponsored ad result information (Link URL and Displayed URL)
//    * Performs an HTTP HEAD request with no redirect follow on the sponsored ad link (Not an HTTP GET)
//    * Obtains the HTTP Location header from the sponsored link. Does not follow the redirect
//    * Compares the Location header URL to the Google Search result displayed URL for the Ad
//    * Places a red rectangle around Ads that show a different link on the search results vs what the first redirect shows
//    * Places an oragne rectangle around all other Ads, so it's easy to see which results are actually ads
//
// This extension does not follow redirects past the first redirect from Google to the sponsor. HEAD requests are only to the original
//    Google AD URL. This is to ensure your browser does not interact with the sponsor's website, just Google's.
// Caution: This tool is just to help you identify sponsored results that MAY lead to sites that are misleading. Use this tool as a helper,
//    and always stay vigilant.
//////////////////////////////////////////////////////////////////////

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});


let locationHeadersMap = {};

chrome.webRequest.onHeadersReceived.addListener(
  details => {
    const locationHeader = details.responseHeaders.find(header => header.name.toLowerCase() === 'location');
    if (locationHeader) {
      // Store the location header value. You can use details.requestId or details.url as a key, depending on your needs.
      locationHeadersMap[details.url] = locationHeader.value;
    }
  },
  { urls: ["<all_urls>"] }, 
  ["responseHeaders"]
);

function waitForHeader(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    // Function to check for the header
    const checkHeader = () => {
      if (locationHeadersMap[url]) {
        resolve(locationHeadersMap[url]); // Header found, resolve the Promise
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('Timeout waiting for header')); // Timeout, reject the Promise
      } else {
        setTimeout(checkHeader, 100); // Check again after a short delay
      }
    };

    checkHeader();
  });
}

function decodeHtmlEntities(encodedStr) {
  const textMappings = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    // Add more HTML entity mappings as needed
  };

  return encodedStr.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, (match) => textMappings[match]);
}

async function fetchAndWaitForHeader(activeUrl,displayedUrls) {
  try {
    const fetchPromise = fetch(activeUrl, { method: 'HEAD', redirect: 'manual' }); // Start the fetch request
    const headerPromise = waitForHeader(activeUrl); // Start waiting for the header

    const response = await fetchPromise; // Wait for the fetch to complete
    const locationHeader = await headerPromise; // Wait for the header

    let isValid = displayedUrls.some((url, index) => {
      let urlStr = url.trim().toLowerCase();
      console.log("Actual URL: " + url);
      if (locationHeadersMap[activeUrl].toLowerCase().includes(urlStr)) {
        return true; // Return true if a match is found, .some() stops here
      }
    return false; // Return false to continue checking the next URL
    });

return isValid; // Return the isValid value directly, no need for a new Promise here

} catch (error) {
  console.error('Error:', error);
  throw error; // Rethrow the error to handle it outside this function if necessary
}
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkAdUrl") {
    let displayedUrl = request.displayedUrl;
	  displayedUrl = displayedUrl.replace(/https:\/\//g, '');
	  displayedUrl = displayedUrl.replace(/\//g, '');
    // Split 'displayedUrl' by '|' or ',' into an array of URLs
	  let displayedUrls = displayedUrl.split(/[|,]/);
    let actualUrl = decodeHtmlEntities(request.actualUrl);
    console.log("Starting New AD: " + actualUrl);

  fetchAndWaitForHeader(actualUrl,displayedUrls)
  .then(isValid => {
    console.log('Is valid:', isValid);
    sendResponse({ isValid: isValid });
	  })
  .catch(error => {
    console.error('Error:', error);
  });

  return true;  // Indicates async response.
  }
});