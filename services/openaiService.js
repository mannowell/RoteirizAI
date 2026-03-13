const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

exports.generateItinerary = async (tripDetails) => {
  const { origin, destination, startDate, endDate, people } = tripDetails;
  
  const prompt = `Crie um roteiro de viagem detalhado de ${origin} para ${destination} do dia ${startDate} até ${endDate} para ${people} pessoas.
  Inclua:
  1. Dicas práticas (clima, moeda, documentos, dicas de bagagem).
  2. Sugestões de gastronomia (restaurantes locais bem avaliados).
  3. Atrações turísticas imperdíveis.
  4. Um roteiro dia a dia.
  
  Responda APENAS em formato JSON com a seguinte estrutura:
  {
    "practicalInfo": { "weather": "string", "currency": "string", "tips": "string" },
    "itinerary": [ { "day": number, "activity": "string" } ],
    "recommendations": { "restaurants": ["string"], "attractions": ["string"] }
  }`;

  try {
    if (!process.env.GROQ_API_KEY && !process.env.OPENAI_API_KEY) {
        throw new Error('NO_KEY');
    }

    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "Você é um guia de viagens expert." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('OpenAI Error (Falling back to demo data):', error.message);
    
    // High quality fallback for demo purposes
    return {
        isDemo: true,
        errorType: error.code === 'insufficient_quota' ? 'QUOTA_EXCEEDED' : 'GENERIC',
        practicalInfo: { 
            weather: "20°C - Clima agradável", 
            currency: "Euro (EUR)", 
            tips: "Leve roupas confortáveis para caminhar. No Porto, não esqueça de provar a Francesinha!" 
        },
        itinerary: [
            { day: 1, activity: "Chegada ao Porto, check-in e passeio pela Ribeira ao entardecer." },
            { day: 2, activity: "Visita às caves de Vinho do Porto e subida à Torre dos Clérigos." },
            { day: 3, activity: "Passeio pela Livraria Lello e Palácio da Bolsa." }
        ],
        recommendations: { 
            restaurants: ["Cantinho do Avillez", "Tapabento", "Café Santiago"], 
            attractions: ["Torre dos Clérigos", "Ponte Luís I", "Sé do Porto"] 
        }
    };
  }
};
