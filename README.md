# RoteirizAI 🌍✈️

**RoteirizAI** é um SaaS de planejamento de viagens completo que utiliza inteligência artificial para criar roteiros personalizados em segundos. O sistema integra transporte, hospedagem, gastronomia e informações práticas para garantir a melhor experiência de viagem.

## 🚀 Funcionalidades

- **Busca Inteligente**: Planejamento com base em origem, destino, datas e número de pessoas.
- **Hospedagem Categorizada**: Sugestões de baixo, médio e alto custo com análise de prós e contras.
- **Comparação de Transporte**: Cruzamento de dados de aviões, ônibus (FlixBus) e trens.
- **Gastronomia & Atrações**: Recomendações baseadas em avaliações reais e geolocalização.
- **Informações Práticas**: Clima local, cotação de moeda, vacinas e dicas de bagagem.
- **Roteiro Gerado por IA**: Itinerário dia a dia totalmente personalizável.

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React (Vite)**
- **Tailwind CSS v4** (Design System Moderno)
- **Lucide React** (Ícones)
- **Framer Motion** (Animações)
- **Axios** (Integração de API)

### Backend
- **Node.js + Express**
- **Sequelize ORM**
- **SQLite** (Banco de dados local)
- **OpenAI API** (Planejamento por IA)

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js (v18+)
- npm

### Passo a Passo

1. **Clonar o repositório**
   ```bash
   git clone <repo-url>
   cd neo
   ```

2. **Configurar o Backend**
   ```bash
   npm install
   cp .env.example .env # Configure suas chaves de API aqui
   node index.js
   ```

3. **Configurar o Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📂 Estrutura do Projeto

```text
/
├── controllers/    # Lógica de controle das requisições
├── routes/         # Definição das rotas da API
├── services/       # Integração com APIs externas e lógica de negócio
├── models/         # Modelos do Sequelize (Banco de dados)
├── frontend/       # Aplicação React (Interface do usuário)
└── index.js        # Ponto de entrada do servidor backend
```

## 📄 Licença

Este projeto está sob a licença ISC.
