# 🌍✈️ RoteirizAI

> **SaaS de planejamento de viagens com Inteligência Artificial.** Cria roteiros personalizados integrando transporte, hospedagem, gastronomia e informações práticas.

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://reactjs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-412991.svg)](https://openai.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

---

## 🚀 Funcionalidades

| Feature | Descrição |
|---------|-----------|
| 🔍 **Busca Inteligente** | Planejamento com base em origem, destino, datas e número de pessoas |
| 🏨 **Hospedagem Categorizada** | Sugestões de baixo, médio e alto custo com análise de prós e contras |
| 🚌 **Comparação de Transporte** | Cruzamento de dados de aviões, ônibus (FlixBus) e trens |
| 🍽️ **Gastronomia & Atrações** | Recomendações baseadas em avaliações reais e geolocalização |
| 🌤️ **Informações Práticas** | Clima local, cotação de moeda, vacinas e dicas de bagagem |
| 🤖 **Roteiro Gerado por IA** | Itinerário dia a dia totalmente personalizável via OpenAI |

---

## 🛠️ Tecnologias

### Frontend
| Tecnologia | Uso |
|------------|-----|
| React (Vite) | Interface do usuário |
| Tailwind CSS v4 | Design System moderno |
| Lucide React | Ícones |
| Framer Motion | Animações |
| Axios | Integração com API |

### Backend
| Tecnologia | Uso |
|------------|-----|
| Node.js + Express | API REST |
| Sequelize ORM | Abstração do banco de dados |
| SQLite | Banco de dados local |
| OpenAI API | Geração de roteiros por IA |

---

## 📸 Screenshots

| Home | Busca | Roteiro |
|------|-------|---------|
| ![Home](docs/screenshots/home.png) | ![Busca](docs/screenshots/busca.png) | ![Roteiro](docs/screenshots/roteiro.png) |

---

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- npm
- Chave da OpenAI API

### Passo a Passo

```bash
# 1. Clone
git clone https://github.com/mannowell/RoteirizAI.git
cd RoteirizAI

# 2. Backend
npm install
cp .env.example .env    # Configure sua OPENAI_API_KEY
node index.js

# 3. Frontend
cd frontend
npm install
npm run dev
```

### Variáveis de Ambiente (.env)
```env
OPENAI_API_KEY=sua_chave_aqui
PORT=3001
```

---

## 📂 Estrutura do Projeto

```
RoteirizAI/
├── controllers/       # Lógica de controle das requisições
├── routes/            # Definição das rotas da API
├── services/          # Integração com APIs externas
│   └── openai.js      # Integração com OpenAI
├── models/            # Modelos do Sequelize
├── frontend/          # Aplicação React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── index.html
├── index.js           # Ponto de entrada do backend
├── package.json
└── README.md
```

---

## 🔌 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/health` | Health check |
| POST | `/api/trips` | Criar novo roteiro |
| GET | `/api/trips/:id` | Buscar roteiro |
| PUT | `/api/trips/:id` | Atualizar roteiro |
| DELETE | `/api/trips/:id` | Deletar roteiro |

---

## 📄 Licença

Distribuído sob licença **ISC**.

---

## 👤 Autor

**Wellison Oliveira (Mannowell)**

- 🌐 [GitHub](https://github.com/mannowell)
- 💼 [LinkedIn](https://linkedin.com/in/wellison-nascimento-79ba6b65/)
- 📧 [Email](mailto:manofama@gmail.com)
- 🔗 [Portfolio](https://mannowell.github.io/Portifolio/)

---

> 📌 **Projeto de portfólio** — Demonstração de habilidades em desenvolvimento fullstack, integração com IA (OpenAI), e criação de SaaS.
