
import React from 'react';
import { Link } from 'react-router-dom';
import { Ad } from '../types';
import { usePermuteiStore } from '../store';

interface AdCardProps {
  ad: Ad;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

const AdCard: React.FC<AdCardProps> = ({ ad, onDelete, showActions = false }) => {
  const { auth, toggleFavorite } = usePermuteiStore();
  const isFavorite = auth.user?.favoriteIds.includes(ad.id);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://placehold.co/600x400/f1f5f9/64748b?text=Sem+Foto`;
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(ad.id);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative">
      <Link to={`/anuncio/${ad.id}`} className="block relative aspect-[4/3] overflow-hidden">
        <img 
          src={ad.image} 
          alt={ad.title} 
          onError={handleImgError}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Like Button */}
        <button 
          onClick={handleToggleFavorite}
          className={`absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-md border ${
            isFavorite 
              ? 'bg-red-500/90 border-red-400 text-white shadow-lg' 
              : 'bg-white/70 border-white/50 text-slate-400 hover:text-red-500 hover:bg-white'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg border border-slate-100 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-yellow-500">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
          <span className="text-[10px] font-black text-slate-900">4.9</span>
        </div>

        {/* Price Badge over image */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-emerald-500 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg border border-emerald-400">
            {ad.price ? `R$ ${ad.price.toLocaleString('pt-BR')}` : 'Sob Consulta'}
          </span>
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-slate-100 text-slate-500">
            {ad.category}
          </span>
          <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">
            {ad.type}
          </span>
        </div>
        
        <Link to={`/anuncio/${ad.id}`}>
          <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-1 mb-2">{ad.title}</h3>
        </Link>
        
        <p className="text-sm text-slate-500 line-clamp-2 mb-6 h-10 leading-relaxed font-medium">{ad.description}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
               <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(ad.userName)}&background=10b981&color=fff`} alt={ad.userName} />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="block text-xs font-bold text-slate-900 leading-none">{ad.userName}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-blue-500">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.498 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Verificado</span>
            </div>
          </div>
          
          {showActions && onDelete && (
            <button 
              onClick={(e) => { e.preventDefault(); onDelete(ad.id); }}
              className="text-[10px] font-black text-red-500 hover:text-red-700 uppercase tracking-widest transition-colors"
            >
              Remover
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdCard;
