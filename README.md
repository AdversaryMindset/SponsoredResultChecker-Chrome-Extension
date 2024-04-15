# SponsoredResultChecker-Chrome-Extension

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

Sponsored Result Checker: Transparency in Every Search
Elevate Your Browsing with Enhanced Transparency and Security

Introducing Sponsored Result Checker, the essential Chrome extension for discerning internet users who value clarity and safety in their search results. Sponsored Result Checker diligently highlights in orange sponsored content in your Google search results, ensuring you can instantly distinguish between organic results and advertisements. If the actual ad URL is different than the displayed URL, the ad is highlighted in red.

Core Features:

Visible Indicators: Sponsored results are immediately recognizable, framed in an orange border. This visual cue helps you navigate search results with full awareness of content sponsorship.
Link Verification: Sponsored Result Checker goes a step further with a unique safety feature — any sponsored link that does not direct you to its displayed destination is outlined in red, alerting you to potential discrepancies and protecting against misleading redirects.
Enhanced Search Integrity: With Sponsored Result Checker, you can trust the transparency of your search results, reducing the risk of malware and deceptive practices commonly hidden within sponsored ads.

Open Source Commitment:

Sponsored Result Checker is committed to transparency, not just in search results, but in our development process. Visit our GitHub repository to learn more: https://github.com/AdversaryMindset/SponsoredResultChecker-Chrome-Extension

Install Sponsored Result Checker Today:

Transform your browsing experience with Sponsored Result Checker. Install today and navigate your searches with confidence, assured by the integrity and transparency Sponsored Result Checker brings to your online world.
