import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { PostIt as PostItType, POST_IT_COLORS } from '@/types/canvas';
import { cn } from '@/lib/utils';

interface PostItProps {
  postIt: PostItType;
  onUpdate: (text: string) => void;
  onDelete: () => void;
  isDragging?: boolean;
}

export const PostIt = ({ postIt, onUpdate, onDelete, isDragging }: PostItProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(postIt.text);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (text !== postIt.text) {
      onUpdate(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setText(postIt.text);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: isDragging ? 0.95 : 1,
        boxShadow: isDragging 
          ? '0 10px 25px -5px rgba(0, 0, 0, 0.2)' 
          : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'relative w-[120px] h-[80px] rounded-md cursor-grab active:cursor-grabbing',
        'flex items-center justify-center p-2',
        'select-none'
      )}
      style={{ backgroundColor: POST_IT_COLORS[postIt.color] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !isDragging && setIsEditing(true)}
    >
      <AnimatePresence>
        {isHovered && !isEditing && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-md hover:bg-destructive/90 z-10"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <X className="w-3 h-3" />
          </motion.button>
        )}
      </AnimatePresence>

      {isEditing ? (
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 100))}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full h-full bg-transparent text-xs text-foreground resize-none outline-none text-center"
          maxLength={100}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <p className="text-xs text-foreground text-center break-words overflow-hidden line-clamp-4">
          {postIt.text || 'Clique para editar'}
        </p>
      )}
    </motion.div>
  );
};
