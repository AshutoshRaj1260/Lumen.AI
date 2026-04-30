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

    const cleanText = response.data.data.content;

    return cleanText.substring(0, 15000);
  } catch (err) {
    console.log("Scraping error: " + err);

    return null;
  }
}

module.exports = {
  scrapeWebPage,
};
