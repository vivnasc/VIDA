# BIZ.MZ — Especificações Completas

## Conceito

App de gestão para pequenos negócios moçambicanos. Dá ferramentas profissionais a quem gere um salão, uma loja, um bottle store, uma banca. Inclui educação prática integrada por tipo de negócio.

**Tagline**: "Cresce teu negócio"

**Missão**: Democratizar gestão de negócios em Moçambique. Dar ferramentas de multinacional a quem tem banca no mercado. Empoderar empreendedores com tecnologia, educação e dados.

**Target**: Empreendedores moçambicanos, economia informal e formal, 20-50 anos, que querem profissionalizar e crescer.

---

## Arquitectura — Templates por Tipo de Negócio

Ao criar conta, o utilizador escolhe o tipo de negócio. O app carrega features, campos, métricas e educação específicos para aquele negócio.

**Templates disponíveis:**
1. 💇‍♀️ Salão de Beleza / Barbearia
2. 👗 Loja de Roupa / Boutique
3. 🍺 Bottle Store
4. 🏪 Banca / Mercearia
5. 🍕 Restaurante / Take-Away
6. 🚕 Taxista / Transporte
7. 🔧 Mecânico / Técnico
8. ✂️ Alfaiate / Costureira
9. 🏗️ Construção Civil
10. 📱 Loja de Electrónicos
11. 💅 Estética / Spa
12. 📦 Genérico (outros negócios)

---

## Features Universais (Todos os Negócios)

### 1. Gestão Financeira do Negócio

**Caixa Diário:**
```
ABRIR CAIXA — 27 Fevereiro, 9h00
Dinheiro inicial: 1.000 MT (troco)

VENDAS DIA:
09h30 — Maria — Tranças — 1.500 MT (M-Pesa)
10h00 — Ana — Unhas — 600 MT (Cash)
11h30 — Sofia — Corte — 800 MT (Cash)
14h30 — Beatriz — Alisamento — 2.500 MT (Transferência)
15h00 — Carla — Makeup — 1.200 MT (Cash)

RECEITAS:
├── Cash: 2.600 MT
├── M-Pesa: 1.500 MT
├── Transferência: 2.500 MT
└── TOTAL: 6.600 MT

DESPESAS:
├── Produtos usados: 380 MT
├── Luz/água: ~200 MT
├── Lanche staff: 150 MT
└── TOTAL: 730 MT

LUCRO BRUTO DIA: 5.870 MT

FECHAR CAIXA:
├── Esperado: 3.600 MT (inicial + cash)
├── Real: 3.580 MT
└── Diferença: -20 MT ⚠️
```

**Vendas à vista vs crédito/fiado**

**Despesas fixas vs variáveis**

**Margem de lucro por produto/serviço:**
```
Tranças: Custo material 175 MT → Preço 1.500 MT → Margem 88%
Alisamento: Custo 350 MT → Preço 2.500 MT → Margem 86%
```

**Break-even point:** "Precisas vender X por dia para cobrir custos fixos"

**Projecção de vendas (IA)**

**Reserva emergência do negócio**

**Relatórios:**
- "Quanto ganhei REALMENTE este mês?"
- "Qual produto dá mais lucro?"
- "Quando vendo mais?" (dias/horários)
- "Stock parado há quanto tempo?"
- Mensal, trimestral, anual
- Exportar PDF/Excel

### 2. Gestão de Stock/Inventário

Adaptado por tipo de negócio (ver templates abaixo).

**Universal:**
- Adicionar produto (nome, custo, preço venda, quantidade, fornecedor)
- Alertas stock baixo (threshold configurável)
- Histórico de reposições
- Custo vs venda → margem automática
- Produtos mais vendidos
- Produtos parados (sem movimento há X dias)
- Validade (para perecíveis)

### 3. Gestão de Clientes

