import { createChatCompletion } from "@/app/services/openai";

export async function POST(request: Request) {
  const data = await request.json();

  const lyrics = await createChatCompletion(data.lyrics);
  if (!lyrics.data.choices[0].message?.content) {
    return new Response("Error creating chat completion", { status: 500 });
  }

  return new Response(
    JSON.stringify({ lyrics: lyrics.data.choices[0].message.content })
  );
}
