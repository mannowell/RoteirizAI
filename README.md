# RoteirizAI

> **SaaS de planejamento de viagens com Inteligencia Artificial.** Cria roteiros personalizados integrando transporte, hospedagem, gastronomia e informacoes praticas.

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://reactjs.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

---

## Funcionalidades

| Feature | Descricao |
|---------|-----------|
| **Busca Inteligente** | Planejamento com base em origem, destino, datas e numero de pessoas |
| **Hospedagem Categorizada** | Sugestoes de baixo, medio e alto custo com analise de pros e contras |
| **Comparacao de Transporte** | Cruzamento de dados de avioes, trens e onibus via Amadeus API |
| **Gastronomia & Atracoes** | Recomendacoes geradas por IA com base no destino |
| **Informacoes Praticas** | Clima local, cotacao de moeda e dicas de viagem |
| **Roteiro Gerado por IA** | Itinerario dia a dia personalizado via Groq (Llama 3.3 70B) |
| **Mapa Interativo** | Visualizacao do destino com Leaflet + OpenStreetMap |

---

## Tecnologias

### Frontend

| Tecnologia | Uso |
|------------|-----|
| React 19 (Vite 6) | Interface do usuario |
| Tailwind CSS v4 | Design System |
| Lucide React | Icones |
| Framer Motion | Animacoes |
| Leaflet + React-Leaflet | Mapa interativo |
| Axios | Integracao com API |

### Backend

| Tecnologia | Uso |
|------------|-----|
| Node.js + Express | API REST |
| Sequelize ORM | Abstracao do banco de dados |
| SQLite | Banco de dados local |
| Groq API (Llama 3.3 70B) | Geracao de roteiros por IA |
| Amadeus API | Busca de voos e hoteis |
| Nominatim/OpenStreetMap | Geocodificacao |

---

## Instalacao

### Pre-requisitos
- Node.js 18+
- npm
- Chave da Groq API (ou OpenAI)
- Chaves da Amadeus API (opcional)

### Passo a Passo

```bash
# 1. Clone
git clone https://github.com/mannowell/RoteirizAI.git
cd RoteirizAI

# 2. Backend
npm install
cp .env.example .env    # Configure suas chaves de API
node index.js

# 3. Frontend (em outro terminal)
cd frontend
npm install
npm run dev
```

### Variaveis de Ambiente (.env)

```env
# Servidor
PORT=5000
NODE_ENV=development

# IA - Groq (obtenha em https://console.groq.com/keys)
GROQ_API_KEY=gsk_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Amadeus Travel API (obtenha em https://developers.amadeus.com/)
AMADEUS_CLIENT_ID=SEU_AMADEUS_CLIENT_ID
AMADEUS_CLIENT_SECRET=SUA_AMADEUS_CLIENT_SECRET
```

> **Nota:** O frontend conecta automaticamente em `http://localhost:5000`. Se usar outra porta, atualize a URL em `frontend/src/App.jsx`.

---

## Estrutura do Projeto

```
RoteirizAI/
├── index.js                    # Ponto de entrada do backend (Express)
├── config/config.json          # Configuracao do Sequelize (SQLite)
├── controllers/
│   └── travelController.js     # Handler do planejamento de viagem
├── routes/
│   └── travelRoutes.js         # Definicao de rotas
├── services/
│   ├── itineraryService.js     # Orquestrador: geocoding + IA + Amadeus
│   ├── openaiService.js        # Integracao com Groq/OpenAI
│   └── amadeusService.js       # Busca de voos e hoteis
├── models/
│   └── index.js                # Loader de modelos Sequelize
├── frontend/                   # Aplicacao React (Vite)
│   ├── src/
│   │   ├── App.jsx             # Componente principal
│   │   ├── index.css           # Tailwind + estilos globais
│   │   └── components/
│   │       └── MapComponent.jsx
│   └── index.html
├── .env.example
└── package.json
```

---

## API Endpoints

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | `/` | Status da API |
| GET | `/api/health` | Health check |
| POST | `/api/travel/plan` | Gerar roteiro de viagem |

### Exemplo de requisicao

```bash
curl -X POST http://localhost:5000/api/travel/plan \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "Sao Paulo",
    "destination": "Porto",
    "startDate": "2025-03-15",
    "endDate": "2025-03-18",
    "people": 2
  }'
```

### Resposta

```json
{
  "summary": "Roteiro: Sao Paulo -> Porto",
  "coordinates": { "lat": 41.1579, "lon": -8.6291, "displayName": "..." },
  "isDemo": false,
  "accommodations": { "low": {...}, "medium": {...}, "high": {...} },
  "transports": [...],
  "practicalInfo": { "weather": "...", "currency": "...", "tips": "..." },
  "itinerary": [{ "day": 1, "activity": "..." }],
  "recommendations": { "restaurants": [...], "attractions": [...] }
}
```

---

## Licenca

Distribuido sob licenca **ISC**.

---

## Autor

**Wellison Oliveira (Mannowell)**

- [GitHub](https://github.com/mannowell)
- [LinkedIn](https://linkedin.com/in/wellison-nascimento-79ba6b65/)
- [Email](mailto:manofama@gmail.com)
- [Portfolio](https://mannowell.github.io/Portifolio/)

---

> **Projeto de portfolio** — Demonstracao de habilidades em desenvolvimento fullstack, integracao com IA, e criacao de SaaS.
