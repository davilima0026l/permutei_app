
import React from 'react';
import AdCard from '../components/AdCard';
import { Ad } from '../types';
import { Icons } from '../constants';
import { Link } from 'react-router-dom';

interface FavoritesProps {
  ads: Ad[];
  favoriteIds: string[];
}

const Favorites: React.FC<FavoritesProps> = ({ ads, favoriteIds }) => {
  const favoriteAds = ads.filter(ad => favoriteIds.includes(ad.id));

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-1">Itens Salvos</h1>
          <p className="text-slate-500 font-medium italic">Seus produtos e serviços favoritos em um só lugar</p>
        </div>
      </div>

      {favoriteAds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favoriteAds.map(ad => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-slate-200">
          <div className="w-24 h-24 bg-red-50 text-red-300 rounded-[32px] flex items-center justify-center mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Sua lista está vazia</h2>
          <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium">Você ainda não salvou nenhum anúncio. Explore o marketplace e clique no coração para salvar o que gostar!</p>
          <Link to="/marketplace" className="bg-slate-900 text-white px-10 py-4 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all">
            Explorar Marketplace
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
