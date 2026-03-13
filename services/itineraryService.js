const axios = require('axios');
const openaiService = require('./openaiService');
const amadeusService = require('./amadeusService');

// Nominatim (OpenStreetMap) Geocoding
const getCoordinates = async (address) => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`, {
      headers: { 'User-Agent': 'RoteirizAI-App' },
      timeout: 5000
    });
    if (response.data && response.data.length > 0) {
      return {
        lat: parseFloat(response.data[0].lat),
        lon: parseFloat(response.data[0].lon),
        displayName: response.data[0].display_name
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error.message);
    return null;
  }
};

exports.generateFullPlan = async (tripDetails) => {
  const { origin, destination, startDate, endDate, people } = tripDetails;

  console.log(`Generating plan for ${origin} -> ${destination}...`);

  // 1. Get Coordinates for the map
  const coords = await getCoordinates(destination);

  // 2. Get AI Itinerary and Practical Info (with internal fallback)
  const aiData = await openaiService.generateItinerary(tripDetails);

  // 3. Get real IATA codes for Amadeus
  let originCode, destCode;
  try {
    originCode = await amadeusService.getCityCode(origin);
    destCode = await amadeusService.getCityCode(destination);
  } catch (e) {
    console.warn("Amadeus City Lookup failed:", e.message);
  }

  // 4. Get Hotel and Flight Offers using correct codes
  let hotels = null;
  let flights = null;
  
  if (destCode) {
    try {
        hotels = await amadeusService.getHotelOffers(destCode);
    } catch (e) {
        console.warn("Amadeus Hotels failed:", e.message);
    }
  }

  if (originCode && destCode) {
    try {
        flights = await amadeusService.getFlightOffers(originCode, destCode, startDate);
    } catch (e) {
        console.warn("Amadeus Flights failed:", e.message);
    }
  }

  return {
    summary: `Roteiro: ${origin} → ${destination}`,
    coordinates: coords,
    isDemo: aiData.isDemo || false,
    errorType: aiData.errorType || null,
    accommodations: (hotels && hotels.length > 0) ? {
      low: hotels[0] || { name: 'Opção Econômica', price: 'R$ 150', pros: ['Preço'], cons: ['Simples'], rating: 4.0 },
      medium: hotels[1] || { name: 'Opção Padrão', price: 'R$ 400', pros: ['Conforto'], cons: ['Preço'], rating: 4.3 },
      high: hotels[2] || { name: 'Opção Premium', price: 'R$ 1000', pros: ['Luxo'], cons: ['Caro'], rating: 4.8 }
    } : {
      low: { name: 'Hostel Ribeira', price: 'R$ 180/noite', pros: ['Preço', 'Localização'], cons: ['Simples'], rating: 4.2 },
      medium: { name: 'Hotel Porto Plaza', price: 'R$ 450/noite', pros: ['Conforto', 'Café'], cons: ['Tradicional'], rating: 4.5 },
      high: { name: 'Pousada do Porto', price: 'R$ 1.100/noite', pros: ['Luxo', 'Vista'], cons: ['Preço'], rating: 4.9 }
    },
    transports: (flights && flights.length > 0) ? flights : [
      { type: 'Comboio (Alfa Pendular)', cost: '€35', time: '2h 50m', trades: 'Confortável e rápido' },
      { type: 'Autocarro (Rede Expressos)', cost: '€12', time: '3h 30m', trades: 'Econômico' }
    ],
    practicalInfo: aiData.practicalInfo,
    itinerary: aiData.itinerary,
    recommendations: aiData.recommendations
  };
};
