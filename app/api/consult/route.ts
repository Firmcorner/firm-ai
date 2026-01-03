import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { companyName, businessType, query } = await req.json()

    console.log("[v0] OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY)

    // Validate required fields
    if (!companyName || !businessType || !query) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        {
          error: "OpenAI API key not configured",
          response: "Please add your OPENAI_API_KEY to the environment variables to enable AI consultations.",
        },
        { status: 500 },
      )
    }

    const { text } = await generateText({
      model: openai("gpt-4o-mini", {
        apiKey: process.env.OPENAI_API_KEY,
      }),
      messages: [
        {
          role: "system",
          content: `You are an expert business consultant with years of experience helping companies grow and succeed. You provide actionable, specific advice tailored to each business. You are professional, insightful, and solution-oriented.`,
        },
        {
          role: "user",
          content: `Company: ${companyName}
Business Type: ${businessType}
Question: ${query}

Please provide detailed, actionable advice for this business. Include specific strategies, steps they can take, and best practices relevant to their industry.`,
        },
      ],
      temperature: 0.7,
      maxTokens: 1000,
    })

    return Response.json({ response: text })
  } catch (error) {
    console.error("[v0] Error in consult API:", error)
    console.error("[v0] Error details:", error instanceof Error ? error.message : String(error))
    return Response.json(
      {
        error: "Failed to generate response",
        response:
          "I apologize, but I encountered an error processing your request. Please make sure your OpenAI API key is configured correctly.",
      },
      { status: 500 },
    )
  }
}
