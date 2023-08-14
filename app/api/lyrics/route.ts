import { createChatCompletion } from "@/app/services/openai";

export async function POST(request: Request) {
  console.log("POST request received");

  const data = await request.json();
  console.log("Request data:", data);

  const lyrics = await createChatCompletion(data.lyrics);
  console.log("Chat completion response:", lyrics);

  if (!lyrics.data.choices[0].message?.content) {
    console.log("Error creating chat completion");
    return new Response("Error creating chat completion", { status: 500 });
  }

  return new Response(
    JSON.stringify({ lyrics: lyrics.data.choices[0].message.content })
  );
}
