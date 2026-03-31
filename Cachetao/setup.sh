#!/bin/bash
# Script para instalar e rodar Cachetão

echo "🎴 Cachetão - Sistema de Pontuação"
echo "=================================="
echo ""

# Verifica Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado!"
    echo "📥 Visite https://nodejs.org e instale a versão LTS"
    exit 1
fi

echo "✅ Node.js $(node --version) detectado"
echo ""

# Instala servidor
echo "📦 Instalando dependências do servidor..."
cd server
npm install
echo "✅ Servidor pronto!"
echo ""

# Instala cliente
echo "📦 Instalando dependências do cliente..."
cd ../client
npm install
echo "✅ Cliente pronto!"
echo ""

echo "=================================="
echo "🚀 Para iniciar, execute em dois terminais:"
echo ""
echo "Terminal 1:"
echo "  cd server && npm run dev"
echo ""
echo "Terminal 2:"
echo "  cd client && npm run dev"
echo ""
echo "Depois acesse: http://localhost:3000"
echo "=================================="
