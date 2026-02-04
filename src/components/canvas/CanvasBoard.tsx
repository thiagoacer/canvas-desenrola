import { useState } from 'react';
import { CanvasBlock } from './CanvasBlock';
import { HelpModal } from '@/components/modals/HelpModal';
import { CANVAS_BLOCKS, BlockDefinition } from '@/constants/blocks';
import { useCanvasStore } from '@/hooks/useCanvasStore';

export const CanvasBoard = () => {
  const [selectedBlock, setSelectedBlock] = useState<BlockDefinition | null>(null);
  const { blocks } = useCanvasStore();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {CANVAS_BLOCKS.map((block) => (
          <CanvasBlock
            key={block.id}
            block={block}
            postIts={blocks[block.id] || []}
            onOpenHelp={() => setSelectedBlock(block)}
          />
        ))}
      </div>

      <HelpModal
        block={selectedBlock}
        isOpen={!!selectedBlock}
        onClose={() => setSelectedBlock(null)}
      />
    </>
  );
};
