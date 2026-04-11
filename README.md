# Lumen.AI (Perplexity Clone)

An advanced, full-stack conversational AI platform modeled to simulate the fast, streaming query experiences of Perplexity and ChatGPT. Built securely using the MERN stack with LangChain, Mistral AI, and optimized React/Redux UI to deliver real-time markdown-capable LLM completions over WebSocket streams.

## ✨ Features

- **Real-Time Streaming Protocol:** Langchain completions streamed chunk-by-chunk natively over Socket.io, eliminating long loading waits.
- **Deep Redux Toolkit Optimization:** Granularly structured state slicing so only deeply-nested `<OngoingChat />` components re-render during high-frequency token streams (No React DOM freeze-ups!).
- **Agentic Internet Navigation:** Out-of-the-box support for search engine tools (Tavily).
- **Authentication & Security:** Cookie-based JWT sessions, secure password hashing, and robust email verification for newly registered accounts using Nodemailer and Google OAuth2.
- **Single-Server Deployment Architechture:** Production-ready `npm run build` integration so Express.js intelligently serves React's static files with wildcard fallback—bypassing CORS constraints entirely natively!

## 🛠️ Tech Stack

### Frontend (User Interface)
- **Framework:** React 19 + Vite
- **State Management:** Redux Toolkit (`chat.slice.js` / `auth.slice.js`)
- **Styling:** SCSS + Tailwind CSS + Remix Icons
- **Markdown Handling:** `react-markdown` + `remark-gfm` (GitHub Flavored Markdown)

### Backend (API & Real-time Connectivity)
- **Core:** Node.js + Express.js
- **Database:** MongoDB + Mongoose (NoSQL Schemas)
- **Authentication & Verification:** `jsonwebtoken`, `bcrypt`, `cookie-parser`, `nodemailer`, Google APIs (OAuth2)
- **Real-Time Data:** `socket.io` (Hybrid-REST triggers with Socket continuous stream-down)
- **AI Integrations:** LangChain, `@langchain/mistralai`, Mistral AI (Models)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas cluster (or local setup)
- A Mistral AI (or equivalent Langchain provider) API key
- (Optional) Tavily Search API key for integrated internet searches.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/lumen-ai.git
cd lumen-ai
```

### 2. Environment Variables Setup
Navigate to the `backend` folder and create a `.env` file identical to the example mapped provided:
```bash
cd backend
cp .env.example .env
```
Fill out the variables listed in your `.env` securely!

### 3. Install Dependencies
You need to install dependencies for both the frontend and backend.
```bash
# Terminal 1: Backend
cd backend
npm install
npm run dev # Or node server.js

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` and the backend will start its Socket listener and Express APIs on `http://localhost:3000`.

---

## 🚢 Production Deployment

The project is highly optimized to run as a single architectural monolithic server, meaning that Node.js will wrap and serve your React code directly—simplifying infrastructure drops and destroying CORS boundaries.

1. Build the Frontend logic using Vite:
```bash
cd frontend
npm install
npm run build
```

2. Head into the Backend, install dependencies, and start the server matching `production` mode:
```bash
cd ../backend
npm install
NODE_ENV=production PORT=8080 node server.js
```

### Hosting on Platforms (Render / Heroku / DigitalOcean / VPS)
All you must provide your hosting platform is your environment variables array, your initial Node build command, and start command:
- **Build Command:** `cd frontend && npm install && npm run build && cd ../backend && npm install`
- **Start Command:** `cd backend && node server.js`
- Make sure to set `NODE_ENV` as `production`.

---

## 📝 License
This project is for educational and portfolio deployment purposes. Feel free to fork or clone to build your advanced capabilities using LLMs and Mongoose.