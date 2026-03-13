const itineraryService = require('../services/itineraryService');

exports.planTrip = async (req, res) => {
  try {
    const { origin, destination, startDate, people } = req.body;
    let { endDate } = req.body;

    if (!origin || !destination || !startDate) {
      return res.status(400).json({ error: 'Faltam informações obrigatórias (Origem, Destino, Data de Início).' });
    }

    if (!endDate) {
      const start = new Date(startDate);
      start.setDate(start.getDate() + 3);
      endDate = start.toISOString().split('T')[0];
    }

    // This is where we will call our internal services to fetch data
    // For now, we return a mock response that follows the required structure
    const plan = await itineraryService.generateFullPlan({ origin, destination, startDate, endDate, people: people || 1 });

    res.json(plan);
  } catch (error) {
    console.error('Error planning trip:', error);
    res.status(500).json({ error: 'Erro ao processar o seu roteiro. Tente novamente mais tarde.' });
  }
};
