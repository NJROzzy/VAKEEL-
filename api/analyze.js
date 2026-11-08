// POST /api/analyze — two-sided case analysis (Good Lawyer vs Devil's Lawyer).
// Requires the ANTHROPIC_API_KEY environment variable in Vercel.
import Anthropic from "@anthropic-ai/sdk";

const MAX_CHARS = 4000;
const MIN_CHARS = 60;

const PATH_IDS = ["fir", "arrest", "summons", "cyber", "dv", "divorce", "property", "consumer", "cheque", "accident", "work", "govt", "none"];

const argument = {
  type: "object",
  properties: {
    point: { type: "string", description: "The argument in one short sentence." },
    reasoning: { type: "string", description: "Why it matters, in 1-3 plain sentences." },
    legal_basis: { type: "string", description: "Relevant Indian law, section or principle; empty string if none applies." }
  },
  required: ["point", "reasoning", "legal_basis"],
  additionalProperties: false
};

const SCHEMA = {
  type: "object",
  properties: {
    case_summary: { type: "string" },
    case_type: { type: "string", description: "e.g. Civil, Criminal, Family, Consumer, Labour, Constitutional, or a combination." },
    good_lawyer: {
      type: "object",
      properties: {
        opening: { type: "string" },
        arguments: { type: "array", items: argument },
        evidence_to_gather: { type: "array", items: { type: "string" } }
      },
      required: ["opening", "arguments", "evidence_to_gather"],
      additionalProperties: false
    },
    devil_lawyer: {
      type: "object",
      properties: {
        opening: { type: "string" },
        arguments: { type: "array", items: argument },
        weak_spots: { type: "array", items: { type: "string" } }
      },
      required: ["opening", "arguments", "weak_spots"],
      additionalProperties: false
    },
    gray_areas: {
      type: "array",
      items: {
        type: "object",
        properties: {
          issue: { type: "string" },
          why_uncertain: { type: "string" },
          tips_in_your_favour_if: { type: "string" },
          tips_against_you_if: { type: "string" }
        },
        required: ["issue", "why_uncertain", "tips_in_your_favour_if", "tips_against_you_if"],
        additionalProperties: false
      }
    },
    balance: { type: "string", enum: ["strong", "leaning_favourable", "evenly_balanced", "leaning_unfavourable", "weak"] },
    balance_reason: { type: "string" },
    questions_to_clarify: { type: "array", items: { type: "string" } },
    next_steps: { type: "array", items: { type: "string" } },
    related_path: { type: "string", enum: PATH_IDS }
  },
  required: ["case_summary", "case_type", "good_lawyer", "devil_lawyer", "gray_areas", "balance", "balance_reason", "questions_to_clarify", "next_steps", "related_path"],
  additionalProperties: false
};

const SYSTEM = `You are the analysis engine behind JusticeSystem, a free public website that helps ordinary people in India understand their legal situation. A user describes their situation in their own words, from their own side. You produce a balanced, two-sided analysis.

Write two opposing voices:
- The Good Lawyer argues the user's side as strongly as honesty allows: the best arguments, the law that helps them, and the evidence that would make the case stronger.
- The Devil's Lawyer argues for the other side, the way opposing counsel would in court. Be genuinely tough: point out gaps in the story, missing evidence, delays, limitation periods, procedural problems and the other party's likely version of events. The user benefits most from hearing the hard arguments now rather than in court.

Real cases rarely have a clean answer. Identify the gray areas: the questions a judge could reasonably decide either way, and what facts would tip each one. Give an honest overall balance; do not flatter the user.

Ground the analysis in current Indian law. The Bharatiya Nyaya Sanhita, Bharatiya Nagarik Suraksha Sanhita and Bharatiya Sakshya Adhiniyam replaced the IPC, CrPC and Evidence Act from 1 July 2024; cite the new sections, and mention the old section in brackets where people commonly know it. Only cite a section when you are confident it is correct; otherwise name the Act or principle without a section number, or leave legal_basis empty. Never invent case names or citations.

Write in plain, simple English for a non-lawyer. Keep each argument short. Aim for 3-5 arguments per side, 2-4 gray areas, and 3-6 next steps. In next_steps, always include getting advice from an advocate, and mention free legal aid (NALSA helpline 15100 or the District Legal Services Authority) where the user may not be able to afford one. If the situation involves immediate danger, the first next step must be to call 112.

For related_path, choose the closest matching guide on the site: fir (police not registering an FIR), arrest (arrest or bail), summons (received a legal notice or court summons), cyber (online fraud), dv (domestic violence or dowry), divorce (divorce, maintenance, custody), property (land or property), consumer (defective product or service), cheque (cheque bounce or unpaid loan), accident (road accident compensation), work (salary, termination, workplace harassment), govt (government office, RTI), or none.

If the text is not a description of a legal situation, or it is too vague to analyse, still return the JSON: say so in case_summary, set balance to evenly_balanced, leave the argument lists empty, and use questions_to_clarify to ask for the facts you need. This is general legal information, not legal advice; do not claim to be a lawyer or promise outcomes.`;

const client = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Use POST." });
  }
  if (!client) {
    return res.status(503).json({ error: "Case analysis isn't switched on yet. The site owner needs to add an API key." });
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body || {};
  const story = String(body.story || "").trim();
  const side = String(body.side || "").trim().slice(0, 200);
  const otherSide = String(body.otherSide || "").trim().slice(0, 200);
  const state = String(body.state || "").trim().slice(0, 60);

  if (story.length < MIN_CHARS) {
    return res.status(400).json({ error: `Please describe your situation in a little more detail (at least ${MIN_CHARS} characters).` });
  }
  if (story.length > MAX_CHARS) {
    return res.status(400).json({ error: `Please keep the description under ${MAX_CHARS} characters.` });
  }

  const userMessage = [
    state && `State / UT: ${state}`,
    side && `I am: ${side}`,
    otherSide && `The other side is: ${otherSide}`,
    `My situation, in my own words:\n<situation>\n${story}\n</situation>`
  ].filter(Boolean).join("\n");

  try {
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 16000,
      output_config: {
        effort: "medium",
        format: { type: "json_schema", schema: SCHEMA }
      },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: SYSTEM,
      messages: [{ role: "user", content: userMessage }]
    });

    if (response.stop_reason === "refusal") {
      return res.status(422).json({ error: "We couldn't analyse this description. Please rephrase it as a description of your legal situation." });
    }
    if (response.stop_reason === "max_tokens") {
      return res.status(502).json({ error: "The analysis was too long to finish. Please try a shorter description." });
    }

    const text = response.content.filter(b => b.type === "text").map(b => b.text).join("");
    const analysis = safeParse(text);
    if (!analysis) {
      return res.status(502).json({ error: "Something went wrong reading the analysis. Please try again." });
    }
    return res.status(200).json(analysis);
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return res.status(429).json({ error: "Too many people are using case analysis right now. Please try again in a minute." });
    }
    if (err instanceof Anthropic.AuthenticationError) {
      console.error("Anthropic auth error: check ANTHROPIC_API_KEY");
      return res.status(503).json({ error: "Case analysis is temporarily unavailable." });
    }
    if (err instanceof Anthropic.APIError) {
      console.error("Anthropic API error", err.status, err.message);
      return res.status(502).json({ error: "The analysis service had a problem. Please try again." });
    }
    console.error("Unexpected error", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}

function safeParse(s) {
  try { return JSON.parse(s); } catch { return null; }
}
