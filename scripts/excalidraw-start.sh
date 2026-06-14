#!/usr/bin/env bash
# Sobe o canvas do Excalidraw MCP em background.
# Uso: ./scripts/excalidraw-start.sh
set -euo pipefail

# Caminho do repositorio do servidor MCP e porta do canvas
EXCALIDRAW_REPO="${EXCALIDRAW_REPO:-/Users/glaucco.morais/Claude/tools/mcp_excalidraw}"
PORT="${PORT:-3000}"

# Arquivos de controle ficam dentro deste projeto (na pasta scripts/)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$SCRIPT_DIR/.excalidraw.pid"
LOG_FILE="$SCRIPT_DIR/.excalidraw.log"

# Ja esta rodando?
if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  echo "Canvas ja esta rodando (PID $(cat "$PID_FILE")) em http://127.0.0.1:$PORT"
  exit 0
fi

if [ ! -f "$EXCALIDRAW_REPO/dist/index.js" ]; then
  echo "ERRO: nao encontrei o build em $EXCALIDRAW_REPO/dist/index.js"
  echo "Rode 'npm install && npm run build' dentro de $EXCALIDRAW_REPO primeiro."
  exit 1
fi

echo "Subindo canvas na porta $PORT (repo: $EXCALIDRAW_REPO)..."
cd "$EXCALIDRAW_REPO"
PORT="$PORT" nohup npm run canvas > "$LOG_FILE" 2>&1 &
echo $! > "$PID_FILE"

sleep 2
if kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  echo "OK: canvas no ar em http://127.0.0.1:$PORT (PID $(cat "$PID_FILE"))"
  echo "Logs: $LOG_FILE"
else
  echo "ERRO ao subir o canvas. Veja os logs em $LOG_FILE:"
  tail -n 20 "$LOG_FILE" || true
  rm -f "$PID_FILE"
  exit 1
fi