**Database por cliente:**
```
Cliente: Maria João
├── Telefone: +258 84...
├── Cliente desde: Janeiro 2024
├── Última visita: 15 Fev 2026
├── Total gasto: 45.000 MT
├── Visitas: 28x
├── Média/visita: 1.600 MT
├── Serviço favorito: Tranças
├── Preferências: Cabeleireira A, gosta de conversar
├── Histórico completo de compras/serviços
└── Status: VIP (20+ visitas)
```

**Categorias:**
- 🌟 VIP (20+ visitas/compras)
- ⭐ Fiel (10-19)
- 💚 Regular (5-9)
- 🆕 Nova (1-4)

**Programa Fidelidade:**
- A cada X visitas/compras → desconto na próxima
- Aniversário → brinde ou desconto
- Referência amiga → ambas ganham
- Tracking automático

**Alertas:**
- "Maria não vem há 6 semanas (normal dela: 3-4 semanas)"
- "Sugestão: enviar mensagem com 15% desconto"

**CRM Básico:**
- Histórico interacções
- Follow-ups automáticos
- Aniversários clientes
- "Cliente X não compra há 60 dias"

### 4. Sistema de Fiado / Crédito Clientes

**Caderneta Digital:**
```
Cliente: Mário
├── Limite crédito: 1.000 MT
├── Dívida actual: 650 MT (65% do limite)
├── Última compra fiado: Ontem
├── Último pagamento: 20 Fev (500 MT)
├── Prazo acordado: Fim do mês
├── Histórico pagamento: ⭐⭐⭐⭐ (bom pagador)
└── Score: BOM
```

**Dashboard Fiado:**
```
Total fiado activo: 8.450 MT (12 clientes)

TOP DEVEDORES:
1. João — 2.100 MT ⚠️ Atraso 2 semanas
2. Maria — 1.800 MT ✅ Paga sempre
3. Mário — 650 MT ✅ OK
```

**Regras automáticas:**
```
SE cliente deve > 80% limite:
→ Alerta: "Sem mais fiado"
→ Mensagem sugerida: "Oi [nome], teu crédito está quase no limite..."

SE atraso > 7 dias:
→ Status: ⚠️ Atenção
→ Follow-up diário

SE atraso > 30 dias:
→ Status: 🔴 Crítico
→ Bloquear novos fiados
```

**Cobrança gentil (sugestões de mensagens):**
- "Oi [nome], lembra que tens 650 MT em aberto. Quando puderes passar? 🙏"
- Sem disputes. Só tracking e comunicação. Decisão do dono.

### 5. Gestão de Staff

Se o negócio tem empregados.

```
Cabeleireira A — "Fátima":
├── Salário base: 8.000 MT
├── Comissão: 20% sobre serviços dela
├── Horário: Seg-Sáb
├── Performance Fevereiro:
│   ├── Atendimentos: 47
│   ├── Receita gerada: 68.500 MT
│   ├── Comissão: 13.700 MT
│   └── Total mês: 21.700 MT
├── Especialidade: Tranças, crochet
├── Rating clientes: 4.8/5
└── Faltas: 0 este mês ✅
```

**Relatório mensal staff:**
```
Custo Staff Total: 52.760 MT
Receita Total Gerada: 145.000 MT
Rácio: 36% (saudável ✅)
```

**IA Insights:**
- "Fátima é tua estrela — 47% da receita! Considera bónus por performance"
- "Lurdes precisa treino em [serviço] — rating mais baixo"

### 6. Fornecedores

```
Distribuidor TDM (Cervejas):
├── Produtos: 2M, Laurentina, Impala
├── MOQ: 10 caixas mínimo
├── Entrega: 24-48h
├── Pagamento: 50% adiantado M-Pesa
├── Contacto: Sr. Jaime +258 82...
├── Dia visita: Terças e Sextas
├── Confiabilidade: ⭐⭐⭐⭐⭐
└── Nota: Liga 1 dia antes para garantir stock
```

**Calendário pedidos:**
- "Segunda: CDM passa (refrigerantes)"
- "Terça: TDM passa (cervejas)"

