# VIDA.DINHEIRO — Especificações Completas

## Conceito

App de finanças pessoais e familiares para Moçambique e PALOP. Muito superior ao Mobills. Controla, educa e transforma comportamento financeiro.

**Tagline**: "Teu dinheiro, tuas regras"

**Target**: Famílias moçambicanas, 25-45 anos, classe média, que querem organizar finanças e aprender.

---

## Features Core

### 1. Múltiplas Contas e Carteiras

- Contas bancárias (BCI, BIM, Standard, Absa, etc.)
- Carteiras M-Pesa e e-Mola
- Dinheiro em casa (cash)
- Poupanças
- Multi-moeda: MZN, USD, EUR, ZAR, GBP
- Taxa de câmbio actualizada (API)
- Conversão automática entre moedas
- Histórico de taxas de câmbio
- Alertas: "USD está bom para converter"
- Tracking: onde tem cada moeda
- Reconciliação manual (sem API directa aos bancos em Moçambique)
- Transferências entre contas tracking

### 2. Transacções

- Adicionar receita ou despesa com 2-3 taps
- Campos: valor, conta, categoria, subcategoria, data, hora, nota, anexo
- Transacções recorrentes (fixas e variáveis)
- Transacções parceladas (3x, 6x, 12x)
- Anexar comprovantes (foto de recibo, screenshot M-Pesa)
- Duplicar transacção
- Editar e eliminar
- Pesquisa e filtros avançados
- Tags customizáveis
- Importar CSV (para migração de outros apps)

### 3. Categorias Inteligentes Multicamada

Categorias pai → subcategorias, ilimitadas, customizáveis, com ícones e cores.

**Exemplos de estrutura:**

```
🏠 CASA
  ├── Aluguel (fixo mensal)
  ├── Água (variável, padrão histórico)
  ├── Luz (variável, padrão histórico)
  ├── Internet (fixo mensal)
  ├── Manutenção (trimestral rollover)
  └── Emergências (reserva acumulativa)

🧒 BRENO
  ├── Escola (trimestral programado)
  ├── Terapias (mensal fixo)
  ├── Material escolar (semestral)
  ├── Roupas (rollover com teto 6 meses)
  └── Lazer (mensal)

🇲🇿 CATEGORIAS MOÇAMBICANAS
  ├── Xitique (poupança colectiva)
  ├── Gasosa (crédito celular)
  ├── Cerimónias (lobolo, festas, funerais)
  └── Chapa (transporte)
```

### 4. Sistema de Orçamento com ROLLOVER (Diferencial #1)

O que o Mobills não tem: orçamento que acumula quando não gasta.

**Funcionamento:**

```
Categoria: Salão de Beleza — 2.000 MT/mês

Janeiro: Gastou 0 → Rollover +2.000
Fevereiro: Disponível 4.000
Fevereiro: Gastou 3.500 → Rollover +500
Março: Disponível 2.500

Visual: Barra mostra "Orçamento base: 2.000 + Acumulado: 500"
```

**Opções por categoria (configurável):**
- Rollover ilimitado (acumula sempre)
- Rollover com teto (ex: máximo 3 meses acumulados)
- Expira no mês (use ou perca — para disciplina)
- Rollover para outra categoria (não gastou em roupa → vai para viagem)

### 5. Despesas Sazonais/Periódicas Automáticas (Diferencial #2)

Sistema para despesas que não são mensais: trimestrais, semestrais, anuais.

**Exemplo — Educação Breno (trimestral):**
```
Matrícula: 15.000 MT → Janeiro, Abril, Julho, Outubro
Material escolar: 5.000 MT → Fevereiro, Agosto
Uniforme: 3.000 MT → Janeiro
```

**Modos de provisionamento:**
- Poupança distribuída: Divide valor total ÷ 12, reserva todos os meses
- Alerta antecipado: Notifica 1-2 meses antes do vencimento
- Meta específica: Cria bolsa separada até a data
- Calendário visual: Mostra meses pesados vs tranquilos

**Alertas:**
- "Faltam 10 dias para matrícula do Breno (15.000 MT) — Fundo tem 18.000 MT reservados ✓"
- "Abril: ATENÇÃO — Matrícula 15k + IPRA 8k = 23k necessários"

