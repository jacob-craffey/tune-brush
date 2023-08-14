import { generateImage } from "@/app/services/openai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const rateLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 d"),
  analytics: true,
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response("User email not found", { status: 400 });
  }

  const { success, remaining } = await rateLimiter.limit(session.user.email);

  if (!success) {
    return new Response("Rate limit exceeded", { status: 429 });
  }

  const data = await request.json();
  const url = await generateImage(data.prompt);
  return new Response(
    JSON.stringify({
      url,
      remainingRequests: remaining,
    })
  );
}