**Cash flow awareness:**
```
"Pedido Terça: 8.160 MT"
"Caixa actual: 6.200 MT"
"FALTA: 1.960 MT — vende mais hoje ou adia 1 dia"
```

### 7. Marketing & Promoções

**Promoções inteligentes (IA):**
```
"Terças-feiras fracas (30% menos movimento)"
→ Sugestão: "Terça Feliz — 15% desconto"

"Stock de produto X acumulando"
→ Sugestão: "Promoção flash: 2 por 1"
```

**Campanhas WhatsApp (sugestões):**
- Clientes ausentes: "Olá [Nome], sentimos tua falta! 💕"
- Aniversariantes: "Parabéns [Nome]! 🎂 Presente especial..."
- Promoções sazonais: Dia da Mulher, Natal, etc.

### 8. Licenças & Compliance

Tracking de documentos obrigatórios por tipo de negócio.

```
Licença venda bebidas alcoólicas:
├── Entidade: Município de Maputo
├── Custo: 2.500 MT/ano
├── Renova: Março
├── Status: ✅ Válida
└── Alerta: "Renovação em 30 dias — reserva 2.500 MT"

Alvará comercial:
├── Custo: 1.200 MT/ano
├── Renova: Janeiro
└── Status: ✅ Válido
```

**Impostos:**
- Calendário fiscal Moçambique
- IRPC (se formalizado)
- IVA (se aplicável)
- INSS (se tem empregados)
- Cálculo automático estimado
- Lembretes de prazos

### 9. Analytics & Insights IA

**Métricas chave por negócio:**
```
PRODUTO MAIS VENDIDO:
1. 🥇 2M — 1.450 garrafas/mês
2. 🥈 Coca-Cola — 720/mês

PRODUTO MAIS LUCRATIVO:
1. 🥇 Whisky — 12.000 MT margem/mês (baixo vol, alta margem)
2. 🥈 2M — 21.750 MT margem/mês (alto vol, média margem)

HORÁRIOS PICO:
├── 17h-20h (pós-trabalho) — 45% vendas
├── 12h-14h (almoço) — 20%

DIAS MELHORES:
├── Sexta: 🔥🔥🔥 (30% vendas semana)
├── Sábado: 🔥🔥 (25%)
└── Segunda-Quinta: (30% total)

SAZONALIDADE:
├── Verão: +45% vendas
├── Dezembro: +80% vendas
└── "Começar stockar em Novembro!"
```

**Benchmark (futuro):**
- "Salão médio em Maputo factura X — tu estás acima/abaixo"
- "Tua margem vs média do sector"

---

## Templates Detalhados

### TEMPLATE 1: 💇‍♀️ Salão de Beleza / Barbearia

**Features específicas:**

**Agenda de marcações:**
```
Serviços oferecidos:
├── Tranças (4h) — 1.500 MT — Cabeleireira A
├── Alisamento (3h) — 2.500 MT — Cabeleireira B
├── Corte + escova (1.5h) — 800 MT — Qualquer
├── Unhas gel (1h) — 600 MT — Manicure
├── Makeup (1h) — 1.200 MT — Dona
├── Hidratação (2h) — 1.000 MT — Qualquer
└── Sobrancelhas (30min) — 300 MT — Qualquer

Visão dia:
09h00 — Maria — Tranças — Cab. A
09h30 — Ana — Unhas gel — Manicure
11h00 — Sofia — Corte+escova — Cab. B
...
```

**Features:**
- Marcação via link WhatsApp
- Lembretes automáticos 24h antes
- Lista de espera (se cancelar)
- Histórico cliente (o que fez, quando, com quem)
- Fotos antes/depois (com permissão)

**Stock específico:**
- Produtos por serviço (consumo calculado)
- Custo material por serviço vs preço → margem real
- Alerta reposição por produto
- Fornecedores de beleza

**Staff:**
- Salário base + comissão por serviço
- Performance individual
- Especialidades de cada profissional
- Rating por clientes

