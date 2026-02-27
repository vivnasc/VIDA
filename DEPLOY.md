# Deploy maBIZ - Passos

## 1. Criar Projecto Supabase

1. Vai a https://supabase.com e cria conta (ou faz login)
2. Clica **New Project**
3. Preenche:
   - Nome: `vida-ecosystem`
   - Password da DB: (guarda bem)
   - Região: **West EU (London)** (mais perto de MZ)
4. Espera o projecto ficar pronto (~2 min)
5. Vai a **Settings > API** e copia:
   - `Project URL` → este é o teu `SUPABASE_URL`
   - `anon public` key → este é o teu `ANON_KEY`

## 2. Aplicar Migração (criar tabelas)

Opção A - Via Dashboard (mais fácil):
1. No Supabase Dashboard, vai a **SQL Editor**
2. Clica **New Query**
3. Cola TODO o conteúdo de `supabase/migrations/00007_business_schema.sql`
4. Clica **Run**
5. Deve aparecer "Success. No rows returned" - significa que criou tudo

Opção B - Via CLI (se tiveres Docker):
```bash
npm install -g supabase
supabase login
supabase link --project-ref <teu-project-ref>
npm run db:migrate
```

## 3. Configurar Variáveis de Ambiente

Cria o ficheiro `apps/biz/.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
NEXT_PUBLIC_APP_URL=http://localhost:3004
```

Testa localmente:
```bash
cd apps/biz
npm run dev
```

## 4. Deploy no Vercel

1. Vai a https://vercel.com e faz login com GitHub
2. Clica **Add New > Project**
3. Importa o repo `VIDA`
4. Configura:
   - **Framework:** Next.js
   - **Root Directory:** `apps/biz`
   - **Build Command:** `npm run build` (automático)
5. Adiciona **Environment Variables:**
   - `NEXT_PUBLIC_SUPABASE_URL` = (o URL do passo 1)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (a key do passo 1)
   - `NEXT_PUBLIC_APP_URL` = (o domínio Vercel, ex: `https://mabiz.vercel.app`)
6. Clica **Deploy**

## 5. Depois do Deploy

- Actualiza o `site_url` no Supabase Auth: **Settings > Auth > URL Configuration**
  - Site URL: `https://mabiz.vercel.app` (ou teu domínio)
  - Redirect URLs: adiciona `https://mabiz.vercel.app/**`

## Domínio Personalizado (opcional)

Se quiseres `biz.vida.co.mz`:
1. No Vercel: **Settings > Domains > Add** `biz.vida.co.mz`
2. No teu DNS: adiciona o CNAME que o Vercel indicar
3. Actualiza o `site_url` no Supabase Auth
