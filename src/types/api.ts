import { PostIt, PostItColor } from './canvas';

// Tipos da API que vêm do backend
export interface ApiPostIt {
  id: string;
  text: string; // API retorna "text" por compatibilidade
  color: PostItColor;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiBlock {
  id: string;
  type: string; // kebab-case: "atividades-principais", etc
  postIts: ApiPostIt[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiCanvas {
  id: string;
  businessName: string;
  userId: string;
  blocks: ApiBlock[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCanvasRequest {
  businessName: string;
}

export interface UpdateCanvasRequest {
  businessName?: string;
}

export interface CreatePostItRequest {
  text: string;
  color: PostItColor;
}

export interface UpdatePostItRequest {
  text?: string;
  color?: PostItColor;
}

export interface ReorderPostItsRequest {
  postIts: Array<{
    id: string;
    order: number;
  }>;
}

export interface ListCanvasResponse {
  data: Array<{
    id: string;
    businessName: string;
    createdAt: string;
    updatedAt: string;
  }>;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
