# 🔗 Integração com API - Canvas Desenrola

## ✅ O Que Foi Implementado

### 1. Cliente HTTP (src/lib/api.ts)
- Cliente Axios configurado
- Interceptors para JWT automático
- Tratamento de erros 401 (logout automático)
- Suporte a variáveis de ambiente

### 2. Contexto de Autenticação (src/contexts/AuthContext.tsx)
- Provider React Context
- Gerenciamento de estado do usuário
- Login/Register/Logout
- Persistência em localStorage

### 3. Tipos TypeScript
- `src/types/auth.ts` - Tipos de autenticação
- `src/types/api.ts` - Tipos da API do Canvas

### 4. Hook Personalizado (src/hooks/useCanvasAPI.ts)
- Métodos para todas operações da API:
  - `createCanvas()` - Criar novo canvas
  - `listCanvases()` - Listar todos canvas
  - `getCanvas()` - Buscar canvas específico
  - `updateCanvas()` - Atualizar nome do negócio
  - `deleteCanvas()` - Deletar canvas
  - `createPostIt()` - Criar post-it
  - `updatePostIt()` - Atualizar post-it
  - `deletePostIt()` - Deletar post-it
  - `reorderPostIts()` - Reordenar post-its
  - `exportCanvasPDF()` - Exportar PDF

### 5. App.tsx Atualizado
- `AuthProvider` envolvendo toda aplicação
- Contexto de autenticação disponível globalmente

---

## 🔧 Como Configurar

### 1. Configurar URL da API

**Em desenvolvimento (localhost):**
```bash
# Não precisa fazer nada, usa localhost:3333 automaticamente
```

**Em produção (Vercel):**

1. Acesse https://vercel.com/seu-projeto
2. Vá em **Settings** → **Environment Variables**
3. Adicione:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://seu-projeto.railway.app/api`
4. Redeploy o projeto

### 2. Como Usar no Código

#### Autenticação

```tsx
import { useAuth } from '@/contexts/AuthContext';

function LoginPage() {
  const { login, isAuthenticated, user } = useAuth();

  const handleLogin = async () => {
    try {
      await login({
        email: 'teste@desenrola.com',
        password: 'senha123'
      });
      // Redirecionar após login
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Bem-vindo, {user?.name}!</p>
      ) : (
        <button onClick={handleLogin}>Fazer Login</button>
      )}
    </div>
  );
}
```

#### Canvas Operations

```tsx
import { useCanvasAPI } from '@/hooks/useCanvasAPI';

function CanvasPage() {
  const { createCanvas, getCanvas, loading, error } = useCanvasAPI();

  const handleCreateCanvas = async () => {
    try {
      const canvas = await createCanvas({
        businessName: 'Minha Startup'
      });
      console.log('Canvas criado:', canvas);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      <button onClick={handleCreateCanvas}>Criar Canvas</button>
    </div>
  );
}
```

#### Criar Post-it

```tsx
const { createPostIt } = useCanvasAPI();

const handleAddPostIt = async () => {
  try {
    await createPostIt(canvasId, 'atividades-principais', {
      text: 'Desenvolvimento de software',
      color: 'yellow'
    });
  } catch (error) {
    console.error('Erro:', error);
  }
};
```

---

## 🎨 Adaptar useCanvasStore (Opcional)

O `useCanvasStore.ts` atual usa localStorage. Você pode:

### Opção 1: Manter localStorage (Offline-first)
Continuar usando como está. Bom para trabalhar offline.

### Opção 2: Híbrido (Recomendado)
- Salvar no localStorage para UX rápida
- Sincronizar com API em background
- Usar SWR ou React Query para cache

### Opção 3: Só API (Online-only)
Substituir completamente o Zustand store pela API.

---

## 📋 Checklist de Integração

### Back-end (API)
- [x] Deploy no Railway
- [x] PostgreSQL configurado
- [x] Tabelas criadas
- [x] Seed executado
- [ ] CORS_ORIGIN atualizado com URL do Vercel
- [ ] Testar todos endpoints

### Front-end
- [x] Axios instalado
- [x] Cliente API criado
- [x] AuthContext implementado
- [x] useCanvasAPI criado
- [x] AuthProvider no App.tsx
- [ ] VITE_API_URL configurada no Vercel
- [ ] Criar páginas de Login/Register
- [ ] Atualizar componentes para usar API
- [ ] Redeploy no Vercel

---

## 🚀 Próximos Passos

### 1. Configurar CORS no Back-end

No Railway, atualize a variável de ambiente:
```env
CORS_ORIGIN=https://canvas-desenrola.vercel.app
```

### 2. Configurar API URL no Vercel

```env
VITE_API_URL=https://seu-projeto.railway.app/api
```

### 3. Criar Páginas de Autenticação

Você precisa criar:
- `src/pages/Login.tsx`
- `src/pages/Register.tsx`

Ou integrar autenticação na página existente.

### 4. Atualizar Componentes

Modificar componentes atuais para usar `useCanvasAPI()` ao invés de `useCanvasStore()`.

### 5. Testar Integração

```bash
# Testar login
curl -X POST https://seu-projeto.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@desenrola.com","password":"senha123"}'

# Testar canvas (com token)
curl -X GET https://seu-projeto.railway.app/api/canvases \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 🆘 Troubleshooting

### Erro: "Network Error"
- Verifique se a API está rodando
- Verifique CORS no backend
- Verifique VITE_API_URL no front

### Erro: "401 Unauthorized"
- Token expirado ou inválido
- Limpe localStorage e faça login novamente
- Verifique JWT_SECRET no backend

### Erro: "Cannot read property 'user'"
- AuthProvider não está envolvendo o componente
- Verifique se App.tsx tem o AuthProvider

---

## 📚 Documentação da API

Ver arquivo `README.md` no projeto `canvas-desenrola-api` para documentação completa de todos os endpoints.

---

**Status**: ✅ Integração Base Implementada

**Falta**: Criar páginas de autenticação e atualizar componentes existentes
