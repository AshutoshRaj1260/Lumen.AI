const { scrapeWebPage } = require('../services/scraper.service');
const { analyzeWebsiteContent } = require('../services/ai.service');

async function websiteAnalyzerController(req, res) {
    try{
         const { url } = req.body;

    if( !url ) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const scrapedText = await scrapeWebPage(url);

    if (!scrapedText) {
        return res.status(500).json({ error: 'Failed to scrape the website content' });
    }   
    const fullResponse = await analyzeWebsiteContent(scrapedText);

    return res.status(200).json({
        success: true,
        data: fullResponse,
    })
    }catch(err){
        console.log("Analysis error: "+ err);
        return res.status(500).json({ error: 'An error occurred during analysis' });
    }
}

module.exports = {
  websiteAnalyzerController,
};