### 6. Fundos Específicos (Diferencial #3)

Bolsas virtuais para objectivos, alimentadas por regras automáticas.

**Exemplos:**
```
🚗 Fundo: Carro Novo (Meta: 500.000 MT)
   Alimentado por:
   • Sobras de "Restaurantes" (rollover)
   • 10% de qualquer entrada extra
   • Bónus trabalho (regra automática)
   Projecção: Atinge meta em Dezembro 2027

🏖️ Fundo: Férias Família (Meta: 80.000 MT)
   Alimentado por:
   • 3.000 MT fixo/mês
   Projecção: Julho 2026 ✓

🆘 Fundo: Emergência (Meta: 6 meses de despesas)
   Automático: 15% de toda receita
   Status: 47% completo

🎓 Fundo: Universidade Breno (Meta: 2.000.000 MT)
   Por mês: 5.000 MT (prazo 8 anos)

💍 Fundo: Lobolo primo (Meta: 30.000 MT)
   Prazo: Maio 2026
```

### 7. Regras Automáticas Personalizadas

Motor de regras IF/THEN configurável pelo utilizador:

```
SE: Salário > X
ENTÃO:
  - 20% → Fundo Emergência
  - 10% → Fundo Carro
  - 5% → Investimentos
  - Resto → Despesas

SE: Categoria "Restaurantes" < Orçamento no fim do mês
ENTÃO: Diferença → Fundo Viagem

SE: Dia 25 do mês E Rollover "Vestuário" > 6.000 MT
ENTÃO: Alerta "Podes comprar aquela roupa!"

SE: Recebi bónus/rendimento extra
ENTÃO: Pergunta "Como dividir?" com sugestões inteligentes

SE: Gasto em categoria > 80% do orçamento
ENTÃO: Alerta imediato
```

### 8. Modo Casal/Família (Configurável)

Nem todos partilham finanças — sistema 100% configurável.

**Modos disponíveis:**
- Individual (só uma pessoa)
- Casal — contas conjuntas + individuais
- Família — múltiplos membros com permissões
- Só visualização (um membro só vê, não edita)

**Features casal:**
- Dashboard conjunto + individuais
- Split automático de despesas comuns (50/50, proporcional ao rendimento, percentual customizado)
- Contas partilhadas + contas privadas
- Transparência selectiva (escolhe o que partilhar)

### 9. Dívidas & Crédito

- Tracking de todas as dívidas (empréstimos, cartões crédito, fiados)
- Método bola de neve (menor primeiro) ou avalanche (maior juro primeiro)
- Simulador: "Se pagar X/mês, quita em Y meses"
- Alertas de vencimentos
- Score de saúde financeira interno
- Evolução visual do endividamento

### 10. Metas Complexas

- Metas escalonadas: curto prazo (3 meses), médio (1 ano), longo (5+ anos)
- Metas compartilhadas (casal ou família)
- Submetas (steps para atingir meta grande)
- Timeline visual
- Celebrações automáticas ao atingir milestones (25%, 50%, 75%, 100%)
- Conexão com fundos específicos

### 11. Patrimônio Líquido

**Activos (o que tem):**
- Dinheiro (todas as contas)
- Investimentos (depósitos a prazo, bilhetes tesouro, etc.)
- Casa (valor estimado)
- Carro (valor estimado)
- Outros bens

**Passivos (o que deve):**
- Empréstimos
- Cartões crédito
- Dívidas diversas

**Patrimônio = Activos - Passivos**
- Tracking evolução mensal
- Gráfico crescimento ao longo do tempo

### 12. Grandes Compras — Simuladores

- Casa: simulador crédito habitação (bancos moçambicanos)
- Carro: financiamento vs à vista — qual compensa
- Educação: quanto poupar para universidade
- Casamento/Lobolo: planejamento de custos

### 13. Presentes & Eventos

- Budget aniversários
- Natal/festas
- Cerimónias (lobolo, funerais)
- Viagens férias
- Fundo específico por evento
- Calendário de eventos com custo estimado