**Programa fidelidade:**
- 10 visitas → 11ª com 20% desconto
- Aniversário → sobrancelhas grátis
- Referência amiga → 10% para ambas

### TEMPLATE 2: 👗 Loja de Roupa / Boutique

**Stock específico moda:**
```
Vestido Floral (Ref: VF001):
├── Tamanhos: S(2), M(5), L(3), XL(1)
├── Cores: Verde(4), Azul(3), Rosa(4)
├── Custo: 280 MT
├── Preço venda: 850 MT
├── Margem: 203%
├── Fornecedor: AliExpress
├── Tempo entrega: 25-30 dias
├── Vendidos: 11 peças
├── Stock: 9 peças
└── Status: ✅ OK
```

**Alertas moda:**
```
⚠️ "Calça Skinny tamanho 38 ESGOTADO — mais procurado!"
💡 "Vestido Verde vende 2x mais que outras cores — dobra na próxima encomenda"
⚠️ "Blusa X parada há 90 dias — promoção 30% off?"
```

**Fornecedores internacionais:**
- AliExpress: timing pedidos, custo, qualidade, MOQ
- Joanesburgo (viagem): custo viagem, frequência, budget
- Importador local: stock imediato, preços mais altos

**Revendedoras:**
```
Maria (revendedora Matola):
├── Última compra: 10 Fev
├── 8 vestidos + 12 blusas
├── Total: 12.000 MT
├── Pagou: 6.000 MT (50%)
├── Deve: 6.000 MT
├── Prazo: 28 Fev
└── Status: ⚠️ Vence amanhã
```

- Desconto escalonado (quanto mais compra, mais desconto)
- Suporte: fotos produto para elas venderem no WhatsApp
- Tracking crédito revendedoras

**Promoções:**
- Combos: vestido + acessório = -10%
- Flash sales: "SÓ HOJE: 2 blusas por 1.000 MT"
- Sazonalidade: Dia da Mulher, festas Dezembro

### TEMPLATE 3: 🍺 Bottle Store

**Stock bebidas:**
```
Cerveja 2M (Garrafa 550ml):
├── Caixas: 8 (192 garrafas)
├── Custo caixa: 480 MT (20 MT/garrafa)
├── Preço venda: 35 MT/garrafa
├── Margem: 75%
├── Giro: 2-3 caixas/dia
├── Alerta: < 3 caixas
├── Fornecedor: Distribuidor TDM
└── ⚠️ Stock baixo! Só 2.5 dias!
```

**Vendas rápidas (Quick Sale):**
Interface ultra-rápida para vender em 5 segundos:
```
[2M (35)] [Coca (30)] [Fanta (30)] [Água (15)]
[Whisky (1.400)]                    [+ Mais]

TAP → TAP → Total → [CASH] ou [M-PESA]
```

- Atalhos customizáveis (top vendas sempre visíveis)
- Combos: "2M + Amendoim" → 1 tap → 50 MT
- Fiado: Nome cliente + TAP → adicionado à conta

**Frigoríficos & Equipamentos:**
```
Frigorífico 1 (Cervejas):
├── Marca: Coca-Cola (cedido)
├── Capacidade: 8 caixas
├── Consumo: ~150 KWh/mês → ~900 MT/mês
├── Estado: ✅ Funcional
├── Última manutenção: Jan 2026
├── Próxima: Jul 2026
└── Alerta se temperatura não desce
```

**Compliance específico:**
- Licença venda bebidas alcoólicas
- Horários legais (até 22h seg-sáb, 20h dom)
- Venda a menores: NUNCA (lembrete no app)
- Inspeções: o que esperar, como preparar

**Sazonalidade:**
```
Verão (Out-Mar): Água +60%, Cerveja +40%
Dezembro: Whisky +200%, Receita total +80%
→ "Stock extra em Novembro! Guardar cash!"
```

### TEMPLATE 4: 🏪 Banca / Mercearia

**Stock variado:**
- Produtos frescos (validade curta)
- Produtos secos (validade longa)
- Preços flutuantes (vegetais, frutas)
- Reposição frequente

