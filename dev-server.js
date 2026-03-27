import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
    const [key, ...vals] = line.split('=');
    if (key && vals.length) process.env[key.trim()] = vals.join('=').trim();
  });
}

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const server = http.createServer(async (req, res) => {
  // API route
  if (req.url === '/api/report' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);

        // Build the same logic as api/report.js
        const { company, name: userName, size, industry, overallScore, stage, categoryScores, categories, lowestCategories, questionResponses } = data;

        const scoreList = categories.map((cat, i) => `- ${cat}: ${categoryScores[i]}/10`).join('\n');
        const lowestList = lowestCategories.join(', ');

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

        const prompt = `You are an AI business consultant writing a personalised AI readiness report for ${company}, a ${size} company in the ${industry} sector. The report is for ${userName}.

Their overall AI readiness score is ${overallScore}/10 (${stage}).

Scores by category:
${scoreList}

Their three lowest-scoring areas are: ${lowestList}.

Here is exactly how they answered each question:
${questionBreakdown}
Pay close attention to the specific questions where they scored 1 or 2 (Strongly Disagree or Disagree). These are their real gaps. Reference these directly in your recommendations. For example, if they disagreed with "Our key business processes are documented so anyone on the team could follow them", tell them to start documenting their processes and explain why that matters for their specific industry.

Write a concise, practical action plan with exactly 4 recommendations. Each recommendation should be 2-3 sentences and must reference a specific answer they gave. Tailor every recommendation to the ${industry} sector and the realities of running a ${size} business. Write like a smart human consultant who has just reviewed their answers, direct, warm, no jargon. Use numbered paragraphs (1. 2. 3. 4.). End with one sentence encouraging them to book a Discovery Call with Agentive Solutions to discuss implementation. Keep the whole response under 400 words.

Use markdown formatting for structure. Use **bold** for emphasis and numbered lists for the recommendations.`;

        const apiKey = process.env.OPENROUTER_API_KEY;
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
            messages: [{ role: 'user', content: prompt }]
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          console.error('OpenRouter error:', errText);
          res.writeHead(502, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'API error' }));
          return;
        }

        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n').filter(l => l.trim().startsWith('data: '));
          for (const line of lines) {
            const d = line.replace('data: ', '').trim();
            if (d === '[DONE]') { res.write('data: [DONE]\n\n'); break; }
            try {
              const parsed = JSON.parse(d);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) res.write(`data: ${JSON.stringify({ content })}\n\n`);
            } catch (e) {}
          }
        }
        res.end();
      } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error' }));
      }
    });
    return;
  }

  // Static files
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);

  try {
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Dev server running at http://localhost:3000');
  console.log('API key loaded:', process.env.OPENROUTER_API_KEY ? 'yes' : 'NO - check .env file');
});
