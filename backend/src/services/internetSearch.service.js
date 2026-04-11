const { tavily } = require("@tavily/core");

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});


async function searchInternet ({query}){
    const response = await tvly.search(query,{
        maxResults: 5,
    });
    return response;
}

module.exports = {
    searchInternet,
}