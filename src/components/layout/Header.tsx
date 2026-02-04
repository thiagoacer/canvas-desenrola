import { useState } from 'react';
import { Save, FileDown, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { useCanvasStore } from '@/hooks/useCanvasStore';
import { useToast } from '@/hooks/use-toast';

export const Header = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { businessName, setBusinessName, clearAll } = useCanvasStore();
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: 'Canvas salvo!',
      description: 'Seu canvas foi salvo com sucesso.',
    });
  };

  const handleClearAll = () => {
    clearAll();
    setShowConfirmModal(false);
    toast({
      title: 'Canvas limpo',
      description: 'Todos os post-its foram removidos.',
    });
  };

  return (
    <>
      <header className="bg-card border-b border-border px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-primary">
              des.<span className="text-muted-foreground">negócio</span>
            </h1>
          </div>

          {/* Nome do Negócio */}
          <div className="flex-1 flex items-center gap-2 w-full sm:w-auto">
            <label htmlFor="business-name" className="text-sm text-muted-foreground whitespace-nowrap">
              Nome do Negócio:
            </label>
            <Input
              id="business-name"
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Digite o nome do seu negócio"
              className="max-w-xs"
            />
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-1" />
              Salvar
            </Button>
            <Button variant="outline" size="sm" disabled>
              <FileDown className="w-4 h-4 mr-1" />
              Exportar PDF
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowConfirmModal(true)}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Limpar Tudo
            </Button>
          </div>
        </div>
      </header>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleClearAll}
        title="Limpar Canvas"
        description="Tem certeza que deseja limpar todo o canvas? Esta ação não pode ser desfeita."
      />
    </>
  );
};
