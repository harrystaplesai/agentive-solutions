export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { company, name, size, industry, overallScore, stage, categoryScores, categories, lowestCategories, questionResponses } = req.body;

  if (!company || !overallScore || !categoryScores) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const scoreList = categories.map((cat, i) => `- ${cat}: ${categoryScores[i]}/10`).join('\n');
  const lowestList = lowestCategories.join(', ');

  // Build per-question breakdown grouped by category
  const answersByCategory = {};
  if (questionResponses) {
    questionResponses.forEach(qr => {
      if (!answersByCategory[qr.category]) answersByCategory[qr.category] = [];
      answersByCategory[qr.category].push(qr);
    });
  }

  let questionBreakdown = '';
  for (const [cat, responses] of Object.entries(answersByCategory)) {
    questionBreakdown += `\n${cat}:\n`;
    responses.forEach(r => {
      questionBreakdown += `  "${r.question}" — ${r.label} (${r.answer}/5)\n`;
    });
  }

  const prompt = `You are an AI business consultant writing a personalised AI readiness report for ${company}, a ${size} company in the ${industry} sector. The report is for ${name}.

Their overall AI readiness score is ${overallScore}/10 (${stage}).

Scores by category:
${scoreList}

Their three lowest-scoring areas are: ${lowestList}.

Here is exactly how they answered each question:
${questionBreakdown}
Pay close attention to the specific questions where they scored 1 or 2 (Strongly Disagree or Disagree). These are their real gaps. Reference these directly in your recommendations. For example, if they disagreed with "Our key business processes are documented so anyone on the team could follow them", tell them to start documenting their processes and explain why that matters for their specific industry.

Write a concise, practical action plan with exactly 4 recommendations. Each recommendation should be 2-3 sentences and must reference a specific answer they gave. Tailor every recommendation to the ${industry} sector and the realities of running a ${size} business. Write like a smart human consultant who has just reviewed their answers, direct, warm, no jargon. Use numbered paragraphs (1. 2. 3. 4.). End with one sentence encouraging them to book a Discovery Call with Agentive Solutions to discuss implementation. Keep the whole response under 400 words.

Use markdown formatting for structure. Use **bold** for emphasis and numbered lists for the recommendations.`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://agentivesolutions.co.uk',
        'X-Title': 'Agentive AI Readiness Assessment'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-sonnet-4',
        max_tokens: 1000,
        stream: true,
        messages: [
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter error:', errorText);
      return res.status(502).json({ error: 'Failed to generate report' });
    }

    // Stream the response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim().startsWith('data: '));

      for (const line of lines) {
        const data = line.replace('data: ', '').trim();
        if (data === '[DONE]') {
          res.write('data: [DONE]\n\n');
          break;
        }
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
          }
        } catch (e) {
          // Skip malformed chunks
        }
      }
    }

    res.end();
  } catch (error) {
    console.error('Report generation error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