### 14. Protecção Financeira

- Fundo emergência (meta: 3-6 meses de despesas)
- Tracking de seguros (vida, saúde, carro, casa)
- Alertas de renovação de apólices
- Awareness sobre testamento/sucessão
- Plano B: "E se perder emprego?" — simulação

### 15. Crianças & Dependentes

- Despesas por filho
- Mesada tracking (quando aplicável)
- Educação financeira para crianças (conteúdo adaptado)
- Fundo educação por filho
- Simulador: "Quanto preciso poupar para universidade?"

### 16. Preview de Futuros — Visão do Amanhã

Simulação dos próximos 6-12 meses baseada em dados reais:

```
Março: Tranquilo ✓
Abril: ATENÇÃO — Matrícula 15k + IPRA 8k = 23k
Maio: Tranquilo ✓
Junho: Manutenção carro prevista ~10k
Julho: Férias planejadas (Fundo: 80k pronto ✓)
Agosto: Material escolar 5k

Sugestão IA: "Aumenta poupança em Março +3k para Abril não apertar"
```

### 17. Alertas Contextuais Inteligentes (IA)

```
"Faltam 10 dias para matrícula do Breno (15k)"
  Status: ✓ Fundo tem 18k reservados

"Gastaste 80% do orçamento de Mercado — faltam 15 dias pro próximo salário"
  Sugestão: Reduz 30% para terminar mês tranquila

"Padrão detectado: Gastas 5k em delivery por mês — quer criar categoria específica?"

"Rollover de Salão acumulou 6k (3 meses) — tá na hora daquele tratamento!"

"Gastas mais quando estás stressada? Teus gastos impulsivos são às 20h"

"Restaurante X te custa 15k/mês"
```

### 18. Assistente de Decisão

Antes de comprar:
- "Podes pagar, mas atrasa tua meta X em 2 semanas"
- "Já gastaste o budget desta categoria este mês"
- Scanner de preço: foto da etiqueta → avalia se cabe no orçamento

### 19. Dashboard Principal

- Saldo total (todas as contas)
- Receitas vs Despesas do mês
- Gráfico de evolução mensal
- Top categorias de gasto
- Orçamento vs realizado (com barras visuais)
- Metas/Fundos progresso
- Alertas activos
- Quick actions: "+ Transacção", "Ver Relatório", "Metas"
- Widgets configuráveis

### 20. Relatórios

- Mensal, trimestral, anual
- Por categoria, por conta, por membro família
- Comparação entre períodos
- Gráficos interactivos (pizza, barras, linhas, área)
- Exportar PDF e Excel
- Relatório fiscal (IRPS — despesas dedutíveis: educação, saúde)
- Formulário pré-preenchido para contabilista

### 21. Gamificação

- Badges por economizar, bater metas, manter streaks
- Score financeiro visual (saúde financeira crescendo)
- Desafios mensais: "Semana sem delivery", "Mês de 50% poupança"
- Streaks: Dias consecutivos sem gastar em categoria específica
- XP por acções financeiras positivas
- Níveis: Iniciante → Consciente → Estratégico → Master → Guru

---

## Educação Financeira Integrada

### Academia Financeira — 3 Níveis

**Nível 1 — Iniciante (Fundamentos):**
- O que é orçamento e como fazer
- Diferença entre necessidade e desejo
- Como controlar gastos diários
- Criar primeiro fundo de emergência
- Entender juros simples e compostos

**Nível 2 — Intermediário (Estratégia):**
- Método bola de neve e avalanche para dívidas
- Investimentos básicos em Moçambique
- Planejamento tributário (IRPS)
- Seguros: quais precisa e quais não
- Crédito habitação: como funciona

**Nível 3 — Avançado (Crescimento):**
- Construir patrimônio
- Diversificação de investimentos
- Planejamento sucessório
- Independência financeira: como calcular
- Estratégias fiscais

**Curso Especial — Finanças em Moçambique:**
- INSS: como funciona, o que pagar
- IRPS: cálculo, deduções, prazos
- Xitique: como usar estrategicamente
- M-Pesa para finanças pessoais
- Investir em Moçambique: opções reais

