const axios = require("axios");

async function scrapeWebPage(url) {
  try {
    const jinaUrl = `https://r.jina.ai/${url}`;

    const response = await axios.get(jinaUrl, {
      headers: {
        Authorization: `Bearer ${process.env.JINA_API_KEY}`,
        Accept: "application/json",
        "X-Retain-Images": "none",
        "X-No-Cache": "true",
      },
    });

  const cleanText = response.data?.data?.content;

    if (!cleanText || typeof cleanText !== 'string') {
      console.log(`[Jina Scraper] No readable text extracted from: ${url}`);
      return null;
    }

    return cleanText.substring(0, 15000);
    
  } catch (err) {

    const errorMessage = err.response?.data || err.message;
    console.error(`[Jina Scraper] Error scraping ${url}:`, errorMessage);

    return null;
  }
}

module.exports = {
  scrapeWebPage,
};