**Vendas rápidas sem recibo formal**

**Crédito clientes (caderneta digital)**

**Fornecedores tracking:**
- Mercado grossista
- Distribuidores
- Produtores locais (machamba)

### TEMPLATE 5: 🍕 Restaurante / Take-Away

**Gestão específica:**
- Ingredientes com validade
- Receitas com custo (food cost por prato)
- Menu digital
- Pedidos tracking
- Delivery tracking

**Food cost:**
```
Frango Grelhado com Arroz:
├── Frango: 150 MT
├── Arroz: 20 MT
├── Salada: 30 MT
├── Gás: 10 MT
├── Embalagem: 15 MT
├── CUSTO TOTAL: 225 MT
├── PREÇO VENDA: 650 MT
└── MARGEM: 65% ✅ (ideal: >60%)
```

### TEMPLATE 6: 🚕 Taxista / Transporte

**Tracking:**
- Viagens (origem, destino, valor, hora)
- Combustível vs ganhos
- Manutenção veículo
- Melhores rotas e horários
- Despesas (portagens, lavagem)
- Ganho líquido por dia/semana/mês

### TEMPLATE 7: 🔧 Mecânico / Técnico

**Ordens de serviço:**
- Cliente + veículo
- Diagnóstico
- Peças usadas (custo + venda)
- Mão-de-obra (horas × taxa)
- Garantia do serviço
- Histórico por carro

### TEMPLATE 8: ✂️ Alfaiate / Costureira

**Encomendas:**
- Cliente + medidas guardadas
- Tecido (inventário)
- Modelo/referência (foto)
- Prazo entrega
- Status (por fazer, em progresso, pronto, entregue)
- Custo tecido + mão-de-obra vs preço

### TEMPLATE 9: 🏗️ Construção Civil

**Projectos:**
- Materiais tracking
- Mão-de-obra diária
- Orçamentos
- Progresso da obra
- Custos vs orçamento original

### TEMPLATE 10: 📱 Loja de Electrónicos

**Stock com IMEI:**
- Tracking por IMEI (telemóveis)
- Garantias por aparelho
- Reparações (tracking estado)
- Acessórios por modelo

---

## Educação Integrada — Por Tipo de Negócio

### Módulos Universais (Todos)

**BÁSICO:**
- Separar dinheiro pessoal de negócio (CRÍTICO)
- Como precificar correctamente
- Controlo de stock — porquê importa
- Gestão de fluxo de caixa
- Quando reinvestir vs tirar lucro
- Impostos básicos em Moçambique

**VENDAS:**
- Como negociar com fornecedores
- Gestão de crédito/fiado a clientes
- Marketing boca-a-boca
- Fidelização clientes
- Promoções que funcionam

**CRESCIMENTO:**
- Quando contratar ajuda
- Como treinar staff
- Expansão: segunda loja, venda online
- Acesso a crédito (bancos, microfinanças)
- Formalização: vantagens e desvantagens

**DIGITAL:**
- Vender no Facebook/Instagram
- WhatsApp Business optimizado
- M-Pesa para negócios
- Fotos de produto que vendem
- Como lidar com reviews

**MOÇAMBIQUE:**
- Licenças necessárias por tipo de negócio
- Alvará comercial: como obter
- INSS para empregados
- Relacionamento com fiscais
- Associações empresariais úteis

### Módulos por Negócio

**Salão de Beleza:**
- Precificação: custo produto × 3-5
- Fidelização: o que faz cliente voltar
- Como contratar cabeleireiras
- Salário fixo vs comissão
- Instagram para salões
- De 1 cadeira a 5 em 2 anos (caso)

**Loja de Roupa:**
- Como identificar tendências
- Mix ideal: clássicos vs trendy
- Tamanhos que mais vendem
- AliExpress: como comprar seguro
- Rede de revendedoras
- Marketing visual

