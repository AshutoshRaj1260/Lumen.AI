const { ChatMistralAI } = require("@langchain/mistralai");
const {
  HumanMessage,
  SystemMessage,
  AIMessage,
  tool,
  createAgent,
} = require("langchain");
const { searchInternet } = require("./internetSearch.service");
const zod = require("zod");

const llm = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const searchInternetTool = tool(searchInternet, {
  name: "searchInternet",
  description:
    "Use this tool to search the internet for up-to-date information. Input should be a concise query.",
  schema: zod.object({
    query: zod
      .string()
      .min(1)
      .max(100)
      .describe(
        "A concise search query to find relevant information on the internet.",
      ),
  }),
});

const { getIO } = require("../sockets/server.socket");

const agent = createAgent({
  model: llm,
  tools: [searchInternetTool],
});

async function generateResponse(messages, socketId) {
  const eventStream = await agent.streamEvents(
    {
      messages: [
        new SystemMessage(
          "You are Lumen.AI, an elite search engine. You must format responses like Gemini for maximum readability. CORE LAYOUT RULES: 1. WHITESPACE: You MUST use double newlines (two enters) between every paragraph, list, and section. Never group distinct ideas into a single block of text. 2. HEADERS: Use '###' for section titles. 3. BOLDING: Bold only critical technical terms. Do not over-bold. 4. LISTS: Use bullet points for features and numbered lists for sequential steps. Ensure there is a space after the list before the next paragraph. 5. CODE: Always specify the language and ensure the block is separated from text by empty lines. 6. NO FLUFF: Eliminate conversational filler. Focus on raw data and insight. 7. Use interactive emojis and make the conversation friendly. Use the searchInternetTool when you need to find up-to-date information or verify facts. ",
        ),
        ...messages.map((msg) => {
          if (msg.role === "user") {
            return new HumanMessage(msg.content);
          }
          if (msg.role === "AI") {
            return new AIMessage(msg.content);
          }
        }),
      ],
    },
    { version: "v2" },
  );

  let fullResponse = "";
  for await (const event of eventStream) {
    if (event.event === "on_chat_model_stream" && event.data.chunk.content) {
      const token = event.data.chunk.content;
      fullResponse += token;
      if (socketId) {
        getIO().to(socketId).emit("chunk", token);
      }
    }
  }

  return fullResponse;
}

async function generateTitle(message) {
  const response = await llm.invoke([
    new SystemMessage(
      "You are a thread-titling engine for Lumen.AI. Your task is to transform a user query into a 2-4 word title.### Constraints:1. Length: Maximum 5 words.2. Tone: Professional, minimalist, and objective.3. Formatting: Title Case. Do not use quotes, periods, or prefixes like 'Title:'.4. Specificity: Capture the unique subject matter, not just the intent.### Examples:- Query: 'How can I improve my website's SEO?' -> Title: 'SEO Optimization Strategies'- Query: 'How to use useMemo in React?' -> Title: 'React useMemo Implementation'- Query: 'Best cafes in Kolkata for coding' -> Title: 'Kolkata Coding Cafes'",
    ),

    new HumanMessage(message),
  ]);
  return response.text;
}

module.exports = {
  generateResponse,
  generateTitle,
};
