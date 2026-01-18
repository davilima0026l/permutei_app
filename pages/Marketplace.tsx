
import React, { useState } from 'react';
import AdCard from '../components/AdCard';
import { CATEGORIES, Icons } from '../constants';
import { Ad } from '../types';

interface MarketplaceProps {
  ads: Ad[];
  title: string;
  typeFilter?: 'produto' | 'serviço';
}

const Marketplace: React.FC<MarketplaceProps> = ({ ads, title, typeFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(10000);

  const filteredAds = ads.filter(ad => {
    const matchesType = typeFilter ? ad.type === typeFilter : true;
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length > 0 ? selectedCategories.includes(ad.category) : true;
    const matchesPrice = ad.price ? ad.price <= priceRange : true;
    return matchesType && matchesSearch && matchesCategory && matchesPrice;
  });

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Coluna Esquerda: Filtros */}
        <aside className="lg:w-72 space-y-8 flex-shrink-0">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Filtros</h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Busca</label>
                <div className="relative">
                  <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input 
                    type="text" 
                    placeholder="Palavras-chave..."
                    className="w-full bg-white border border-slate-100 rounded-xl py-2.5 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Preço Máximo</label>
                  <span className="text-xs font-black text-emerald-500">R${priceRange.toLocaleString('pt-BR')}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="10000" 
                  step="100"
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  value={priceRange}
                  onChange={e => setPriceRange(parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Categorias</label>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {CATEGORIES.map(cat => (
                    <label key={cat} className="flex items-center gap-3 group cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded-lg border-slate-200 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                      />
                      <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => { setSelectedCategories([]); setSearchTerm(''); setPriceRange(10000); }}
                className="w-full py-3 rounded-2xl border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        </aside>

        {/* Coluna Direita: Resultados */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-1">{title}</h1>
              <p className="text-slate-500 font-medium italic">Mostrando {filteredAds.length} resultados</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ordenar por:</span>
              <select className="bg-transparent text-sm font-bold text-slate-900 outline-none cursor-pointer">
                <option>Relevância</option>
                <option>Menor Preço</option>
                <option>Mais Recentes</option>
              </select>
            </div>
          </div>

          {filteredAds.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredAds.map(ad => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icons.Search className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Nada por aqui...</h3>
              <p className="text-slate-500">Tente ajustar seus filtros para encontrar o que procura.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
