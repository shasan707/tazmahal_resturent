import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { chatPrompt } from '../../../chat-prompt';

export async function POST(req: NextRequest) {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const { history, message } = await req.json();

    // Reconstruct conversation as OpenAI chat messages.
    // The widget uses role 'model' for assistant turns; map it to 'assistant'.
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: chatPrompt },
      ...(history ?? []).map((msg: { role: string; text: string }) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.text,
      } as OpenAI.Chat.ChatCompletionMessageParam)),
      { role: 'user', content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
    });

    const text = completion.choices[0]?.message?.content ?? "";
    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Chat request failed." }, { status: 500 });
  }
}
