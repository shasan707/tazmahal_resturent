import Retell from "retell-sdk";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const agentId = process.env.RETELL_AGENT_ID;
    if (!agentId) {
      return NextResponse.json(
        { error: "RETELL_AGENT_ID is not set in the deployment environment." },
        { status: 500 }
      );
    }
    if (!process.env.RETELL_API_KEY) {
      return NextResponse.json(
        { error: "RETELL_API_KEY is not set in the deployment environment." },
        { status: 500 }
      );
    }

    const retell = new Retell({ apiKey: process.env.RETELL_API_KEY });
    const call = await retell.call.createWebCall({ agent_id: agentId });

    return NextResponse.json({
      accessToken: call.access_token,
      callId: call.call_id,
    });
  } catch (error: any) {
    console.error("Retell web-call error:", error);
    return NextResponse.json({ error: "Could not start voice call." }, { status: 500 });
  }
}
