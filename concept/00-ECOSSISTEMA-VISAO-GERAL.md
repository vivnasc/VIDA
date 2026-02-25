# ECOSSISTEMA VIDA + BIZ.MZ — ESPECIFICAÇÕES COMPLETAS

## Visão Geral

Três marcas distintas. Seis aplicações PWA. Um objectivo: organizar a vida das pessoas.

### Marca 1: VIDA (Ecossistema Pessoal/Familiar)

Quatro apps sob a marca VIDA, partilhando autenticação única, base de dados Supabase comum (schemas separados) e monorepo no GitHub. Todas deployadas via Vercel.

| App | Foco | Tagline |
|-----|------|---------|
| VIDA.FAMÍLIA | Coordenação familiar central | "O coração da tua família, digital" |
| VIDA.DINHEIRO | Finanças pessoais e familiares | "Teu dinheiro, tuas regras" |
| VIDA.LAR | Gestão doméstica completa | "Tua casa gerida por IA" |
| VIDA.SAÚDE | Saúde familiar | "Tua saúde e da tua família, organizada" |

### Marca 2: BIZ.MZ (Negócios — Standalone)

App standalone com repo, Supabase e deploy separados. Identidade visual profissional distinta. Pode integrar opcionalmente com VIDA.DINHEIRO para separação finanças pessoais/negócio.

| App | Foco | Tagline |
|-----|------|---------|
| BIZ.MZ | Gestão de pequenos negócios moçambicanos | "Cresce teu negócio" |

### Marca 3: PULSE (Dating — Standalone)

Totalmente separado. Já possui specs próprias. Não faz parte deste documento.

---

## Arquitectura Técnica

### Stack Comum

- **Frontend**: React + TypeScript + Next.js (PWA)
- **Backend**: Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Deploy**: Vercel
- **Design**: Tailwind CSS + Shadcn/UI
- **Gráficos**: Recharts
- **IA**: Anthropic Claude API (insights, sugestões, meal planning, educação)

### Repositórios GitHub

```
vida-ecosystem/          ← Monorepo (Turborepo ou Nx)
├── apps/
│   ├── familia/         ← VIDA.FAMÍLIA
│   ├── dinheiro/        ← VIDA.DINHEIRO
│   ├── lar/             ← VIDA.LAR
│   └── saude/           ← VIDA.SAÚDE
├── packages/
│   ├── ui/              ← Componentes partilhados (Shadcn)
│   ├── auth/            ← Wrapper Supabase Auth
│   ├── database/        ← Schemas, queries, types
│   ├── config/          ← Configs partilhadas (ESLint, TS, Tailwind)
│   └── utils/           ← Helpers, formatadores, constantes
├── supabase/
│   ├── migrations/
│   └── seed/
└── package.json

biz-mz/                  ← Repo separado
├── src/
├── supabase/
└── vercel.json

pulse/                   ← Repo separado (já existente)
```

### Supabase — Estrutura de Schemas

**Projecto VIDA** (1 projecto Supabase):
```
public          → users, profiles, family_members, family_groups
money_schema    → accounts, transactions, categories, budgets, goals, funds
home_schema     → inventory, shopping_lists, maintenance, employees, meal_plans, routines
health_schema   → medical_profiles, medications, appointments, vaccinations, providers
family_schema   → calendar_events, tasks, photos, milestones, chat_messages
```

**Projecto BIZ.MZ** (1 projecto Supabase separado):
```
public          → users, profiles, businesses
biz_schema      → products, sales, customers, debts, suppliers, staff, education_progress
```

### Autenticação

- VIDA: Login único para as 4 apps (email, telefone, Google, Facebook)
- BIZ.MZ: Auth próprio, com opção de ligar conta VIDA
- PULSE: Completamente independente

### PWA Features (Todas as Apps)

- Instalável no ecrã inicial (Android/iOS)
- Funciona offline (Service Worker + cache)
- Push notifications
- Responsive (mobile-first, funciona em desktop)
- Modo escuro/claro

---

## Identidade Visual

### VIDA (Quente, Familiar, Acolhedor)

- **Primary**: `#FF6B35` (Laranja caloroso)
- **Secondary**: `#FFB4A2` (Rosa suave)
- **Accent**: `#FFCF56` (Amarelo sol)
- **Background**: `#FFF8F0` (Creme quente)
- **Tipografia**: Inter (UI), Rounded sans-serif (Display)
- **Ícones**: Orgânicos, suaves, humanos
- **Tom de voz**: "Tua família merece isto"

### BIZ.MZ (Profissional, Confiável, Crescimento)

- **Primary**: `#2ECC71` (Verde crescimento)
- **Secondary**: `#3498DB` (Azul confiança)
- **Accent**: `#F39C12` (Dourado sucesso)
- **Background**: `#F8FAFC` (Branco profissional)
- **Tipografia**: Inter (UI), Bold sans-serif (Display)
- **Ícones**: Geométricos, precisos, profissionais
- **Tom de voz**: "Cresce teu negócio como profissional"

---

## Integrações Entre Apps VIDA

### VIDA.DINHEIRO ↔ VIDA.LAR

- Compras mercado no LAR criam transacção automática no DINHEIRO
- Utilities tracking do LAR sincroniza com orçamento DINHEIRO
- Salário empregada do LAR aparece como despesa fixa no DINHEIRO
- Budget disponível no DINHEIRO informa alertas do LAR ("lista excede budget")

