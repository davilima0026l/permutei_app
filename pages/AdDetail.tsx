
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Icons } from '../constants';
import { Ad } from '../types';
import { usePermuteiStore } from '../store';

interface AdDetailProps {
  ads: Ad[];
}

const AdDetail: React.FC<AdDetailProps> = ({ ads }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { auth, toggleFavorite } = usePermuteiStore();
  
  const ad = ads.find(a => a.id === id);
  const isFavorite = auth.user?.favoriteIds.includes(ad?.id || '');

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://placehold.co/1000x800/f1f5f9/64748b?text=${encodeURIComponent(ad?.title || 'Permutei')}`;
  };

  if (!ad) {
    return (
      <div className="text-center py-20 px-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Anúncio não encontrado</h2>
        <button 
          onClick={() => navigate('/')}
          className="bg-slate-900 text-white px-6 py-2 rounded-full font-medium"
        >
          Voltar para Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 animate-in slide-in-from-bottom-4 duration-500 pb-24">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 font-medium transition-colors group"
      >
        <div className="bg-white p-2 rounded-xl border border-slate-100 group-hover:bg-slate-50">
          <Icons.ArrowLeft className="w-5 h-5" />
        </div>
        <span className="text-xs font-black uppercase tracking-widest">Voltar</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Image & Galery */}
        <div className="lg:col-span-7 space-y-6">
          <div className="aspect-[4/3] rounded-[48px] overflow-hidden shadow-sm border border-slate-100 bg-white group relative">
            <img 
              src={ad.image} 
              alt={ad.title} 
              onError={handleImgError}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl border border-white shadow-lg">
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <Icons.Camera className="w-3.5 h-3.5 text-emerald-500" />
                Foto Original
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer hover:border-emerald-500 transition-all">
                <img 
                  src={ad.image} 
                  alt="Thumbnail" 
                  onError={handleImgError}
                  className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" 
                />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-8 tracking-tight flex items-center justify-between">
              Avaliações Recentes
              <span className="text-emerald-500 text-sm font-bold">4.9 ★ (128)</span>
            </h2>
            
            <div className="space-y-8">
              {[
                { name: 'Ricardo Santos', text: 'Troca super rápida e o item estava impecável. Recomendo!', rating: 5 },
                { name: 'Ana Beatriz', text: 'Muito atencioso, o serviço de design superou minhas expectativas.', rating: 5 }
              ].map((rev, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex-shrink-0 flex items-center justify-center font-black text-slate-400 border border-slate-100">
                    {rev.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-black text-slate-900">{rev.name}</span>
                      <div className="flex gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 italic leading-relaxed font-medium">"{rev.text}"</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-8 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-500 transition-colors">
              Ver todas as 128 avaliações
            </button>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-[40px] p-8 md:p-10 border border-slate-100 shadow-sm relative overflow-hidden sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl ${
                ad.type === 'produto' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
              }`}>
                {ad.type}
              </span>
              <span className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border border-slate-100">
                {ad.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight leading-tight">{ad.title}</h1>
            
            <div className="text-4xl font-black text-slate-900 mb-8 flex items-baseline gap-2">
              <span className="text-lg text-emerald-500 font-bold tracking-normal">R$</span>
              {ad.price ? ad.price.toLocaleString('pt-BR') : '---'}
            </div>

            <div className="space-y-4 mb-10">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Sobre este anúncio</h2>
              <p className="text-slate-600 leading-relaxed text-lg font-medium">{ad.description}</p>
            </div>

            <div className="border-t border-slate-100 pt-8 mt-auto">
              <div className="flex items-center justify-between mb-8 p-4 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white overflow-hidden ring-2 ring-emerald-500/20 shadow-sm">
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(ad.userName)}&background=10b981&color=fff`} alt={ad.userName} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-1">
                      {ad.userName}
                      <Icons.CheckBadge className="w-3.5 h-3.5 text-blue-500" />
                    </h3>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Membro Verificado</p>
                  </div>
                </div>
                <Link to="/perfil" className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:text-emerald-700">Ver Perfil</Link>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => navigate(`/proposta/${ad.id}`)}
                  className="flex-1 bg-slate-900 text-white h-16 rounded-[24px] font-black text-xs uppercase tracking-[0.1em] hover:bg-emerald-500 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                >
                  Negociar Agora
                </button>
                <button 
                  onClick={() => toggleFavorite(ad.id)}
                  className={`w-16 h-16 flex items-center justify-center rounded-[24px] border transition-all active:scale-90 ${
                    isFavorite 
                      ? 'bg-red-500 border-red-400 text-white shadow-lg shadow-red-500/20' 
                      : 'bg-white border-slate-200 text-slate-300 hover:text-red-500 hover:border-red-100'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </button>
              </div>
              
              <p className="text-center mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                🔒 Transação segura via plataforma
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetail;
