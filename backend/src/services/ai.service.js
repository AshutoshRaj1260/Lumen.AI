const { ChatMistralAI } = require("@langchain/mistralai");
const {
  HumanMessage,
  SystemMessage,
  AIMessage,
  tool,
  createAgent,
  ToolStrategy,
} = require("langchain");
const { searchInternet } = require("./internetSearch.service");
const z = require("zod");

const llm = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const searchInternetTool = tool(searchInternet, {
  name: "searchInternet",
  description:
    "Use this tool to search the internet for up-to-date information. Input should be a concise query.",
  schema: z.object({
    query: z
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

async function analyzeWebsiteContent(scrapedText) {
  const agent2 = createAgent({
    model: llm,
    temperature: 0.1,
    responseFormat: z.object({
      companyName: z
        .string()
        .describe("The official name of the company or website."),
      executiveSummary: z
        .string()
        .describe(
          "A professional, 2-sentence overview of what the company does.",
        ),
      valueProposition: z
        .string()
        .describe(
          "The main problem they solve or the unique benefit they offer.",
        ),

      // --- 2. SEO & CONTENT HEALTH ---
      seoKeywords: z
        .array(z.string())
        .describe("5 to 7 high-value SEO keywords inferred from the text."),
      contentReadability: z
        .enum(["Beginner", "Intermediate", "Advanced", "Academic"])
        .describe("The reading level required to understand the copy."),
      estimatedWordCount: z
        .number()
        .describe(
          "Rough estimation of the word count in the main content area.",
        ),

      // --- 3. CONVERSION & UX AUDIT ---
      primaryCTAs: z
        .array(z.string())
        .describe(
          "The exact text of the main Call-To-Action buttons (e.g., 'Book Demo').",
        ),
      conversionFriction: z
        .array(z.string())
        .describe(
          "Potential reasons a user might hesitate to buy or sign up based on the copy (e.g., 'Pricing is not transparent', 'Jargon-heavy').",
        ),

      // --- 4. THE "VITALS" (AI Perspective) ---
      copywritingStrengths: z
        .array(z.string())
        .describe(
          "3 specific things the website copy does exceptionally well.",
        ),
      criticalWarnings: z
        .array(z.string())
        .describe(
          "1 to 3 critical warnings about missing information (e.g., 'No clear refund policy', 'Value proposition is buried').",
        ),
      actionableImprovements: z
        .array(z.string())
        .describe(
          "3 highly specific, immediate steps the site owner can take to improve their messaging.",
        ),
    }),
    systemPrompt:
      "You are a top-tier analyst specializing in website content analysis. Your task is to extract critical insights from the provided website text.### Instructions:1. Company Name: Identify the official name of the company or website.2. Executive Summary: Provide a highly professional, 2-sentence overview of what the company does.3. Value Proposition: Determine the main problem they solve or the unique benefit they offer to users.4. Target Audience: Identify the specific demographic or business sector they are selling to.5. Core Offerings: List the main products or services offered.6. Primary CTAs: Identify the main Call-To-Action buttons found on the page (e.g., 'Sign Up', 'Learn More').7. Brand Tone: Describe the personality of the website's copywriting (e.g., formal, casual, playful).8. SEO Keywords: Infer 5 to 7 high-value SEO keywords based on the content and context of the text.",
  });

  const analysis = await agent2.invoke({
    messages: [
      new HumanMessage(`
        Analyze the following website content and extract the requested insights:\n\n${scrapedText}`),
    ],
  });

  const {
    companyName,
    executiveSummary,
    valueProposition,
    targetAudience,
    coreOfferings,
    primaryCTAs,
    brandTone,
    seoKeywords,
  } = analysis.structuredResponse;

  return analysis.structuredResponse;
}

module.exports = {
  generateResponse,
  generateTitle,
  analyzeWebsiteContent,
};
