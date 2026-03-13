import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search, Plane, Hotel, Utensils, Info, CheckCircle2, XCircle, Star, ArrowRight, Loader2, Map as MapIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import MapComponent from './components/MapComponent';

const App = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    startDate: '',
    endDate: '',
    people: 1
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5555/api/travel/plan', formData);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching plan:', error);
      alert('Erro ao carregar o roteiro. Verifique se o servidor está rodando e as chaves de API estão configuradas.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-purple-500 selection:text-white">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
      </div>

      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/10 glass">
        <h1 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          RoteirizAI
        </h1>
        <div className="flex gap-8 text-sm font-medium text-white/60">
          <a href="#" className="hover:text-white transition-colors">Meus Roteiros</a>
          <a href="#" className="hover:text-white transition-colors">Como funciona</a>
          <a href="#" className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10">Entrar</a>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-4 pt-12 pb-24">
        {!results ? (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                Seu próximo destino, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400">
                  planejado por IA.
                </span>
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                RoteirizAI cria roteiros personalizados integrando transporte, hospedagem, 
                gastronomia e atrações em segundos.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl glass border border-white/10 shadow-2xl"
            >
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">Origem</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-purple-400 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="De onde você sai?"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all placeholder:text-white/20"
                      value={formData.origin}
                      onChange={(e) => setFormData({...formData, origin: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">Destino</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-blue-400 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Para onde vamos?"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all placeholder:text-white/20"
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">Data de Início</label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-teal-400 transition-colors" />
                    <input 
                      type="date" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500/40 transition-all"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-end">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full h-[60px] bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Gerar Roteiro
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        ) : (
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="flex items-center justify-between">
                <div>
                  <button onClick={() => setResults(null)} className="text-sm text-white/40 hover:text-white flex items-center gap-2 mb-2 transition-colors">
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Voltar para a busca
                  </button>
                  <h2 className="text-4xl font-bold">{results.summary}</h2>
                </div>
                <div className="flex gap-4">
                  <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">Salvar PDF</button>
                  <button className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition-all font-bold">Ajustar Manualmente</button>
                </div>
              </div>

              {/* API Status Notice */}
              {results.isDemo && (
                <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-200/80 text-sm flex items-center gap-3">
                  <Info className="w-5 h-5 text-yellow-500" />
                  <p>
                    {results.errorType === 'QUOTA_EXCEEDED' 
                      ? "Aviso: Sua chave de Inteligência Artificial atingiu o limite ou é inválida. Exibindo roteiro sugerido (Modo Demo)." 
                      : "Nota: Alguns serviços externos estão temporariamente indisponíveis. Exibindo dados de simulação."}
                  </p>
                </div>
              )}

              {/* Grid de Resultados */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Coluna 1 & 2: Hospedagem, Transporte e MAPA */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* Mapa */}
                  <div className="p-8 rounded-3xl glass border border-white/10">
                    <div className="flex items-center gap-2 mb-6 text-teal-400">
                      <MapIcon className="w-6 h-6" />
                      <h3 className="text-xl font-bold">Localização</h3>
                    </div>
                    <MapComponent coords={results.coordinates} destination={formData.destination} />
                  </div>

                  {/* Hospedagem */}
                  <div className="p-8 rounded-3xl glass border border-white/10">
                    <div className="flex items-center gap-2 mb-6 text-purple-400">
                      <Hotel className="w-6 h-6" />
                      <h3 className="text-xl font-bold">Opções de Hospedagem</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {results.accommodations && Object.entries(results.accommodations).map(([key, hotel]) => (
                        <div key={key} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all">
                          <div className="flex justify-between items-start mb-2">
                            <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md ${key === 'low' ? 'bg-green-500/20 text-green-400' : key === 'medium' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                              {key === 'low' ? 'Econômico' : key === 'medium' ? 'Padrão' : 'Premium'}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-yellow-400">
                              <Star className="w-3 h-3 fill-current" />
                              {hotel.rating}
                            </div>
                          </div>
                          <h4 className="font-bold mb-1">{hotel.name}</h4>
                          <p className="text-lg font-black text-white/90 mb-4">{hotel.price}</p>
                          
                          <div className="space-y-2 mb-4">
                            {hotel.pros.map((pro, i) => (
                              <div key={i} className="flex items-center gap-2 text-[11px] text-white/60">
                                <CheckCircle2 className="w-3 h-3 text-green-400" />
                                {pro}
                              </div>
                            ))}
                            {hotel.cons.map((con, i) => (
                              <div key={i} className="flex items-center gap-2 text-[11px] text-white/40">
                                <XCircle className="w-3 h-3 text-red-400/50" />
                                {con}
                              </div>
                            ))}
                          </div>
                          <button 
                            onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(hotel.name)}+Hotel+${encodeURIComponent(formData.destination)}`, '_blank')}
                            className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-all"
                          >
                            Ver no Amadeus / Buscar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transporte */}
                  <div className="p-8 rounded-3xl glass border border-white/10">
                    <div className="flex items-center gap-2 mb-6 text-blue-400">
                      <Plane className="w-6 h-6" />
                      <h3 className="text-xl font-bold">Modais de Transporte</h3>
                    </div>
                    <div className="space-y-4">
                      {results.transports.map((t, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                              {t.type === 'Avião' ? <Plane className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                            </div>
                            <div>
                              <h4 className="font-bold">{t.type}</h4>
                              <p className="text-xs text-white/40">{t.trades}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{t.cost}</p>
                            <p className="text-xs text-white/40">{t.time} de viagem</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Coluna 3: Roteiro e Info Prática */}
                <div className="space-y-8">
                  {/* Info Prática */}
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10">
                    <div className="flex items-center gap-2 mb-4">
                      <Info className="w-5 h-5 text-blue-400" />
                      <h3 className="font-bold">Informações Úteis</h3>
                    </div>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-white/40">Clima Médio</span>
                        <span>{results.practicalInfo.weather}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-white/40">Cotação Moeda</span>
                        <span>{results.practicalInfo.currency}</span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed italic mt-2">
                        "{results.practicalInfo.tips}"
                      </p>
                    </div>
                  </div>

                  {/* Recomendações Extras */}
                  <div className="p-6 rounded-3xl glass border border-white/10">
                    <div className="flex items-center gap-2 mb-4 text-teal-400">
                      <Utensils className="w-5 h-5" />
                      <h3 className="font-bold">Destaques IA</h3>
                    </div>
                    <div className="space-y-4 text-sm">
                      <div>
                        <h4 className="text-[10px] uppercase font-bold text-white/40 mb-2">Gastronomia</h4>
                        <ul className="space-y-1">
                          {results.recommendations?.restaurants.map((r, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-teal-400" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[10px] uppercase font-bold text-white/40 mb-2">Atrações</h4>
                        <ul className="space-y-1">
                          {results.recommendations?.attractions.map((a, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-blue-400" />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Roteiro Compacto */}
                  <div className="p-6 rounded-3xl glass border border-white/10">
                    <h3 className="font-bold mb-4">Roteiro Sugerido</h3>
                    <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
                      {results.itinerary.map((day, i) => (
                        <div key={i} className="relative pl-8">
                          <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#0f172a] border-2 border-purple-500 flex items-center justify-center text-[10px] font-bold">
                            {day.day}
                          </div>
                          <h4 className="text-xs font-bold text-purple-400 mb-1">DIA {day.day}</h4>
                          <p className="text-sm text-white/70 leading-relaxed">{day.activity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
};

export default App;