### Dicas Contextuais ("Just-in-Time Learning")

Aparecem no momento certo baseado em acções do utilizador:
- Ao criar primeira categoria: "Dica: Categorias ajudam a ver para onde vai teu dinheiro..."
- Ao estourar orçamento: "Sabia que o método 50/30/20 pode ajudar?..."
- Ao criar fundo emergência: "O ideal é ter 3-6 meses de despesas guardados..."
- Ao registar dívida: "Conhece o método bola de neve? Comece pela menor dívida..."

### Calculadoras Interactivas

1. Calculadora de juros compostos
2. Simulador de crédito habitação
3. Calculadora de reforma/aposentadoria
4. Simulador "Quanto preciso para..." (meta)
5. Comparador de investimentos
6. Calculadora de inflação
7. Simulador crédito automóvel

### Glossário Financeiro

Termos financeiros em linguagem simples, com exemplos práticos moçambicanos.

### Investimentos — Módulo Educativo (Sem Dinheiro Real)

- O que são investimentos
- Opções em Moçambique: depósitos a prazo, bilhetes tesouro, acções (Bolsa de Moçambique), fundos de investimento, imóveis
- Calculadoras e simuladores
- Portfolio virtual para praticar
- NUNCA movimenta dinheiro real
- Educação pura, sem consultoria financeira

---

## Xitique — Feature Especial

Sistema de poupança colectiva rotativa, muito popular em Moçambique.

**Tracking:**
- Grupo de xitique (membros, valor mensal, rotação)
- Contribuição mensal: quanto e quando pagar
- Vez de receber: quando é a tua vez, quanto recebe
- Histórico de pagamentos
- Alertas de contribuição
- O sistema já reserva o valor recebido e planeia como usar

---

## Database Schema — Tabelas Principais

```sql
-- Contas/Carteiras
accounts (id, user_id, family_id, name, type, currency, balance, icon, color, is_active)

-- Transacções
transactions (id, user_id, account_id, category_id, type, amount, currency, exchange_rate,
  description, date, time, is_recurring, recurring_id, attachments, tags, created_at)

-- Categorias
categories (id, user_id, parent_id, name, icon, color, type, budget_amount,
  rollover_type, rollover_max_months, is_system, sort_order)

-- Orçamentos
budgets (id, user_id, category_id, amount, period, rollover_balance,
  month, year, created_at)

-- Metas/Fundos
goals (id, user_id, family_id, name, target_amount, current_amount,
  deadline, icon, color, type, auto_rules, created_at)

-- Regras Automáticas
automation_rules (id, user_id, trigger_type, trigger_value,
  action_type, action_value, is_active)

-- Transacções Recorrentes
recurring_transactions (id, user_id, account_id, category_id,
  amount, frequency, period_type, next_date, end_date, is_active)

-- Dívidas
debts (id, user_id, name, total_amount, remaining_amount,
  interest_rate, monthly_payment, due_date, type, creditor)

-- Xitique
xitique_groups (id, user_id, name, monthly_amount, members_count,
  rotation_order, my_position, next_receive_date)

-- Patrimônio
assets (id, user_id, name, type, value, currency, last_updated)

-- Educação
education_progress (id, user_id, module_id, lesson_id,
  completed, score, xp_earned, completed_at)

-- Gamificação
badges (id, user_id, badge_type, earned_at)
streaks (id, user_id, type, current_count, best_count, last_date)
```

---

## Free vs Pro

### Free
- 2 contas
- Categorias ilimitadas
- Transacções ilimitadas
- Orçamento básico (SEM rollover)
- 1 meta/fundo
- Educação básica (Nível 1)
- Gráficos simples
- 1 moeda (MZN)
- Anúncios discretos

### Pro (300 MT/mês)
Tudo do Free mais:
- Contas ilimitadas
- Rollover completo
- Fundos ilimitados
- Despesas periódicas automáticas
- Regras automáticas
- Multi-moeda completo
- Modo família (4 pessoas)
- Relatórios PDF/Excel
- IA insights e alertas
- Gamificação completa
- Educação completa (3 níveis)
- Sem anúncios
- Suporte prioritário