**Bottle Store:**
- Rotação FIFO (First In First Out)
- Gestão de fiado inteligente
- Sazonalidade (verão vs inverno)
- Distribuidores vs grossista
- Compliance (licenças, horários, menores)

### Formato da Educação

- Microlearning: lições de 5-10 minutos
- Quiz após cada lição
- Certificados por módulo concluído
- Gamificação: XP, badges, níveis
- Exemplos reais moçambicanos
- Linguagem simples e prática
- Offline disponível

---

## Database Schema

```sql
-- Negócios
businesses (id, user_id, name, type, template, address, phone,
  logo_url, currency, tax_id, license_info, created_at)

-- Produtos/Serviços
products (id, business_id, name, sku, category, cost_price, sell_price,
  quantity, unit, min_stock, max_stock, supplier_id, barcode,
  expiry_date, location, photo_url, variants, is_active)

-- Variantes (tamanhos, cores)
product_variants (id, product_id, variant_type, variant_value,
  quantity, sku)

-- Vendas
sales (id, business_id, customer_id, staff_id, items, total_amount,
  payment_method, discount, notes, created_at)

-- Itens da Venda
sale_items (id, sale_id, product_id, quantity, unit_price,
  discount, total)

-- Clientes
customers (id, business_id, name, phone, email, category,
  total_spent, visit_count, last_visit, loyalty_points,
  credit_limit, current_debt, preferences, notes, created_at)

-- Dívidas/Fiado
customer_debts (id, customer_id, sale_id, amount, paid_amount,
  due_date, status, notes, created_at)

-- Pagamentos de Dívida
debt_payments (id, debt_id, amount, payment_method, date, notes)

-- Staff
staff_members (id, business_id, name, phone, role, salary_base,
  commission_rate, work_schedule, specialties, start_date, is_active)

-- Comissões
staff_commissions (id, staff_id, sale_id, amount, period, status)

-- Fornecedores
suppliers (id, business_id, name, phone, products_supplied,
  payment_terms, delivery_time, moq, rating, notes, last_order_date)

-- Encomendas a Fornecedores
purchase_orders (id, business_id, supplier_id, items, total_cost,
  status, order_date, expected_delivery, received_date)

-- Despesas do Negócio
business_expenses (id, business_id, category, amount, description,
  date, receipt_url, is_recurring)

-- Agendamentos (Salão)
appointments (id, business_id, customer_id, staff_id, service_id,
  date, time_start, time_end, status, notes, created_at)

-- Licenças
licenses (id, business_id, name, issuer, cost, issue_date,
  expiry_date, document_url, status)

-- Equipamentos
equipment (id, business_id, name, type, brand, purchase_date,
  cost, maintenance_schedule, last_maintenance, notes)

-- Educação
education_modules (id, business_type, module_name, level, lessons)
education_progress (id, user_id, module_id, lesson_id, completed,
  score, xp_earned, completed_at)
education_certificates (id, user_id, module_id, issued_at)

-- Promoções
promotions (id, business_id, name, type, discount_value,
  start_date, end_date, conditions, is_active)
```

---

## Free vs Pro

### Free
- 1 negócio
- 50 produtos
- 30 clientes
- Vendas básicas
- Fiado básico (10 clientes)
- Educação básica (Nível 1)
- Relatórios simples
- 2 staff

### Pro (400 MT/mês)
Tudo do Free mais:
- Produtos ilimitados
- Clientes ilimitados
- IA insights profundos
- Previsões de vendas
- Educação completa (todos níveis)
- Multi-negócio (até 3)
- Staff ilimitado
- Comissões automáticas
- Relatórios fiscais
- Exportar PDF/Excel
- Quick Sale mode
- Promoções inteligentes
- Sem anúncios
- Suporte prioritário

### Integração com VIDA.DINHEIRO (Opcional)

- Conectar conta BIZ.MZ com VIDA.DINHEIRO
- Separar finanças pessoais vs negócio automaticamente
- Transferências negócio → pessoal rastreadas em ambos
- Dashboard combinado opcional
- Provisionar impostos do negócio no DINHEIRO
