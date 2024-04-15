# SponsoredResultChecker-Chrome-Extension

Copyright 2024 Adversary Mindset LLC
https://www.adversarymindset.com

Sponsored Result Checker: Transparency in Every Search<br>
Elevate Your Browsing with Enhanced Transparency and Security

Introducing Sponsored Result Checker, the essential Chrome extension for discerning internet users who value clarity and safety in their search results. Sponsored Result Checker diligently highlights in orange sponsored content in your Google search results, ensuring you can instantly distinguish between organic results and advertisements. If the actual ad URL is different than the displayed URL, the ad is highlighted in red.

This Google Chrome extension performs the following tasks: <br>
    * Identifies if the current page contains Google Search results<br>
    * Gathers all sponsored ad result information (Link URL and Displayed URL)<br>
    * Performs an HTTP HEAD request with no redirect follow on the sponsored ad link (Not an HTTP GET)<br>
    * Obtains the HTTP Location header from the sponsored link. Does not follow the redirect<br>
    * Compares the Location header URL to the Google Search result displayed URL for the Ad<br>
    * Places a red rectangle around Ads that show a different link on the search results vs what the first redirect shows<br>
    * Places an oragne rectangle around all other Ads, so it's easy to see which results are actually ads<br>

 This extension does not follow redirects past the first redirect from Google to the sponsor. HEAD requests are only to the original<br>
    Google AD URL. This is to ensure your browser does not interact with the sponsor's website, just Google's.<br>
<br> Caution: This tool is just to help you identify sponsored results that MAY lead to sites that are misleading. Use this tool as a helper,<br>
    and always stay vigilant.

Core Features:

Visible Indicators: Sponsored results are immediately recognizable, framed in an orange border. This visual cue helps you navigate search results with full awareness of content sponsorship.
<br>Link Verification: Sponsored Result Checker goes a step further with a unique safety feature — any sponsored link that does not direct you to its displayed destination is outlined in red, alerting you to potential discrepancies and protecting against misleading redirects.
<br>Enhanced Search Integrity: With Sponsored Result Checker, you can trust the transparency of your search results, reducing the risk of malware and deceptive practices commonly hidden within sponsored ads.

Open Source Commitment:

Sponsored Result Checker is committed to transparency, not just in search results, but in our development process. Visit our GitHub repository to learn more: https://github.com/AdversaryMindset/SponsoredResultChecker-Chrome-Extension

Install Sponsored Result Checker Today:

Transform your browsing experience with Sponsored Result Checker. Install today and navigate your searches with confidence, assured by the integrity and transparency Sponsored Result Checker brings to your online world.
