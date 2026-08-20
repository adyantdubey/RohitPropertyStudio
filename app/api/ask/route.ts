import { products } from "../../lib/content";

const catalogContext = products
  .map(
    (product) =>
      `${product.title} (${product.kind}, ${product.price.formatted} placeholder price): ${product.description} Includes: ${product.includes.join(", ")}.`,
  )
  .join("\n");

export async function POST(request: Request) {
  let question = "";
  try {
    const body = (await request.json()) as { question?: unknown };
    question = typeof body.question === "string" ? body.question.trim() : "";
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!question || question.length > 500) {
    return Response.json(
      { error: "Ask a question between 1 and 500 characters." },
      { status: 400 },
    );
  }

  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error: "Mistral is not connected in this preview.",
        fallback: true,
      },
      { status: 503 },
    );
  }

  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.MISTRAL_MODEL || "mistral-small-latest",
      temperature: 0.2,
      max_tokens: 220,
      messages: [
        {
          role: "system",
          content:
            "You are Rohit Desk, a concise course concierge. Answer only from the supplied catalogue. Never assess a property, promise returns, or give financial, legal, tax, investment, valuation, engineering, or property-specific advice. If the catalogue cannot answer, say that the question needs Rohit's human context and recommend the contact form. Clearly call all prices placeholder prices.",
        },
        {
          role: "user",
          content: `CATALOGUE:\n${catalogContext}\n\nQUESTION:\n${question}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    return Response.json(
      { error: "The Mistral concierge is temporarily unavailable.", fallback: true },
      { status: 502 },
    );
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const answer = data.choices?.[0]?.message?.content?.trim();
  if (!answer) {
    return Response.json(
      { error: "The Mistral concierge returned no answer.", fallback: true },
      { status: 502 },
    );
  }

  return Response.json({ answer, mode: "mistral" });
}
