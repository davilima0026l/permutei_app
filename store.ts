
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Ad, User, AuthState, Conversation, Transaction, PlatformStats } from './types';

const INITIAL_ADS: Ad[] = [
  {
    id: '1',
    userId: 'u1',
    userName: 'João Silva',
    title: 'Apple Watch Ultra - Impecável',
    description: 'Relógio topo de linha, caixa de titânio. Aceito troca por serviços de design, consultoria ou produtos Apple de menor valor com volta.',
    type: 'produto',
    dealType: 'ambos',
    category: 'Eletrônicos',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
    price: 4500,
    createdAt: new Date().toISOString(),
    isHighlighted: true
  },
  {
    id: '2',
    userId: 'u2',
    userName: 'Sarah Chen',
    title: 'Corte de Cabelo Premium & Visagismo',
    description: 'Serviço completo em salão de luxo. Especialista em visagismo e coloração. Troco por eletrônicos ou itens de decoração.',
    type: 'serviço',
    dealType: 'venda',
    category: 'Beleza & Bem-Estar',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
    price: 300,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    userId: 'u3',
    userName: 'Marcos Oliveira',
    title: 'PlayStation 5 + 2 Controles',
    description: 'Versão com disco, na caixa original. Troco por MacBook M1 ou superior. Aceito propostas de outros eletrônicos.',
    type: 'produto',
    dealType: 'troca',
    category: 'Eletrônicos',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1200&auto=format&fit=crop',
    price: 3800,
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    userId: 'u4',
    userName: 'Clínica Sorrir',
    title: 'Clareamento Dental Profissional',
    description: 'Tratamento completo a laser. Aceito troca por serviços de Social Media ou Marketing Digital para a clínica.',
    type: 'serviço',
    dealType: 'ambos',
    category: 'Beleza & Bem-Estar',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200&auto=format&fit=crop',
    price: 1200,
    createdAt: new Date().toISOString(),
    isHighlighted: true
  }
];

const INITIAL_USER: User = {
  id: 'u1',
  name: 'João Silva',
  email: 'joao@permutei.com',
  avatar: 'https://ui-avatars.com/api/?name=Joao+Silva&background=10b981&color=fff',
  bio: 'Entusiasta de tecnologia e trocas justas.',
  location: 'Florianópolis, SC',
  walletBalance: 250.00,
  favoriteIds: [],
  isPro: false
};

const INITIAL_STATS: PlatformStats = {
  totalRevenue: 15450.50,
  feesCollected: 2350.30,
  subscriptionRevenue: 10200.00,
  highlightRevenue: 2900.20,
  transactions: []
};

