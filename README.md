# Repon — Site institucional

Distribuidora atacadista B2B. Site institucional estático em Next.js 16 + React 19 + Tailwind v4. Sem backend, sem dependência de Shopify ou serviço externo.

## Páginas

- `/` — Home institucional
- `/sobre` — Quem somos, ficha jurídica, capacidade logística
- `/verticais` — As 4 verticais de atacado
- `/fornecedores` — Pitch institucional para indústrias e marcas
- `/contato` — Canais comerciais + formulário (abre mailto)

## Stack

- **Next.js 16** (App Router, SSG)
- **React 19**
- **Tailwind v4** (`@import "tailwindcss"` + `@theme`)
- **TypeScript** strict
- **Google Fonts**: IBM Plex Serif (display) + Inter Tight (sans) + JetBrains Mono

## Identidade

- Paleta institucional: paper (`#FAFAF7`) / ink (`#0B1220`) / accent (`#A3672E`)
- Tipografia editorial premium B2B
- Sem startup-vibe, sem firula, hairlines

## Dados institucionais

Centralizados em `src/lib/site.ts`. Para atualizar telefone, e-mail, endereço, CNPJ, verticais — editar somente esse arquivo.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Deploy

Compatível com Vercel out-of-the-box. Sem variáveis de ambiente necessárias.

---

© Repon Plataforma de Comércio Ltda. CNPJ Matriz: 54.563.438/0001-07. CNPJ Filial: 54.563.438/0002-98.
