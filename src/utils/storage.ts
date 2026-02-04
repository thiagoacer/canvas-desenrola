import { PostIt } from '@/types/canvas';
import { BLOCK_IDS } from '@/constants/blocks';

const STORAGE_KEY = 'canvas-desenrola';

export interface StoredCanvasData {
  businessName: string;
  blocks: Record<string, PostIt[]>;
}

export const getInitialBlocks = (): Record<string, PostIt[]> => {
  return BLOCK_IDS.reduce((acc, blockId) => {
    acc[blockId] = [];
    return acc;
  }, {} as Record<string, PostIt[]>);
};

export const saveToStorage = (data: StoredCanvasData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
  }
};

export const loadFromStorage = (): StoredCanvasData | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Erro ao carregar do localStorage:', error);
  }
  return null;
};

export const clearStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar localStorage:', error);
  }
};
