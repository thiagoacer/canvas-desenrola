

# Canvas Desenrola - Plano de Implementação

## Visão Geral
Ferramenta visual de diagnóstico empresarial com grid de 9 blocos e post-its digitais arrastáveis. Interface limpa, responsiva e intuitiva para empreendedores preencherem seu modelo de negócio.

---

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── canvas/
│   │   ├── CanvasBoard.tsx      (container principal do grid)
│   │   ├── CanvasBlock.tsx      (cada bloco individual)
│   │   └── PostIt.tsx           (card arrastável)
│   ├── layout/
│   │   ├── Header.tsx           (logo + nome do negócio + ações)
│   │   └── Footer.tsx           (créditos)
│   └── modals/
│       ├── HelpModal.tsx        (explicações contextuais)
│       └── ConfirmModal.tsx     (confirmação limpar tudo)
├── hooks/
│   └── useCanvasStore.ts        (Zustand store)
├── types/
│   └── canvas.ts                (interfaces TypeScript)
├── constants/
│   └── blocks.ts                (dados dos 9 blocos)
└── utils/
    └── storage.ts               (localStorage helpers)
```

---

## 🎯 Funcionalidades por Fase

### Fase 1: Estrutura Base
- **Header** com logo "des.negócio", campo editável para nome do negócio, botões de ação (Salvar, Exportar PDF - desabilitado, Limpar Tudo)
- **Footer** com texto de créditos
- **Grid 3x3** responsivo (desktop) que empilha em coluna única (mobile)
- **9 Blocos** com títulos e subtítulos conforme especificação

### Fase 2: Sistema de Post-its
- **Botão "+"** em cada bloco para adicionar post-it
- **Post-its** com cores variadas (amarelo, rosa, azul, verde)
- **Edição inline** do texto ao clicar
- **Limite de 8** post-its por bloco
- **Limite de 100** caracteres por texto
- **Botão "×"** para deletar (aparece no hover)
- **Estado vazio** com placeholder "Adicione seu primeiro post-it"

### Fase 3: Drag & Drop
- **Arrastar post-its** dentro do mesmo bloco usando Framer Motion
- **Animação de arrastar**: scale 0.95 + sombra elevada
- **Reordenação** visual dos post-its

### Fase 4: Sistema de Ajuda
- **Ícone "?"** em cada bloco
- **Modal** com explicação, exemplos e pergunta provocativa
- **Conteúdo** carregado do arquivo de constantes (você fornecerá os textos)
- **Fechar** com clique fora ou botão X

### Fase 5: Persistência e Ações
- **Auto-save** no localStorage a cada alteração
- **Carregar** canvas salvo ao abrir a aplicação
- **Botão Salvar** com toast de confirmação
- **Limpar Tudo** com modal de confirmação
- **Exportar PDF** preparado (botão desabilitado, pronto para implementação futura)

---

## 🎨 Design Visual

| Elemento | Especificação |
|----------|---------------|
| Background | `#F8FAFC` (cinza bem claro) |
| Blocos | Fundo branco, borda `2px dashed #CBD5E1` |
| Títulos | `font-bold text-slate-700` |
| Subtítulos | `text-sm text-slate-500 italic` |
| Post-its | 120×80px, cores variadas, `rounded-md`, sombra sutil |

### Cores dos Post-its
- 🟡 Amarelo: `#FEF3C7`
- 🩷 Rosa: `#FCE7F3`  
- 🔵 Azul: `#DBEAFE`
- 🟢 Verde: `#D1FAE5`

---

## ✨ Animações (Framer Motion)

| Ação | Animação |
|------|----------|
| Adicionar post-it | fade-in + scale 0.8→1 |
| Deletar post-it | fade-out + scale 1→0.8 |
| Arrastar | scale 0.95 + boxShadow elevada |
| Hover blocos | borda highlight sutil |

---

## 📱 Responsividade

| Breakpoint | Layout |
|------------|--------|
| Mobile (< 768px) | 1 coluna, scroll vertical |
| Tablet (768px+) | 2 colunas |
| Desktop (1024px+) | 3 colunas (layout completo) |

---

## 📦 Dependências a Adicionar
- `framer-motion` - animações e drag & drop
- `zustand` - gerenciamento de estado

---

## ⏳ Próximos Passos (Após Implementação)

1. **Você fornece** os textos de ajuda para cada bloco
2. **Implementação** do export PDF (quando necessário)
3. **Migração** para backend real (quando/se necessário)

