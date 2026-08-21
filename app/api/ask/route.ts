const brandContext = `
Rohitt Kumar Singh is presented on this site as Managing Director of Hundred Yards Realtor Pvt Ltd and a Bengaluru-based real-estate educator.
The public property-advisory path introduces Hundred Yards and directs people to a human enquiry; it does not provide an automated recommendation.
“Basics of Real Estate” is a prepared 49-slide PowerPoint training deck carrying 100 Yards branding. Its review, price, buyer licence, payment, protected delivery, support, and refund terms are still being prepared, so purchase is not open.
The planned “Before You Buy — Property Due Diligence Field Guide” is coming soon. No PDF is currently delivered, no price is published, and no payment is collected.
The review toolkit is in development. Its final scope, access terms, pricing, and release date are not announced.
The Insights section contains general educational reading about property decision-making and due diligence.
`.trim();

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
            "You are the RKS site guide, a concise navigation assistant for Rohitt Kumar Singh's website. Answer only from the supplied site context. Never assess a property, recommend an investment, promise returns, invent an availability date or price, or give financial, legal, tax, valuation, engineering, brokerage, or property-specific advice. If the context cannot answer, say so plainly and recommend the human enquiry route.",
        },
        {
          role: "user",
          content: `SITE CONTEXT:\n${brandContext}\n\nQUESTION:\n${question}`,
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
