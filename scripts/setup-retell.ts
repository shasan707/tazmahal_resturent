/**
 * One-time Retell setup.
 *
 * Creates a Retell-hosted LLM (prompt sourced from system-prompt.ts) and an agent
 * that references it, then prints the agent_id to paste into .env.local.
 *
 * Usage:
 *   1. Set RETELL_API_KEY (and optionally RETELL_VOICE_ID) in .env.local
 *   2. npm run setup:retell
 *   3. Copy the printed RETELL_AGENT_ID into .env.local
 *
 * Re-running creates a FRESH llm + agent each time (it does not update an existing one).
 */
import { loadEnvConfig } from "@next/env";
import Retell from "retell-sdk";
import { agentPrompt } from "../system-prompt";

// Load .env.local / .env the same way Next.js does, since this runs outside Next.
loadEnvConfig(process.cwd());

const apiKey = process.env.RETELL_API_KEY;
// A voice that supports Polish should be chosen in the Retell dashboard.
const voiceId = process.env.RETELL_VOICE_ID || "retell-Cimo";

if (!apiKey) {
  console.error("Missing RETELL_API_KEY. Set it in .env.local and retry.");
  process.exit(1);
}

const retell = new Retell({ apiKey });

async function main() {
  console.log("Creating Retell LLM…");
  const llm = await retell.llm.create({
    general_prompt: agentPrompt,
  });
  console.log(`  llm_id = ${llm.llm_id}`);

  console.log("Creating Retell agent…");
  const agent = await retell.agent.create({
    response_engine: { type: "retell-llm", llm_id: llm.llm_id },
    voice_id: voiceId,
    agent_name: "Taj Mahal Nina",
  });

  console.log("\n✅ Done. Add this to your .env.local:\n");
  console.log(`RETELL_AGENT_ID=${agent.agent_id}`);
  console.log(
    "\nThen, in the Retell dashboard, bind a phone number to this agent and set " +
      "NEXT_PUBLIC_RETELL_PHONE_NUMBER to it."
  );
}

main().catch((err) => {
  console.error("Setup failed:", err);
  process.exit(1);
});
