@echo off
REM Script para instalar e rodar Cachetão no Windows

echo.
echo 🎴 Cachetão - Sistema de Pontuação
echo ==================================
echo.

REM Verifica Node.js
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js não está instalado!
    echo 📥 Visite https://nodejs.org e instale a versão LTS
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% detectado
echo.

REM Instala servidor
echo 📦 Instalando dependências do servidor...
cd server
call npm install
echo ✅ Servidor pronto!
echo.

REM Instala cliente  
echo 📦 Instalando dependências do cliente...
cd ..\client
call npm install
echo ✅ Cliente pronto!
echo.

echo ==================================
echo 🚀 Para iniciar, execute em dois terminais:
echo.
echo Terminal 1:
echo   cd server ^&^& npm run dev
echo.
echo Terminal 2:
echo   cd client ^&^& npm run dev
echo.
echo Depois acesse: http://localhost:3000
echo ==================================
echo.
pause
