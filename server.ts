import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI instance
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// Backend API Routes

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'PrimeMarket Rural Commerce Platform',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Gemini AI Assistant Proxy Route (Kisan & Gramin Shopping Mitra)
app.post('/api/ai-assistant', async (req, res) => {
  try {
    const { prompt, lang = 'hi', topic = 'general' } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Prompt is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Graceful fallback response if API key is not configured yet
      return res.json({
        success: true,
        source: 'fallback',
        reply: lang === 'hi'
          ? `नमस्ते! मैं प्राइममार्केट ग्रामीण मित्र हूँ। ${prompt} से संबंधित सलाह: सरसों और गेहूँ की बुवाई के लिए उत्तम बीज तथा उर्वरक प्राइममार्केट कृषि स्टोर पर उपलब्ध हैं। आप हमारी ऐप पर होम डिलीवरी के साथ ऑर्डर कर सकते हैं।`
          : `Hello! I am PrimeMarket Rural Assistant. Regarding your question on '${prompt}': Quality seeds, fertilizers, and tools are available for delivery on PrimeMarket. Check our Agriculture section for best mandi rates!`
      });
    }

    const systemInstruction = `
You are 'PrimeMarket Kisan & Gramin Mitra', an expert AI rural shopping and agricultural assistant for PrimeMarket (Rural Commerce Platform) in Uttar Pradesh, India.
Respond politely and concisely in ${lang === 'hi' ? 'Hindi (हिंदी)' : 'English'}.
Help villagers, farmers, and local shoppers with product advice (fertilizer, seeds, electronics, groceries), crop tips, government scheme info (PM Kisan, Ayushman, CSC), mandi rates, and how to place orders on PrimeMarket.
Keep answers helpful, warm, actionable, and under 150 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemInstruction}\nUser Question: ${prompt}` }] }
      ]
    });

    const replyText = response.text || (lang === 'hi' ? 'क्षमा करें, उत्तर प्राप्त नहीं हो सका।' : 'Sorry, could not generate response.');

    res.json({
      success: true,
      source: 'gemini',
      reply: replyText
    });
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    res.json({
      success: true,
      source: 'fallback_error',
      reply: req.body?.lang === 'hi'
        ? `प्राइममार्केट ग्रामीण मित्र: आपकी सेवा में सहायता उपलब्ध है। कृषि बीज, खाद, एवं दैनिक किराने की सामग्री तुरंत ऑर्डर करें!`
        : `PrimeMarket Assistant: We are here to help. Order high quality seeds, groceries, and services with fast village delivery!`
    });
  }
});

// Start Server with Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PrimeMarket Enterprise Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