### VIDA.DINHEIRO ↔ VIDA.SAÚDE

- Despesas médicas do SAÚDE registam automaticamente no DINHEIRO
- Medicação recorrente cria despesa mensal no DINHEIRO
- Fundo emergência médica sincronizado
- Reembolsos de seguro rastreados em ambas

### VIDA.DINHEIRO ↔ BIZ.MZ (Opcional)

- Separação finanças pessoais vs negócio
- Transferências negócio→pessoal registadas em ambas
- Impostos do negócio provisionados no DINHEIRO
- Dashboard combinado opcional

### VIDA.FAMÍLIA ↔ Todas

- Calendário central puxa eventos de todas as apps
- Dashboard mega mostra overview de finanças, casa, saúde
- Quick actions para acções frequentes em qualquer app
- Alertas consolidados num lugar

### VIDA.LAR ↔ VIDA.SAÚDE

- Medicação família aparece em ambas
- Contactos emergência partilhados
- Calendário consultas sincronizado

---

## Monetização

### VIDA — Individual por App

| App | Free | Pro (mensal) |
|-----|------|-------------|
| VIDA.FAMÍLIA | 4 membros, calendário básico, chat | 400 MT |
| VIDA.DINHEIRO | 2 contas, categorias ilimitadas, 1 meta | 300 MT |
| VIDA.LAR | 30 itens inventário, 1 empregada, lista compras básica | 250 MT |
| VIDA.SAÚDE | 3 perfis, histórico básico, 5 medicações | 200 MT |
| **Total separado** | | **1.150 MT** |

### VIDA — Bundle

| Bundle | Inclui | Preço |
|--------|--------|-------|
| VIDA COMPLETA | 4 apps Pro + integração total | 900 MT/mês (22% OFF) |
| VIDA VIP | 4 apps VIP + AI Concierge + suporte prioritário | 2.000 MT/mês |

### BIZ.MZ

| Tier | Inclui | Preço |
|------|--------|-------|
| Free | 1 negócio, 50 produtos, 30 clientes, vendas básicas, educação básica | Grátis |
| Pro | Ilimitado, IA insights, previsões, educação completa, multi-negócio (3) | 400 MT/mês |
| VIP | Tudo Pro + AI Concierge, consultoria, advanced analytics | 800 MT/mês |

### Preços Regionalizados BIZ.MZ

| Região | Pro Mensal | Pro Anual |
|--------|-----------|-----------|
| Moçambique | 400 MT | 4.000 MT (17% OFF) |
| PALOP | $7 | $70 (17% OFF) |
| Global | $12 | $120 (17% OFF) |

### Bundle Cross-Brand

| Bundle | Inclui | Preço |
|--------|--------|-------|
| Empreendedor | VIDA.DINHEIRO Pro + BIZ.MZ Pro | 600 MT/mês (vs 700 separado) |

### Pagamentos

- M-Pesa (Moçambique)
- Stripe (Internacional)
- Cartão crédito/débito

---

## Contexto Moçambique — Particularidades Locais

### Categorias Culturais Específicas

- **Xitique**: Poupança colectiva rotativa — tracking de contribuições, vez de receber, valor
- **Gasosa**: Crédito celular — padrão de uso, alertas
- **Lobolo**: Cerimónia de casamento tradicional — fundo específico, planejamento
- **Cerimónias**: Funerais, festas, eventos — fundo emergência social
- **Chapa**: Transporte público informal — tracking gastos transporte

### Economia Informal

- Maioria dos negócios não tem CNPJ
- Caderneta de papel para vendas e fiados
- Pagamentos mistos: cash, M-Pesa, transferência
- Fornecedores baseados em confiança pessoal
- Horários fluidos, sem ponto electrónico

### Infraestrutura

- Internet instável em muitas zonas — app DEVE funcionar offline
- Cortes de energia frequentes — dados salvos localmente + sync quando disponível
- Smartphones predominam (Android maioria) — PWA é ideal
- M-Pesa é o meio de pagamento digital dominante

### Multi-Moeda

- MZN (Metical) — principal
- USD (Dólar) — muito usado em transacções grandes
- ZAR (Rand) — usado na fronteira sul
- EUR (Euro) — menos comum, presente em negócios internacionais

### Saúde Específica

- Malária é comum — tracking de profilaxia
- HIV/SIDA — acompanhamento discreto e seguro
- Terapias especializadas (TEA, etc.) caras e escassas
- Seguros saúde em crescimento mas ainda limitados
- Hospitais públicos com longas esperas

### Doméstica

- Empregada doméstica é cultural e comum
- Cortes de água frequentes — gestão de tanques/cisternas
- Geradores/UPS necessários
- Jardins tropicais com necessidades específicas de manutenção
- Segurança residencial é prioridade

---

## Nota Legal

Nenhuma destas apps precisa de autorização do Banco Central de Moçambique, pois:
- Não movimentam dinheiro real
- Não guardam fundos de utilizadores
- Não oferecem intermediação financeira
- Não conectam a contas bancárias (sem Open Banking)
- São ferramentas de gestão e visualização de dados pessoais

Nos termos de uso, deve constar:
- É ferramenta de organização pessoal
- Não movimenta dinheiro real
- Não oferece consultoria financeira profissional
- Os utilizadores são responsáveis pelos dados inseridos
