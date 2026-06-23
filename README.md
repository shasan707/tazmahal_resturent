<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/d01b9ed5-6891-420f-aec5-83f9dfeb99a3

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create `.env.local` (see [.env.example](.env.example)) and set `OPENAI_API_KEY`
   and `RETELL_API_KEY`.
3. Create the Retell voice agent and copy the printed `RETELL_AGENT_ID` into `.env.local`:
   `npm run setup:retell`
4. Run the app:
   `npm run dev`

Chat is powered by OpenAI (`gpt-4o-mini`); voice is powered by RetellAI.
