export function request(ctx) {
  const { ingredients = [] } = ctx.args;

  // Construct the prompt with the provided ingredients
  const prompt = `Suggest a recipe idea using these ingredients: ${ingredients.join(", ")}.`;

  // Return the request configuration
  return {
    resourcePath: `/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke`,
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt,
              },
            ],
          },
        ],
      }),
    },
  };
}

export function response(ctx) {
  console.log("=== FULL CONTEXT ===");
  console.log("ctx.result:", JSON.stringify(ctx.result, null, 2));
  console.log("ctx.result.statusCode:", ctx.result.statusCode);

  // Return diagnostic information
  return {
    body: `DIAGNOSTIC INFO:
Status Code: ${ctx.result.statusCode}
Body type: ${typeof ctx.result.body}
Body length: ${ctx.result.body ? ctx.result.body.length : 0}
First 500 chars: ${ctx.result.body ? ctx.result.body.substring(0, 500) : "no body"}`,
    error: null,
  };
}
