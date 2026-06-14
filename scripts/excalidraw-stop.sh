#!/usr/bin/env bash
# Para o canvas do Excalidraw MCP iniciado pelo excalidraw-start.sh.
# Uso: ./scripts/excalidraw-stop.sh
set -euo pipefail

PORT="${PORT:-3000}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$SCRIPT_DIR/.excalidraw.pid"

stopped=0

# 1. Tenta pelo PID salvo (e filhos do processo npm)
if [ -f "$PID_FILE" ]; then
  PID="$(cat "$PID_FILE")"
  if kill -0 "$PID" 2>/dev/null; then
    # mata o grupo de processos (npm + node filho)
    kill "$PID" 2>/dev/null || true
    pkill -P "$PID" 2>/dev/null || true
    echo "Canvas parado (PID $PID)."
    stopped=1
  fi
  rm -f "$PID_FILE"
fi

# 2. Fallback: qualquer processo ainda preso na porta
if command -v lsof >/dev/null 2>&1; then
  PORT_PIDS="$(lsof -ti tcp:"$PORT" 2>/dev/null || true)"
  if [ -n "$PORT_PIDS" ]; then
    echo "$PORT_PIDS" | xargs kill 2>/dev/null || true
    echo "Processos restantes na porta $PORT encerrados."
    stopped=1
  fi
fi

if [ "$stopped" -eq 0 ]; then
  echo "Nada rodando na porta $PORT."
fi
