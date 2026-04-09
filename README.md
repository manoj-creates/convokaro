# ConvoKaro

ConvoKaro is an AI-powered conversation confidence training app for Indian men aged 18-30. Users practice real conversations with an AI, get instant feedback on their confidence, tone, and grammar, and track their growth over time.

## Setup Instructions

1. Clone or download this project.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your keys:
   ```bash
   cp .env.example .env
   ```
4. Run locally:
   ```bash
   npm run dev
   ```

## Environment Variables
- `VITE_SUPABASE_URL`: Your Supabase Project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase API Key
- `VITE_GEMINI_API_KEY`: Your Gemini API Key from Google AI Studio
- `VITE_RAZORPAY_KEY_ID`: Your Razorpay Key ID

## Deployment
This app can be deployed to Vercel easily. Just connect your GitHub repo and add the environment variables in the Vercel dashboard.
