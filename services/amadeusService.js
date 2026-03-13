const Amadeus = require('amadeus');

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

exports.getCityCode = async (cityName) => {
  try {
    const response = await amadeus.referenceData.locations.get({
      keyword: cityName,
      subType: Amadeus.location.city
    });
    // Find the one that has an IATA code and is a city
    const location = response.data.find(loc => loc.iataCode);
    return location ? location.iataCode : null;
  } catch (error) {
    console.error('Error fetching city code:', error);
    return null;
  }
};

exports.getHotelOffers = async (cityCode) => {
  if (!cityCode) return null;
  try {
    const response = await amadeus.referenceData.locations.hotels.byCity.get({
      cityCode: cityCode
    });
    
    return response.data.slice(0, 3).map((hotel, index) => ({
      name: hotel.name,
      price: index === 0 ? 'R$ 200/noite' : index === 1 ? 'R$ 500/noite' : 'R$ 1.200/noite',
      rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
      pros: index === 0 ? ['Preço baixo'] : index === 1 ? ['Conforto', 'Café'] : ['Luxo', 'Vip'],
      cons: index === 0 ? ['Simples'] : index === 1 ? ['Normal'] : ['Caro']
    }));
  } catch (error) {
    console.error('Error calling Amadeus Hotels:', error);
    return null;
  }
};

exports.getFlightOffers = async (origin, destination, date) => {
  if (!origin || !destination || !date) return null;
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: date,
      adults: '1',
      max: 2
    });

    return response.data.map(offer => ({
      type: 'Avião',
      cost: `€${offer.price.total}`,
      time: offer.itineraries[0].duration.replace('PT', '').toLowerCase(),
      trades: 'Rápido e prático'
    }));
  } catch (error) {
    console.error('Error calling Amadeus Flights:', error);
    return null;
  }
};
