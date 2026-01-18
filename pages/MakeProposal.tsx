
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icons } from '../constants';
import { Ad, AdType } from '../types';

interface MakeProposalProps {
  ads: Ad[];
  onSendProposal: (adId: string, text: string, image?: string) => void;
}

const MakeProposal: React.FC<MakeProposalProps> = ({ ads, onSendProposal }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ad = ads.find(a => a.id === id);

  const [type, setType] = useState<AdType>('produto');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [offeredImage, setOfferedImage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!ad) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOfferedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const proposalText = `OFERTA DE PROPOSTA: Estou oferecendo meu ${type}: "${title}". Detalhes: ${description}.`;
    onSendProposal(ad.id, proposalText, offeredImage || undefined);
    setSuccess(true);
    setTimeout(() => navigate('/mensagens'), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 animate-in slide-in-from-bottom-4 duration-500 pb-24">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 font-bold text-xs uppercase tracking-widest transition-colors"
      >
        <Icons.ArrowLeft className="w-4 h-4" />
        Voltar para o anúncio
      </button>

      {success ? (
        <div className="bg-white rounded-[40px] p-12 text-center border border-emerald-100 shadow-xl shadow-emerald-500/5 animate-in zoom-in duration-300">
          <div className="w-24 h-24 bg-emerald-500 text-white rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/30">
            <Icons.CheckBadge className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Proposta Enviada!</h1>
          <p className="text-slate-500 text-lg mb-8 max-w-sm mx-auto">Sua oferta de troca foi enviada para <strong>{ad.userName}</strong>. Agora é só aguardar o retorno pelo chat.</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-6 items-center p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm">
            <img src={ad.image} alt={ad.title} className="w-24 h-24 rounded-2xl object-cover" />
            <div className="text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Você está enviando uma proposta para:</span>
              <h2 className="text-xl font-black text-slate-900">{ad.title}</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{ad.userName} • Valor Ref: R$ {ad.price?.toLocaleString('pt-BR')}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-[40px] p-8 md:p-10 border border-slate-100 shadow-sm space-y-10">
            {/* Escolha do Tipo */}
            <div className="space-y-6">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">O que você deseja oferecer em troca?</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setType('produto')}
                  className={`py-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
                    type === 'produto' 
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-lg shadow-emerald-500/10' 
                      : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                  }`}
                >
                  <Icons.Tag className="w-8 h-8" />
                  <span className="text-xs font-black uppercase tracking-widest">Oferecer Produto</span>
                </button>
                <button
                  type="button"
                  onClick={() => setType('serviço')}
                  className={`py-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
                    type === 'serviço' 
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-lg shadow-emerald-500/10' 
                      : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                  }`}
                >
                  <Icons.Briefcase className="w-8 h-8" />
                  <span className="text-xs font-black uppercase tracking-widest">Oferecer Serviço</span>
                </button>
              </div>
            </div>

            {/* Foto da Proposta */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-900 uppercase tracking-widest">Foto do que você oferece</label>
              <div className="relative aspect-video rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50 overflow-hidden group flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 transition-all">
                {offeredImage ? (
                  <>
                    <img src={offeredImage} alt="Sua oferta" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-black uppercase">Trocar Foto</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Icons.Camera className="w-10 h-10 text-slate-300 mb-2" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Anexar imagem da sua oferta</span>
                  </>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-900 uppercase tracking-widest">Nome do Item/Serviço</label>
                <input 
                  type="text" 
                  placeholder={type === 'produto' ? 'Ex: PlayStation 4 com 2 controles' : 'Ex: 10 aulas de Inglês avançado'}
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all font-bold text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-900 uppercase tracking-widest">Descrição da sua Oferta</label>
                <textarea 
                  rows={4}
                  placeholder="Explique detalhes da sua proposta para facilitar a aceitação..."
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all font-medium text-slate-800 resize-none"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-900 text-white h-20 rounded-[32px] font-black text-sm uppercase tracking-[0.2em] hover:bg-emerald-500 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
            >
              Enviar Minha Oferta
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MakeProposal;
