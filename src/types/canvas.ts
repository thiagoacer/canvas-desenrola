export interface PostIt {
  id: string;
  text: string;
  color: PostItColor;
}

export type PostItColor = 'yellow' | 'pink' | 'blue' | 'green';

export interface CanvasBlock {
  id: string;
  title: string;
  subtitle: string;
  postIts: PostIt[];
  helpContent: BlockHelpContent;
}

export interface BlockHelpContent {
  explanation: string;
  examples: string[];
  question: string;
}

export interface CanvasState {
  businessName: string;
  blocks: Record<string, PostIt[]>;
  setBusinessName: (name: string) => void;
  addPostIt: (blockId: string, postIt: PostIt) => void;
  updatePostIt: (blockId: string, postItId: string, text: string) => void;
  deletePostIt: (blockId: string, postItId: string) => void;
  reorderPostIts: (blockId: string, postIts: PostIt[]) => void;
  clearAll: () => void;
  loadFromStorage: () => void;
}

export const POST_IT_COLORS: Record<PostItColor, string> = {
  yellow: '#FEF3C7',
  pink: '#FCE7F3',
  blue: '#DBEAFE',
  green: '#D1FAE5',
};

export const POST_IT_COLOR_ARRAY: PostItColor[] = ['yellow', 'pink', 'blue', 'green'];
