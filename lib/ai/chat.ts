/**
 * Module xử lý chat với Google Generative AI
 * Re-exports từ các module tách biệt
 */

import { FunctionCallingMode } from "@google/generative-ai";
import ai, { getDefaultGenerationConfig, MODEL_NAME } from ".";

import { availableFunctions, handleFunctionCall } from "./function-calling";
export function createModel() {
  return ai.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      ...getDefaultGenerationConfig(),
    },
    tools: [
      {
        functionDeclarations: availableFunctions,
      },
    ],
    toolConfig: {
      functionCallingConfig: {
        mode: FunctionCallingMode.ANY,
      },
    },
  });
}

export async function generateChatResponse(
  message: string,
  chatHistory: any[],
  schedules: string
): Promise<string> {
  const model = createModel();
  const chat = await model.startChat({
    history: chatHistory,
  });
  const result = await chat.sendMessage(message);
  const functionCall = result.response.functionCalls();
  if (functionCall && functionCall.length > 0) {
    const result = [];
    for (const call of functionCall) {
      const functionResult = await handleFunctionCall(call);
      result.push(functionResult);
    }

    return JSON.stringify(result);
  }

  return result.response.text();
}