interface PermuteiContextType {
  ads: Ad[];
  conversations: Conversation[];
  auth: AuthState;
  platformStats: PlatformStats;
  login: (email: string) => void;
  logout: () => void;
  addAd: (newAd: Omit<Ad, 'id' | 'createdAt' | 'userId' | 'userName'>) => void;
  removeAd: (id: string) => void;
  highlightAd: (id: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  rechargeWallet: (amount: number) => void;
  toggleFavorite: (adId: string) => void;
  subscribePro: () => void;
  processTransaction: (type: Transaction['type'], amount: number, desc: string) => void;
}

const PermuteiContext = createContext<PermuteiContextType | null>(null);

export const PermuteiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use v12 to force clear the old cache and load the fixed images
  const [ads, setAds] = useState<Ad[]>(() => {
    const saved = localStorage.getItem('permutei_ads_v12');
    return saved ? JSON.parse(saved) : INITIAL_ADS;
  });

  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('permutei_auth_v12');
    return saved ? JSON.parse(saved) : { user: INITIAL_USER, isAuthenticated: true };
  });

  const [platformStats, setPlatformStats] = useState<PlatformStats>(() => {
    const saved = localStorage.getItem('permutei_stats_v12');
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('permutei_convs_v12');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('permutei_ads_v12', JSON.stringify(ads));
    localStorage.setItem('permutei_auth_v12', JSON.stringify(auth));
    localStorage.setItem('permutei_stats_v12', JSON.stringify(platformStats));
    localStorage.setItem('permutei_convs_v12', JSON.stringify(conversations));
  }, [ads, auth, platformStats, conversations]);

  const processTransaction = (type: Transaction['type'], amount: number, desc: string) => {
    if (!auth.user) return;

    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      userId: auth.user.id,
      userName: auth.user.name,
      type,
      amount,
      description: desc,
      date: new Date().toISOString()
    };

    setPlatformStats(prev => ({
      ...prev,
      totalRevenue: prev.totalRevenue + amount,
      feesCollected: type === 'taxa_servico' ? prev.feesCollected + amount : prev.feesCollected,
      subscriptionRevenue: type === 'assinatura' ? prev.subscriptionRevenue + amount : prev.subscriptionRevenue,
      highlightRevenue: type === 'destaque' ? prev.highlightRevenue + amount : prev.highlightRevenue,
      transactions: [newTx, ...prev.transactions]
    }));

    if (type !== 'venda' && type !== 'recarga') {
      setAuth(prev => ({
        ...prev,
        user: prev.user ? { ...prev.user, walletBalance: prev.user.walletBalance - amount } : null
      }));
    } else if (type === 'recarga') {
        setAuth(prev => ({
            ...prev,
            user: prev.user ? { ...prev.user, walletBalance: prev.user.walletBalance + amount } : null
          }));
    }
  };

  const subscribePro = () => {
    if (!auth.user || auth.user.walletBalance < 19.90) return;
    processTransaction('assinatura', 19.90, 'Plano Permutei Pro Mensal');
    setAuth(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, isPro: true } : null
    }));
  };

  const highlightAd = (adId: string) => {
    if (!auth.user || auth.user.walletBalance < 4.90) return;
    processTransaction('destaque', 4.90, 'Destaque de Anúncio (7 dias)');
    setAds(prev => prev.map(ad => ad.id === adId ? { ...ad, isHighlighted: true } : ad));
  };

  const toggleFavorite = (adId: string) => {
    if (!auth.user) return;
    const currentFavorites = auth.user.favoriteIds || [];
    const updatedFavorites = currentFavorites.includes(adId)
      ? currentFavorites.filter(id => id !== adId)
      : [...currentFavorites, adId];
    setAuth(prev => ({ ...prev, user: prev.user ? { ...prev.user, favoriteIds: updatedFavorites } : null }));
  };

  const login = (email: string) => setAuth({ user: { ...INITIAL_USER, email }, isAuthenticated: true });
  const logout = () => setAuth({ user: null, isAuthenticated: false });
  const rechargeWallet = (amount: number) => processTransaction('recarga', amount, 'Recarga de Saldo');

  const addAd = (newAd: Omit<Ad, 'id' | 'createdAt' | 'userId' | 'userName'>) => {
    if (!auth.user) return;
    const ad: Ad = { ...newAd, id: Math.random().toString(36).substr(2, 9), userId: auth.user.id, userName: auth.user.name, createdAt: new Date().toISOString() };
    setAds(prev => [ad, ...prev]);
  };

  const removeAd = (id: string) => setAds(prev => prev.filter(ad => ad.id !== id));

  const sendMessage = (conversationId: string, text: string) => {
    setConversations(prev => prev.map(conv => conv.id === conversationId ? { ...conv, lastMessage: text, messages: [...conv.messages, { id: Math.random().toString(36).substr(2, 9), senderId: auth.user!.id, text, timestamp: new Date().toISOString() }] } : conv));
  };

  return React.createElement(PermuteiContext.Provider, { 
    value: { ads, conversations, auth, platformStats, login, logout, addAd, removeAd, highlightAd, sendMessage, rechargeWallet, toggleFavorite, subscribePro, processTransaction } 
  }, children);
};

export function usePermuteiStore() {
  const context = useContext(PermuteiContext);
  if (!context) throw new Error('usePermuteiStore must be used within a PermuteiProvider');
  return context;
}
