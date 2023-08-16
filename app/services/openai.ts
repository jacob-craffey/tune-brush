export async function createChatCompletion(prompt: string) {
  try {
    const body = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that generates prompts for the image generation ai service DALL.E 2, you ingest lyrics from songs and output a prompt to generate art. You can utilize any information you know about the artist or genre as well and you can be creative to generate the best prompts. Your response will be fed directly into DALL.E 2 and the response must be less than 150 characters long. Be as descriptive as you can given the constraints and factor the lyrics heavily",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function generateImage(prompt: string) {
  console.log("generateImage called with prompt:", prompt);

  try {
    const trimmedPrompt = prompt.substring(0, 200);
    console.log("Trimmed prompt:", trimmedPrompt);

    const body = {
      prompt,
      n: 1,
      size: "256x256",
    };

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const returnVal = await response.json();
    return returnVal.data[0].url;
  } catch (error) {
    console.error("Error in generateImage:", error);
    throw error;
  }
}
