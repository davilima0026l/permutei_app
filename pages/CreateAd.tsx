
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons, CATEGORIES } from '../constants';
import { AdType, DealType } from '../types';

interface CreateAdProps {
  onAdd: (ad: any) => void;
}

const CreateAd: React.FC<CreateAdProps> = ({ onAdd }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: CATEGORIES[0],
    type: 'produto' as AdType,
    dealType: 'ambos' as DealType,
    image: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For demo, create a local object URL or use a placeholder
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    onAdd({
      ...formData,
      price: formData.price ? parseFloat(formData.price) : undefined,
      image: formData.image || `https://picsum.photos/seed/${Math.random()}/800/600`
    });
    
    navigate('/meus-anuncios');
  };

  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Novo Anúncio</h1>
        <p className="text-slate-500">Preencha os detalhes do seu item ou serviço.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900 block uppercase tracking-wider">Foto Principal</label>
            <div className="relative aspect-video rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 overflow-hidden group flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all">
              {formData.image ? (
                <>
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold">Mudar Foto</span>
                  </div>
                </>
              ) : (
                <>
                  <Icons.Camera className="w-12 h-12 text-slate-300 mb-2" />
                  <span className="text-slate-400 font-medium">Clique para fazer upload</span>
                  <span className="text-xs text-slate-400 mt-1">JPG, PNG ou GIF (Máx. 5MB)</span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900 block uppercase tracking-wider">Título</label>
              <input 
                type="text" 
                placeholder="Ex: iPhone 13 Pro semi-novo" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900 block uppercase tracking-wider">Categoria</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none bg-white"
                value={formData.category}
                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900 block uppercase tracking-wider">Descrição Detalhada</label>
            <textarea 
              rows={5}
              placeholder="Descreva as condições, tempo de uso e o que você aceita na troca..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900 block uppercase tracking-wider">Tipo</label>
              <div className="flex gap-2">
                {['produto', 'serviço'].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type: t as AdType }))}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${
                      formData.type === t ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-slate-200 text-slate-500'
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-900 block uppercase tracking-wider">Negociação</label>
              <div className="flex gap-2">
                {['venda', 'troca', 'ambos'].map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, dealType: d as DealType }))}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${
                      formData.dealType === d ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-slate-200 text-slate-500'
                    }`}
                  >
                    {d === 'ambos' ? 'Ambos' : d.charAt(0).toUpperCase() + d.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900 block uppercase tracking-wider">Preço Sugerido (Opcional)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">R$</span>
              <input 
                type="number" 
                placeholder="0,00" 
                className="w-full px-12 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                value={formData.price}
                onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            className="flex-[2] bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
          >
            Publicar Anúncio
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAd;
