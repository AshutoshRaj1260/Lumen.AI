# Lumen AI

An advanced, full-stack conversational AI platform modeled to simulate the fast, streaming query experiences of Perplexity and ChatGPT. Built securely using the MERN stack with LangChain, Mistral AI, and optimized React/Redux UI to deliver real-time markdown-capable LLM completions over WebSocket streams.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Status](https://img.shields.io/badge/status-Production%20Ready-success.svg)

## 🌐 Live Application
- **Website:** [lumen-ai.dev](https://lumen-ai.dev)
- **Domain Registrar:** Name.com
- **Hosting:** Deployed on [Render](https://render.com)

## ✨ Core Features

- **Real-Time Streaming Protocol:** Langchain completions streamed chunk-by-chunk natively over Socket.io, eliminating long loading waits.
- **Deep Redux Toolkit Optimization:** Granularly structured state slicing so only deeply-nested `<OngoingChat />` components re-render during high-frequency token streams (No React DOM freeze-ups!).
- **Agentic Internet Navigation:** Out-of-the-box support for search engine tools (Tavily).
- **Authentication & Security:** Cookie-based JWT sessions, secure password hashing, and robust email verification for newly registered accounts using **Resend** for transactional webhooks.
- **Single-Server Deployment Architecture:** Production-ready backend serves the compiled React application, sharing a single port to bypass CORS boundaries natively and efficiently on Render.

## 🛠️ Tech Stack

### Frontend (User Interface)
- **Framework:** React 19 + Vite
- **State Management:** Redux Toolkit (`chat.slice.js` / `auth.slice.js`)
- **Styling:** SCSS, Tailwind CSS, Remix Icons
- **Markdown Handling:** `react-markdown` + `remark-gfm` (GitHub Flavored Markdown)

### Backend (API & Real-time Connectivity)
- **Core Environment:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT, bcrypt, cookie-parser
- **Email Infrastructure:** Resend API
- **Real-Time Data:** Socket.io (Hybrid-REST triggers with Socket continuous stream)
- **AI Integrations:** LangChain, `@langchain/mistralai`, Mistral AI
- **Web Search Provider:** Tavily

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas cluster URI (or local setup)
- Mistral AI API key
- Resend API key
- Tavily Search API key (optional)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/lumen-ai.git
cd lumen-ai
```

### 2. Environment Variables Setup
Navigate to the `backend` folder and create a `.env` file:
```bash
cd backend
cp .env.example .env
```
Ensure you provide the following core variables:
- `MONGO_URI`
- `RESEND_API_KEY`
- `JWT_SECRET`
- `MISTRAL_API_KEY`
- `SITE_URL=http://localhost:5173`

### 3. Start Development Servers
**Backend:**
```bash
cd backend
npm install
npm run dev 
# Starts on http://localhost:3000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# Starts on http://localhost:5173
```

---

## 🚢 Production Deployment

This application is configured for a monolithic deployment on **Render** utilizing a Node.js web service environment. Node natively hosts the built Vite static files on the same Express instance.

### Build Steps

1. Configure your Render Web Service to point to your repository.
2. Provide your Name.com domain (`lumen-ai.dev`) in the Render custom domains dashboard.
3. Configure the following environment variables within the Render dashboard:
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://lumen-ai.dev`
   - `SITE_URL=https://lumen-ai.dev`
   - Resend, Mistral, and Mongo credentials.
4. **Build Command:**
   ```bash
   cd frontend && npm install && npm run build && cd ../backend && npm install
   ```
5. **Start Command:**
   ```bash
   cd backend && node server.js
   ```

Because of the architectural design, the Express server running on port `8080` (or injected `PORT`) will perfectly serve your compiled `./frontend/dist` directory.

---

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.