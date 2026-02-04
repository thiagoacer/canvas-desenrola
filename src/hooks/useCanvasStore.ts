import { create } from 'zustand';
import { PostIt, CanvasState } from '@/types/canvas';
import { getInitialBlocks, saveToStorage, loadFromStorage, clearStorage } from '@/utils/storage';

export const useCanvasStore = create<CanvasState>((set, get) => ({
  businessName: '',
  blocks: getInitialBlocks(),

  setBusinessName: (name: string) => {
    set({ businessName: name });
    const state = get();
    saveToStorage({ businessName: name, blocks: state.blocks });
  },

  addPostIt: (blockId: string, postIt: PostIt) => {
    set((state) => {
      const currentPostIts = state.blocks[blockId] || [];
      if (currentPostIts.length >= 8) {
        return state;
      }
      const newBlocks = {
        ...state.blocks,
        [blockId]: [...currentPostIts, postIt],
      };
      saveToStorage({ businessName: state.businessName, blocks: newBlocks });
      return { blocks: newBlocks };
    });
  },

  updatePostIt: (blockId: string, postItId: string, text: string) => {
    set((state) => {
      const currentPostIts = state.blocks[blockId] || [];
      const newPostIts = currentPostIts.map((p) =>
        p.id === postItId ? { ...p, text: text.slice(0, 100) } : p
      );
      const newBlocks = {
        ...state.blocks,
        [blockId]: newPostIts,
      };
      saveToStorage({ businessName: state.businessName, blocks: newBlocks });
      return { blocks: newBlocks };
    });
  },

  deletePostIt: (blockId: string, postItId: string) => {
    set((state) => {
      const currentPostIts = state.blocks[blockId] || [];
      const newPostIts = currentPostIts.filter((p) => p.id !== postItId);
      const newBlocks = {
        ...state.blocks,
        [blockId]: newPostIts,
      };
      saveToStorage({ businessName: state.businessName, blocks: newBlocks });
      return { blocks: newBlocks };
    });
  },

  reorderPostIts: (blockId: string, postIts: PostIt[]) => {
    set((state) => {
      const newBlocks = {
        ...state.blocks,
        [blockId]: postIts,
      };
      saveToStorage({ businessName: state.businessName, blocks: newBlocks });
      return { blocks: newBlocks };
    });
  },

  clearAll: () => {
    clearStorage();
    set({
      businessName: '',
      blocks: getInitialBlocks(),
    });
  },

  loadFromStorage: () => {
    const data = loadFromStorage();
    if (data) {
      set({
        businessName: data.businessName,
        blocks: { ...getInitialBlocks(), ...data.blocks },
      });
    }
  },
}));
