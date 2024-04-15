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

const processedAds = new Set();

function checkAdsAndDecodeUrls() {
  if (!document.body) {
    console.warn("Document body is not available. The page might be navigating away.");
    return;
  }

  function getAdHash(adElement) {
    const adContent = adElement.textContent || adElement.innerHTML;
    return adContent.split('').reduce((acc, char) => {
      const hash = ((acc << 5) - acc) + char.charCodeAt(0);
      return hash & hash; // Convert to 32bit integer
    }, 0);
  }

  // Select all ads based on the DIV with data-text-ad attribute
  let ads = document.querySelectorAll('div[data-text-ad="1"]');

  ads.forEach(ad => {
    const adHash = getAdHash(ad);

    if (!processedAds.has(adHash)) {

    // Find the A tag within the selected DIV
    let adLinkElement = ad.querySelector('a'); // Assuming there's only one A tag within each ad DIV

    if (adLinkElement) {
      let displayedUrl = adLinkElement.getAttribute('data-pcu');
      let actualUrl = adLinkElement.getAttribute('data-rw');

      // Send message to background script to check the URLs
      chrome.runtime.sendMessage(
        { action: "checkAdUrl", actualUrl: actualUrl, displayedUrl: displayedUrl },
        response => {
          if (!response.isValid) {
            // Highlight the ad DIV in RED if the URLs don't match
            ad.style.border = "5px solid red";
          }
          if (response.isValid) {
            // Highlight the ad DIV in ORANGE if the URLs match
            ad.style.border = "5px solid orange";
          }
        }
      );
    
    }
    processedAds.add(adHash);
  }
  });
}

// Run when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', checkAdsAndDecodeUrls);

// Re-run when DOM changes detect new ads
const observer = new MutationObserver(checkAdsAndDecodeUrls);
observer.observe(document.body, { childList: true, subtree: true });