import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { BlockDefinition } from '@/constants/blocks';

interface HelpModalProps {
  block: BlockDefinition | null;
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal = ({ block, isOpen, onClose }: HelpModalProps) => {
  if (!block) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary">{block.title}</DialogTitle>
          <DialogDescription className="italic">
            {block.subtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Explicação */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-1">
              O que é?
            </h4>
            <p className="text-sm text-muted-foreground">
              {block.helpContent.explanation}
            </p>
          </div>

          {/* Exemplos */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-1">
              Exemplos
            </h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {block.helpContent.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>

          {/* Pergunta Provocativa */}
          <div className="bg-accent/50 rounded-lg p-3">
            <h4 className="font-semibold text-sm text-foreground mb-1">
              Reflita:
            </h4>
            <p className="text-sm text-accent-foreground italic">
              "{block.helpContent.question}"
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
