# 🎴 Cachetão - Sistema de Pontuação em Tempo Real

Um sistema moderno para gerenciar partidas de Cachetão com placar em tempo real e display para TV!

## 📋 Características

- ✅ Suporte para 3-11 jogadores por partida
- ✅ Sistema de pontuação automático segundo as regras do Cachetão
- ✅ Placar em tempo real com WebSocket
- ✅ Display grande e responsivo para TV (Full Screen)
- ✅ Interface de controle intuitiva
- ✅ Histórico de rodadas
- ✅ Deploy fácil na web com Render

## 🎮 Regras do Jogo

- **Pontos Iniciais**: 10 pontos por jogador
- **Vencedor da rodada**: Mantém os pontos
- **Perdedor da rodada**: Perde 2 pontos
- **Outros jogadores**: Perdem 1 ponto cada
- **Vitória**: Quem sobrar vivo (com pontos > 0) vence

## 🚀 Como Começar Localmente

### Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn

### Instalação Local

1. **Clone ou extraia o projeto**
```bash
cd Cachetao
```

2. **Instale dependências do servidor**
```bash
cd server
npm install
```

3. **Instale dependências do cliente**
```bash
cd ../client
npm install
```

### Iniciar Localmente

**Terminal 1 - Servidor (Backend)**
```bash
cd server
npm run dev
```
O servidor rodará em: `http://localhost:3001`

**Terminal 2 - Cliente (Frontend)**
```bash
cd client
npm run dev
```
O cliente rodará em: `http://localhost:3000`

## 🌐 Deploy no Render (Recomendado)

### Pré-requisitos
1. Conta no GitHub (para sincronizar seu repositório)
2. Conta no Render.com (gratuita)

### Passo-a-passo

#### 1. Prepare o repositório
```bash
# Initialize git (se ainda não tiver)
git init
git add .
git commit -m "Initial commit: Cachetão"
```

#### 2. Envie para GitHub
1. Crie repositório em https://github.com/new
2. Copie os comandos e execute:
```bash
git remote add origin https://github.com/seu-usuario/cachetao.git
git branch -M main
git push -u origin main
```

#### 3. Deploy no Render
1. Acesse https://render.com e faça login
2. Clique em **"New +"** → **"Blueprint"**
3. Selecione seu repositório do GitHub
4. Render reconhecerá automaticamente o `render.yaml`
5. Clique em **"Deploy"**
6. Aguarde (cerca de 5-10 minutos)

#### 4. Obtenha as URLs
Após o deploy:
- **Backend**: `https://seu-nome-cachetao-backend.onrender.com`
- **Frontend**: `https://seu-nome-cachetao-frontend.onrender.com`

Copie a URL do backend e adicione ao frontend se necesário.

### Variáveis de Ambiente (Opcional)
Se precisar configurar variáveis:
1. Vá para o serviço no Render
2. **Settings** → **Environment Variables**
3. Adicione conforme necessário

## 🎯 Como Usar

### Tela de Controle
1. Digite os nomes dos jogadores (3-11)
2. Clique em "Começar Jogo"
3. Para cada rodada:
   - Selecione quem VENCEU
   - Selecione quem PERDEU
   - Clique em "Registrar Rodada"
4. Clique em "📺 Mostrar na TV" para exibir o placar em outra tela

### Display para TV
- Exibe um placar grande e legível
- Atualiza em tempo real
- Mostra os jogadores ordenados por pontos
- Ideal para exibir em uma Smart TV ou monitor grande

## 📁 Estrutura do Projeto

```
Cachetao/
├── server/                    # Backend Node.js
│   ├── src/
│   │   ├── server.js         # Servidor Express
│   │   ├── database.js       # Gerenciador de banco de dados
│   │   └── gameController.js # Lógica de jogo
│   └── package.json
│
├── client/                    # Frontend React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── GameSetup.jsx      # Tela de setup
│   │   │   ├── GameBoard.jsx      # Tela de controle
│   │   │   └── TVDisplay.jsx      # Display para TV
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── render.yaml                # Configuração de deploy Render
├── README.md                  # Este arquivo
└── setup.bat / setup.sh       # Scripts de instalação local
```

## 🔌 Comunicação em Tempo Real

O sistema usa **Socket.IO** para comunicação em tempo real entre o servidor e os clientes:

- **Evento `game-state`**: Emitido quando o estado do jogo muda
- **Evento `round-result`**: Enviado quando uma rodada é registrada
- **Evento `join-game`**: Conecta um cliente a um jogo específico

## 🛠️ Tecnologia Utilizada

- **Backend**: Node.js + Express
- **Frontend**: React + Vite
- **Real-time**: Socket.IO
- **Database**: In-memory (pode adicionar SQLite/PostgreSQL)
- **Styling**: CSS Puro (Responsivo)
- **Deploy**: Render.com

## 📱 Responsivo

O display de TV é totalmente responsivo:
- Desktop: Grade de múltiplas colunas
- Tablet: 2 colunas
- Mobile: 1 coluna

## 🐛 Troubleshooting

### Servidor não conecta localmente
- Verifique se o servidor está rodando em `http://localhost:3001`
- Verifique o console do servidor por erros

### Display não atualiza
- Verifique a conexão WebSocket (abra DevTools no navegador)
- Reinicie o servidor e o cliente

### Deploy no Render falhou
- Verifique se o GitHub está sincronizado
- Confira os logs no painel do Render
- Garanta que o `render.yaml` está no diretório raiz

## 🚀 Próximos Passos (Melhorias)

- [ ] Adicionar persistência com SQLite/PostgreSQL
- [ ] Sistema de elo/estatísticas entre partidas
- [ ] Temas customizáveis
- [ ] Suporte a múltiplas partidas simultâneas
- [ ] Sistema de backup automático
- [ ] Dashboard de estatísticas
- [ ] Dark mode

## 📝 Licença

Projeto aberto para uso pessoal e educacional.

---

Aproveite o jogo! 🎉
