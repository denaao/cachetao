# 🚀 Guia de Deploy - Render.com

## Passo-a-passo para coloca em produção na web

### ✅ Pré-requisitos
- [ ] Código no GitHub
- [ ] Conta no Render.com (grátis em https://render.com)

---

## 1️⃣ Preparar o Repositório GitHub

### 1.1 Inicialize Git
```bash
cd c:\Users\Denis\OneDrive\Desktop\Cachetao
git init
git add .
git commit -m "Initial commit: Cachetão scoring system"
```

### 1.2 Crie repositório no GitHub
1. Acesse https://github.com/new
2. Nome: `cachetao`
3. Descrição: "Sistema de pontuação para Cachetão"
4. Leave the repository public or private (sua escolha)
5. Click "Create repository"

### 1.3 Envie seu código
Copie os comandos mostrados no GitHub (similar a):
```bash
git remote add origin https://github.com/SEU-USUARIO/cachetao.git
git branch -M main
git push -u origin main
```

---

## 2️⃣ Deploy no Render

### 2.1 Acesse Render Dashboard
1. Login em https://render.com
2. Clique em **"New +"** no canto superior esquerdo
3. Selecione **"Blueprint"**

### 2.2 Conecte seu repositório
1. Selecione seu repositório `cachetao`
2. Render irá detectar o arquivo `render.yaml`
3. Revise as configurações:
   - **cachetao-backend**: Node.js server
   - **cachetao-frontend**: React static site

### 2.3 Aguarde o Deploy
- Render instalará dependências
- Compilará o frontend
- Iniciará o backend
- Isso leva ~5-10 minutos

### 2.4 Copie as URLs
Após sucesso, você verá:
- Backend URL: `https://cachetao-backend.onrender.com`
- Frontend URL: `https://seu-repo-cachetao-frontend.onrender.com`

---

## 3️⃣ Configuração Adicional (Opcional)

### Variáveis de Ambiente
Se precisar adicionar variáveis:

1. **Para Backend**:
   - Dashboard → cachetao-backend → Settings → Environment
   - Adicione:
     ```
     NODE_ENV = production
     PORT = 10000
     FRONTEND_URL = https://seu-repo-cachetao-frontend.onrender.com
     ```

2. **Para Frontend**:
   - Dashboard → cachetao-frontend → Settings → Build & Deploy
   - Build Command: `npm install && npm run build`
   - Start Command: `npm install && npm start`
   - Adicione env var:
     ```
     VITE_API_URL = https://cachetao-backend.onrender.com
     ```

---

## 4️⃣ Testando em Produção

1. Acesse a URL do frontend
2. Crie um novo jogo
3. Verifique se a comunicação WebSocket está funcionando
4. Clique em "Mostrar na TV" para testar o display

---

## 🔄 Atualizando Código

Após fazer mudanças locais:

```bash
git add .
git commit -m "Descrição das mudanças"
git push origin main
```

Render fará o deploy automaticamente!

---

## ⚠️ Solução de Problemas

### Deploy falha na etapa de build
- Verifique se `render.yaml` está correto
- Confira logs do Render em "Logs"
- Garanta que `package.json` em ambas pastas tem dependências corretas

### Frontend não conecta ao backend
- Verifique CORS no `server.js`
- Certifique-se que `VITE_API_URL` aponta para backend correto
- Reconstrua frontend (`npm run build`)

### WebSocket não funciona
- Render suporta WebSocket nativamente
- Verifique Console do navegador por erros
- Recrie o serviço se necessário

### Jogo não salva progresso
- Dados estão em memória (não há persistência)
- Para adicionar banco de dados, configure PostgreSQL no Render

---

## 💡 Dicas Importantes

1. **Free tier no Render**: Muito bom para começar!
   - Servidor web: até 750h/mês grátis
   - Vai dormir após 15 min de inatividade (normal no free)
   - Acordará quando receber requisições

2. **Para manter desperto** (pago):
   - Upgrade para Starter Plan ($7/mês)
   - Server nunca dorme

3. **Monitor de Performance**:
   - Dashboard → Metrics
   - Acompanhe CPU, memória e requisições

---

## 🎉 Você está online!

Seu Cachetão está acessível globalmente! Compartilhe a URL com amigos e comece a jogar remotamente!

---

**Dúvidas?** Verifique a docs do Render: https://render.com/docs
