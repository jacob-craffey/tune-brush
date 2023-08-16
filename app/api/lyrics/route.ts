import { createChatCompletion, generateImage } from "@/app/services/openai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const runtime = "edge";

const rateLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 d"),
  analytics: true,
});

export async function POST(request: Request) {
  console.log("POST request received");

  const data = await request.json();
  console.log("Request data:", data);

  if (!data.email) {
    console.log("User email not found");
    return new Response("User email not found", { status: 400 });
  }

  if (!data.lyrics) {
    console.log("Lyrics not found");
    return new Response("Lyrics not found", { status: 400 });
  }

  const { success, remaining } = await rateLimiter.limit(data.email);
  console.log("Rate limit status:", { success, remaining });

  const lyrics = await createChatCompletion(data.lyrics);
  console.log("Chat completion response:", lyrics);

  if (!lyrics.choices[0].message?.content) {
    console.log("Error creating chat completion");
    return new Response("Error creating chat completion", { status: 500 });
  }

  const url = await generateImage(lyrics.choices[0].message?.content);

  return new Response(
    JSON.stringify({
      url,
      remainingRequests: remaining,
    })
  );
}
