import { useState } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { Plus, HelpCircle } from 'lucide-react';
import { PostIt } from './PostIt';
import { PostIt as PostItType, POST_IT_COLOR_ARRAY, PostItColor } from '@/types/canvas';
import { BlockDefinition } from '@/constants/blocks';
import { useCanvasStore } from '@/hooks/useCanvasStore';
import { cn } from '@/lib/utils';

interface CanvasBlockProps {
  block: BlockDefinition;
  postIts: PostItType[];
  onOpenHelp: () => void;
}

export const CanvasBlock = ({ block, postIts, onOpenHelp }: CanvasBlockProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addPostIt, updatePostIt, deletePostIt, reorderPostIts } = useCanvasStore();

  const handleAddPostIt = () => {
    if (postIts.length >= 8) return;

    const colorIndex = postIts.length % POST_IT_COLOR_ARRAY.length;
    const newPostIt: PostItType = {
      id: `${block.id}-${Date.now()}`,
      text: '',
      color: POST_IT_COLOR_ARRAY[colorIndex],
    };
    addPostIt(block.id, newPostIt);
  };

  const handleReorder = (newOrder: PostItType[]) => {
    reorderPostIts(block.id, newOrder);
  };

  return (
    <motion.div
      className={cn(
        'bg-card rounded-lg p-4 min-h-[200px] flex flex-col',
        'border-2 border-dashed border-canvas-block-border',
        'transition-colors duration-200',
        isHovered && 'border-canvas-block-border-hover'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header do Bloco */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-foreground text-sm leading-tight">
            {block.title}
          </h3>
          <p className="text-xs text-muted-foreground italic mt-0.5">
            {block.subtitle}
          </p>
        </div>
        <button
          onClick={onOpenHelp}
          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Ajuda"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>

      {/* Área de Post-its */}
      <div className="flex-1 flex flex-col">
        {postIts.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xs text-muted-foreground text-center">
              Adicione seu primeiro post-it
            </p>
          </div>
        ) : (
          <Reorder.Group
            axis="y"
            values={postIts}
            onReorder={handleReorder}
            className="flex flex-wrap gap-2 justify-center"
          >
            <AnimatePresence mode="popLayout">
              {postIts.map((postIt) => (
                <Reorder.Item
                  key={postIt.id}
                  value={postIt}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <PostIt
                    postIt={postIt}
                    onUpdate={(text) => updatePostIt(block.id, postIt.id, text)}
                    onDelete={() => deletePostIt(block.id, postIt.id)}
                  />
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        )}
      </div>

      {/* Botão Adicionar */}
      <div className="mt-3 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddPostIt}
          disabled={postIts.length >= 8}
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center',
            'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground',
            'transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          aria-label="Adicionar post-it"
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};
