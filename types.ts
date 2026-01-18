
export type AdType = 'produto' | 'serviço';
export type DealType = 'troca' | 'venda' | 'ambos';

export interface Ad {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  price?: number;
  type: AdType;
  dealType: DealType;
  category: string;
  image: string;
  createdAt: string;
  isHighlighted?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  walletBalance: number;
  favoriteIds: string[];
  isPro?: boolean;
  subscriptionExpires?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: 'taxa_servico' | 'assinatura' | 'destaque' | 'venda' | 'recarga';
  amount: number;
  description: string;
  date: string;
}

export interface PlatformStats {
  totalRevenue: number;
  feesCollected: number;
  subscriptionRevenue: number;
  highlightRevenue: number;
  transactions: Transaction[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  unreadCount: number;
  messages: Message[];
}

export interface Proposal {
  id: string;
  adId: string;
  offeredType: AdType;
  offeredTitle: string;
  offeredDescription: string;
  cashAdjustment?: number;
  status: 'pending' | 'accepted' | 'rejected';
}
