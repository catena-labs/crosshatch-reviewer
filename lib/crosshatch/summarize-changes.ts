import { OpenAI } from "openai"
import { env } from "@/env/server"

/**
 * TODO: Limit the number of changes!
 */
export async function summarizeChanges(changes: string[]) {
  if (!changes.length) {
    return
  }

  const openai = new OpenAI({
    baseURL: env.CROSSHATCH_BASE_URL,
    apiKey: env.CROSSHATCH_API_KEY
  })

  const response = await openai.chat.completions.create({
    stream: false,
    model: "lmsys-coding",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that summarizes code changes. You will be given a diff of a pull request. You will summarize the changes into 3 sections: 'Summary', 'Notable Changes', and 'Potential concerns' (if any). Summary should be 2 or 3 sentences maximum. Notable changes should be  a bulleted list of all notable changes, ignoring any minutia or unimportant changes for a rewview.  Potential concerns should be a bulleted list including any potential bugs or security holes introduced. Never mention imports or unimportant changes. Be concise. Always write in markdown, never use header-1. always include a Notable Changes section. "
      },
      {
        role: "user",
        content: `Here is the diff:\n${changes.join("\n\n")}`
      }
    ]
  })

  return response.choices[0]?.message.content ?? undefined
}
