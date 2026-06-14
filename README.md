# 31 — Claude Dashboard

Workspace para construir **dashboards de dados** em HTML estático, usando o Claude Code. O projeto reúne três coisas:

1. **Dados** (`dataset/`) — CSVs de e-commerce a serem visualizados.
2. **Design de referência** (`design-system/`) — uma página pronta que define a linguagem visual (tema escuro, cards "glass", grid responsivo) a ser replicada nos dashboards.
3. **Integração com Excalidraw** (`scripts/`) — scripts para subir/parar o canvas do servidor MCP do Excalidraw, que permite ao Claude desenhar diagramas.

Não há build system nem gerenciador de pacotes no projeto: os dashboards são HTML estático, e o Tailwind é compilado no navegador em tempo de execução.

---

## Estrutura de arquivos

```
31_claude_dashboard/
├── README.md                 # este arquivo
├── CLAUDE.md                 # guia para o Claude Code operar neste repo
├── .gitignore
├── dataset/                  # dados (CSV)
│   ├── orders.csv            # ~25k linhas — grão de item de pedido
│   ├── customers.csv         # ~8k linhas — um registro por cliente
│   ├── monthly_revenue.csv   # 76 linhas — série mensal pré-agregada
│   └── product_summary.csv   # 141 linhas — resumo por produto
├── design-system/            # design de referência (NÃO é dado real)
│   ├── index.html            # página "Aurora Garden Control" (style guide)
│   └── assets/               # Tailwind runtime, ícones, fontes, imagens (vendados)
└── scripts/                  # controle do canvas do Excalidraw MCP
    ├── excalidraw-start.sh
    ├── excalidraw-status.sh
    └── excalidraw-stop.sh
```

---

## Dados (`dataset/`)

CSVs de e-commerce, todos com cabeçalho. Prefira as tabelas **pré-agregadas** para gráficos de tendência/resumo e derive de `orders`/`customers` só quando precisar de um corte que ainda não existe.

| Arquivo | Grão | Conteúdo |
|---|---|---|
| `orders.csv` | item de pedido (~25k) | ids, data (ano/mês/trimestre/dia), produto, categoria, preços, desconto, frete, imposto, totais, pagamento, dispositivo, entrega, status, devolução, avaliação, métricas de sessão |
| `customers.csv` | cliente (~8k) | demografia, membership, totais, campos tipo RFM, preferências, canal de aquisição, newsletter, churn |
| `monthly_revenue.csv` | mês (76) | pedidos, receita, ticket médio, desconto, taxa de devolução, clientes |
| `product_summary.csv` | produto (141) | pedidos, receita, preço/nota média, taxas de devolução/desconto, dias de entrega |

> `orders.csv` é grande — amostre ou agregue em vez de carregar inteiro no contexto.

---

## Design de referência (`design-system/`)

`design-system/index.html` é uma página autocontida ("Aurora Garden Control") usada como **guia de estilo**, não como dados reais. Tudo é carregado de `design-system/assets/` (sem CDN em runtime):

- **Tailwind** compilado no navegador (`resource_*.js` é o runtime do Tailwind — não há CSS pré-construído).
- **Ícones** Iconify (conjunto Solar, `data-icon="solar:..."`) e Lucide.
- **Fontes** Google vendadas localmente, cada uma como classe `.font-*`.
- **Fundo animado** via UnicornStudio.

Convenções visuais a replicar: base escura (`bg-neutral-950 text-white`), grid responsivo de 12 colunas, cards "glass" (`bg-gradient-to-br from-white/10 to-white/0 rounded-3xl backdrop-blur-lg` com borda em gradiente) e cards de destaque com cores sólidas saturadas.

### Pré-visualizar

Sem build. Sirva a pasta para os caminhos relativos resolverem:

```bash
python3 -m http.server 8000
# abra http://localhost:8000/design-system/
```

---

## Excalidraw MCP (`scripts/`)

O Claude desenha diagramas no Excalidraw através de um servidor MCP que renderiza num canvas ao vivo. O servidor fica num repositório **separado** (`~/Claude/tools/mcp_excalidraw`) e estes scripts controlam o canvas.

| Comando | O que faz |
|---|---|
| `./scripts/excalidraw-start.sh` | sobe o canvas em background na porta 3000 |
| `./scripts/excalidraw-status.sh` | mostra se o processo e a porta estão no ar |
| `./scripts/excalidraw-stop.sh` | para o canvas |

Os scripts gravam dois arquivos de controle (ignorados pelo git): `scripts/.excalidraw.pid` (PID do processo) e `scripts/.excalidraw.log` (logs do canvas).

#### Detalhes de cada script

**`excalidraw-start.sh`**
- Verifica se já há um canvas rodando (pelo PID salvo) e, se houver, não sobe outro.
- Confere se o build do servidor existe (`$EXCALIDRAW_REPO/dist/index.js`); se não, orienta a rodar `npm install && npm run build`.
- Sobe `npm run canvas` em background com `nohup`, então o terminal fica livre e o processo sobrevive ao fechar a aba.
- Salva o PID em `.excalidraw.pid` e redireciona a saída para `.excalidraw.log`.
- Aguarda alguns segundos e confirma se subiu; em caso de erro, mostra o fim do log.

**`excalidraw-status.sh`**
- Verifica se o processo do PID salvo está vivo.
- Faz uma requisição em `http://127.0.0.1:$PORT` e reporta o código HTTP (200 = no ar).
- As duas linhas batendo significam que o canvas está rodando *pelos scripts* e respondendo.

**`excalidraw-stop.sh`**
- Mata o processo pelo PID salvo (e o `node` filho do `npm`), depois remove o `.excalidraw.pid`.
- Como rede de segurança, encerra qualquer processo ainda preso na porta via `lsof` — útil para parar um canvas iniciado manualmente, fora dos scripts.
- Se não houver nada na porta, apenas avisa.

Variáveis opcionais:
- `EXCALIDRAW_REPO` — caminho do repositório do servidor (padrão: `/Users/glaucco.morais/Claude/tools/mcp_excalidraw`).
- `PORT` — porta do canvas (padrão: `3000`).

```bash
# exemplo com porta e repo customizados
EXCALIDRAW_REPO=/outro/caminho PORT=3001 ./scripts/excalidraw-start.sh
```

### Como usar com o Claude

1. **Suba o canvas:** `./scripts/excalidraw-start.sh` (abra `http://127.0.0.1:3000` no navegador para ver).
2. **Registre o servidor MCP no Claude Code** (uma vez só):
   ```bash
   claude mcp add excalidraw --scope user \
     -e EXPRESS_SERVER_URL=http://127.0.0.1:3000 \
     -e ENABLE_CANVAS_SYNC=true \
     -- node /Users/glaucco.morais/Claude/tools/mcp_excalidraw/dist/index.js
   ```
   Confira com `claude mcp list`.
3. **Recarregue a janela do VSCode** para o Claude Code carregar o servidor MCP.
4. Peça um diagrama em linguagem natural — ele aparece no canvas.

> O servidor MCP é um projeto **da comunidade** ([yctimlin/mcp_excalidraw](https://github.com/yctimlin/mcp_excalidraw)), não oficial do Excalidraw nem da Anthropic.

### Pré-requisitos do servidor (uma vez)

```bash
cd ~/Claude/tools
git clone https://github.com/yctimlin/mcp_excalidraw.git
cd mcp_excalidraw
npm install && npm run build
```
