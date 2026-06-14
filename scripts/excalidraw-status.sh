#!/usr/bin/env bash
# Mostra se o canvas do Excalidraw MCP esta no ar.
# Uso: ./scripts/excalidraw-status.sh
set -euo pipefail

PORT="${PORT:-3000}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$SCRIPT_DIR/.excalidraw.pid"
URL="http://127.0.0.1:$PORT"

# Processo vivo pelo PID salvo?
if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  echo "Processo:  rodando (PID $(cat "$PID_FILE"))"
else
  echo "Processo:  sem PID registrado por este script"
fi

# Porta respondendo?
if command -v curl >/dev/null 2>&1; then
  CODE="$(curl -s -o /dev/null -w "%{http_code}" "$URL" 2>/dev/null || echo "000")"
  if [ "$CODE" = "200" ]; then
    echo "Canvas:    no ar em $URL (HTTP $CODE)"
  else
    echo "Canvas:    nao respondeu em $URL (HTTP $CODE)"
  fi
fi
