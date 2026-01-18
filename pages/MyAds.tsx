
import React from 'react';
import AdCard from '../components/AdCard';
import { Icons } from '../constants';
import { Ad, User } from '../types';
import { usePermuteiStore } from '../store';

interface MyAdsProps {
  ads: Ad[];
  user: User | null;
  onDelete: (id: string) => void;
}

const MyAds: React.FC<MyAdsProps> = ({ ads, user, onDelete }) => {
  const { highlightAd } = usePermuteiStore();
  const myAds = ads.filter(ad => ad.userId === user?.id);

  const handleHighlight = (adId: string) => {
    if (confirm('Deseja destacar este anúncio por R$ 4,90 (7 dias)? O valor será descontado da sua carteira.')) {
      highlightAd(adId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-500 pb-32">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Meus Anúncios</h1>
          <p className="text-slate-500 font-medium italic">Gerencie e impulsione seus itens para vender mais rápido</p>
        </div>
        <div className="text-right">
          <span className="text-sm font-black text-emerald-500 bg-emerald-50 px-4 py-2 rounded-2xl uppercase tracking-widest">
            {myAds.length} Ativos
          </span>
        </div>
      </div>

      {myAds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myAds.map(ad => (
            <div key={ad.id} className="space-y-4">
              <AdCard 
                ad={ad} 
                onDelete={onDelete} 
                showActions={true} 
              />
              {!ad.isHighlighted && (
                <button 
                  onClick={() => handleHighlight(ad.id)}
                  className="w-full bg-indigo-50 text-indigo-600 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                >
                  🚀 Destacar este Anúncio (R$ 4,90)
                </button>
              )}
              {ad.isHighlighted && (
                <div className="w-full bg-emerald-50 text-emerald-600 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 text-center">
                  ✨ Anúncio em Destaque
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-slate-200">
          <div className="bg-slate-50 w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-sm">
            <Icons.List className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">Sua vitrine está vazia</h3>
          <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium">Comece agora mesmo a publicar seus itens ou serviços para permuta.</p>
          <button 
            onClick={() => window.location.hash = '#/criar'}
            className="bg-slate-900 text-white px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:bg-emerald-500 transition-all active:scale-95"
          >
            Criar Primeiro Anúncio
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAds;
