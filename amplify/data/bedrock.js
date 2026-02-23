export function request(ctx) {
  const { ingredients = [] } = ctx.args;

  // Construct the prompt with the provided ingredients
  const prompt = `Suggest a recipe idea using these ingredients: ${ingredients.join(", ")}.`;

  // Build the request body for Amazon Nova Converse API
  const requestBody = {
    messages: [
      {
        role: "user",
        content: [
          {
            text: prompt,
          },
        ],
      },
    ],
    inferenceConfig: {
      maxTokens: 1000,
      temperature: 0.7,
    },
  };

  console.log("=== REQUEST DEBUG ===");
  console.log("Request body:", JSON.stringify(requestBody, null, 2));

  // Amazon Nova uses the Converse API format
  return {
    resourcePath: `/model/amazon.nova-2-lite-v1:0/converse`,
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    },
  };
}

export function response(ctx) {
  console.log("=== FULL CONTEXT ===");
  console.log("ctx.result:", JSON.stringify(ctx.result, null, 2));
  console.log("ctx.result.statusCode:", ctx.result.statusCode);

  // Check if we got a response
  if (!ctx.result || !ctx.result.body) {
    console.error("No response body from Bedrock");
    return {
      body: null,
      error: "No response from Bedrock API",
    };
  }

  // Parse the response body
  let parsedBody;
  try {
    parsedBody = JSON.parse(ctx.result.body);
    console.log("Parsed Bedrock response:", JSON.stringify(parsedBody, null, 2));
  } catch (e) {
    console.error("Failed to parse Bedrock response:", e);
    return {
      body: null,
      error: `Failed to parse response: ${e.message}`,
    };
  }

  // Check for errors in the response
  if (parsedBody.error) {
    console.error("Bedrock API error:", parsedBody.error);
    return {
      body: null,
      error: parsedBody.error.message || "Unknown error occurred",
    };
  }

  // Return full response for debugging
  return {
    body: `DEBUG MODE - Full Response:\n${JSON.stringify(parsedBody, null, 2)}`,
    error: null,
  };

  // COMMENTED OUT: Normal parsing logic - uncomment after debugging
  // // Amazon Nova Converse API returns output.message.content[0].text
  // if (parsedBody.output && parsedBody.output.message && parsedBody.output.message.content) {
  //   const content = parsedBody.output.message.content[0];
  //   if (content && content.text) {
  //     return {
  //       body: content.text,
  //       error: null,
  //     };
  //   }
  // }
  //
  // // If we can't find the expected format, return diagnostic info
  // console.error("Unexpected response format:", parsedBody);
  // return {
  //   body: null,
  //   error: `Unexpected response format. Status: ${parsedBody.stopReason || 'unknown'}`,
  // };
}
