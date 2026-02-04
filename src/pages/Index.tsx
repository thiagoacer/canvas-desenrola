import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CanvasBoard } from '@/components/canvas/CanvasBoard';
import { useCanvasStore } from '@/hooks/useCanvasStore';

const Index = () => {
  const { loadFromStorage } = useCanvasStore();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return (
    <div className="min-h-screen flex flex-col bg-canvas-background">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full">
        <CanvasBoard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
