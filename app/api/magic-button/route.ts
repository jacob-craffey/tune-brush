import { createChatCompletion, generateImage } from "@/app/services/openai";

export async function POST(request: Request) {
  const data = await request.json();

  const testing = await createChatCompletion(data.lyrics);
  if (!testing.data.choices[0].message?.content) return Response.error();
  const url = await generateImage(testing.data.choices[0].message?.content);
  return new Response(
    JSON.stringify({
      url,
    })
  );
}
