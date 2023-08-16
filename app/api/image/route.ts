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

export const runtime = "edge";

export async function POST(request: Request) {
  console.log("POST request received");

  // const session = await getServerSession(authOptions);
  // console.log("Server session obtained:", session);

  // if (!session?.user?.email) {
  //   console.log("User email not found");
  //   return new Response("User email not found", { status: 400 });
  // }

  // const { success, remaining } = await rateLimiter.limit(session.user.email);
  // console.log("Rate limit status:", { success, remaining });

  // if (!success) {
  //   console.log("Rate limit exceeded");
  //   return new Response("Rate limit exceeded", { status: 429 });
  // }

  const data = await request.json();
  console.log("Request data:", data);

  const url = await generateImage(data.prompt);
  console.log("Generated image URL:", url);

  return new Response(
    JSON.stringify({
      url,
      remainingRequests: 10,
    })
  );
}
