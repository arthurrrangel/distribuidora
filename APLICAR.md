# Como aplicar este pacote no repo da Repon

Este pacote substitui completamente o site atual da Repon por uma fachada institucional sóbria, sem Shopify, sem e-commerce, sem catálogo dinâmico. Pensado para abrir porta com fornecedor.

## O que muda

**Removido (não existe mais):**
- Integração com Shopify (Storefront + Admin API)
- Carrinho, checkout, login de cliente
- Catálogo dinâmico com produtos
- Páginas de produto, departamento, busca
- Variáveis de ambiente `NEXT_PUBLIC_SHOPIFY_*` e `SHOPIFY_ADMIN_TOKEN`

**Adicionado:**
- 5 páginas estáticas institucionais: `/`, `/sobre`, `/verticais`, `/fornecedores`, `/contato`
- Identidade visual editorial B2B (paleta navy + paper + accent copper, IBM Plex Serif + Inter Tight)
- Mapa SVG de cobertura Sudeste + Sul
- Formulário institucional (abre mailto, sem backend)
- JSON-LD `Organization`, sitemap.xml, robots.txt, favicon.svg
- Todos os dados institucionais centralizados em `src/lib/site.ts`

## Aplicação no repo GitHub `arthurrrangel/distribuidora`

### Caminho 1 — terminal local (recomendado)

```bash
# 1. Clone o repo (se ainda não tem local)
git clone https://github.com/arthurrrangel/distribuidora.git
cd distribuidora

# 2. Crie branch nova para a fachada
git checkout -b fachada-institucional

# 3. Delete o conteúdo antigo (mantenha .git!)
rm -rf src public
rm -f next.config.ts tsconfig.json package.json package-lock.json postcss.config.mjs eslint.config.mjs README.md DOCUMENTACAO.txt tailwind.config.js

# 4. Copie todo o conteúdo deste pacote para a raiz do repo
# (assumindo que você extraiu o zip em ~/Downloads/repon-fachada/)
cp -r ~/Downloads/repon-fachada/. .

# 5. Instale e teste localmente
npm install
npm run dev
# Abra http://localhost:3000

# 6. Quando estiver OK, comite e suba
git add -A
git commit -m "feat: site institucional v1 — fachada B2B com 5 páginas estáticas"
git push -u origin fachada-institucional

# 7. Na Vercel, faça merge na main (ou crie PR no GitHub)
```

### Caminho 2 — GitHub Web UI

1. Vá em https://github.com/arthurrrangel/distribuidora
2. Crie branch nova `fachada-institucional` pelo dropdown de branches
3. Delete (via UI) as pastas: `src/`, `public/` antigos
4. Delete os arquivos antigos: `next.config.ts`, `tsconfig.json`, `package.json`, `package-lock.json`, `postcss.config.mjs`, `eslint.config.mjs`, `tailwind.config.js`, `DOCUMENTACAO.txt`
5. Faça upload dos arquivos novos do pacote (botão "Add file" → "Upload files")
6. Commit direto na branch `fachada-institucional`
7. Abra PR para `main`, revise, faça merge
8. A Vercel vai redeploy automático

### Variáveis de ambiente na Vercel

**Remover** (não são mais usadas):
- `NEXT_PUBLIC_SHOPIFY_DOMAIN`
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`
- `SHOPIFY_ADMIN_TOKEN`

**Nenhuma nova é necessária.** O site funciona 100% estático.

## Atualização de dados institucionais

**Todos os dados estão em `src/lib/site.ts`.** Para mudar telefone, e-mail, endereço, CNPJ, verticais, descrições — edite somente esse arquivo. Não precisa mexer nas páginas.

## Próximos passos sugeridos (fora do escopo deste pacote)

1. **Configurar Google Workspace** no domínio `repondistribuidora.com` para os e-mails `comercial@` e `sac@` ficarem com cara profissional (não Gmail).
2. **Configurar WhatsApp Business** no número (21) 99594-6491 com saudação automática institucional.
3. **Produzir PDF de apresentação institucional** para enviar a fornecedor que entrar em contato pelo site. Esse PDF pesa mais do que o site na decisão da indústria.
4. **Escrever política de MAP formal** (1-2 páginas) para anexar ao PDF de apresentação.

Sem esses 4 passos, o site bonito vira fachada vazia quando o fornecedor entra em contato.

---

Pacote gerado em 22/05/2026. Stack: Next.js 16.1.3 + React 19.2.3 + Tailwind v4.1.18.
