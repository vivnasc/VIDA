# VIDA.LAR — Especificações Completas

## Conceito

Gestão doméstica completa com IA. Inventário, empregada, cardápio semanal, manutenções, utilities, documentos. Tudo o que envolve gerir uma casa em Moçambique.

**Tagline**: "Tua casa gerida por IA. Zero stress. Tudo organizado."

**Target**: Famílias moçambicanas com casa para gerir, empregada doméstica, filhos.

---

## Features Core

### 1. Inventário Inteligente

**Scanner de Produtos:**
- Foto da despensa → IA detecta produtos
- Código de barras/foto de rótulo
- OCR de rótulos (validade, ingredientes)
- Detecção automática de validade
- Alertas ANTES de expirar

**Por produto:**
- Nome, categoria, quantidade, unidade
- Data de validade
- Localização na casa (prateleira, armário, zona)
- Custo estimado
- Fornecedor/loja habitual
- Frequência de compra (padrão aprendido)

**Alertas:**
- "Tomate enlatado expira em 3 meses — usa nas próximas receitas"
- "Arroz acabou — adicionado à lista de compras"
- "Tens ingredientes para fazer arroz de feijão!"

**Localização de Itens:**
```
"Onde está o martelo?"
→ "Gaveta ferramentas, garagem, prateleira B"
```

### 2. Lista de Compras AI-Powered

**Inteligência:**
- Aprende padrões de consumo: "Compras arroz a cada 3 semanas"
- Sugere automaticamente quando produto acaba
- Baseada no inventário actual
- Baseada no cardápio semanal planeado

**Features:**
- Categorização automática (mercearia, limpeza, higiene, etc.)
- Preços estimados (aprende de compras anteriores)
- Budget tracking integrado
- Partilhável com família ou empregada
- Voice input: "Adiciona leite"
- Scan de receita → adiciona ingredientes automaticamente
- Marcar itens comprados em tempo real
- Histórico de compras

**Integração com inventário:**
```
Cardápio semana pede: cebola, tomate, frango
Inventário mostra: ❌ cebola acabou, ✅ tomate tem, ❌ frango acabou

Lista automática gerada:
[ ] Cebola — 3 unidades
[ ] Frango — 1kg
[ ] Sugestão: Alho (sempre usas com frango)
```

**Integração VIDA.DINHEIRO:**
- "Lista de compras: 2.500 MT estimado"
- "Budget Mercado restante: 800 MT"
- "⚠️ Lista excede budget em 1.700 MT — remove itens não essenciais?"

### 3. Gestão de Empregada Doméstica

Feature crítica para contexto moçambicano. Empregada doméstica é normal e cultural.

**Configuração:**
```
Nome: Ana
Dias: Segunda, Quarta, Sexta
Horário: 7h-15h
Salário: 3.500 MT/mês
Telefone: +258 84...
```

**Calendário com Tarefas Rotatórias:**
```
Segunda:
├── Lavar roupa
├── Limpar quartos
├── Passar a ferro
└── Cozinha geral

Quarta:
├── Limpar casa de banho
├── Sala de estar
├── Varrer/esfregar chão
└── Vidros

Sexta:
├── Engomar roupa da semana
├── Trocar lençóis
├── Limpeza profunda cozinha
└── Organização geral
```

**Lista Semanal Especial:**
```
"Esta semana Ana deve:"
✅ Lavar cortinas sala
✅ Organizar armário Breno
✅ Limpar dentro de armários cozinha
⚠️ PRIORIDADE: Engomar camisas Bruno (viagem)
```

**Tracking:**
- Tarefas completas vs pendentes
- Horas trabalhadas
- Pagamento mensal (integra VIDA.DINHEIRO)
- Notas e observações
- Férias e faltas
- Múltiplas empregadas (Pro)

**Comunicação:**
- Lista printável (PDF)
- Enviar por WhatsApp
- Voice notes integrados
- Checklist visual simples

### 4. Cardápio Semanal Inteligente

**Configuração Inicial:**
```
Família:
├── Adultos: 2 (Vivianne + Bruno)
├── Crianças: 1 (Breno, 10 anos)
├── Restrições: Breno — TEA (texturas específicas, sem misturas)
├── Gostos:
│   ├── Vivianne: Saladas, peixe, comida leve
│   ├── Bruno: Carne, massas, comida caseira
│   └── Breno: Arroz, frango, batata (separado, sem molhos complexos)
```

**IA Gera Cardápio Semanal:**
```
SEGUNDA-FEIRA:
├── Almoço: Arroz branco + Frango grelhado + Salada
│   └── Breno: Arroz + Frango (separado, sem tempero forte)
├── Jantar: Massa à bolonhesa
│   └── Breno: Massa com manteiga (sem molho)

TERÇA-FEIRA:
├── Almoço: Peixe grelhado + Batata cozida + Legumes
│   └── Breno: Batata + Nuggets frango (backup preferido)
├── Jantar: Sopa de legumes + Pão
│   └── Breno: Arroz com frango desfiado
```

**Features do cardápio:**
- Adapta a gostos individuais de cada membro
- Considera restrições (TEA, alergias, intolerâncias)
- Rotação (não repete muito na mesma semana)
- Baseado em disponibilidade de ingredientes (inventário)
- Receitas com instruções para empregada
- PRINTÁVEL (deixar na cozinha para empregada)
- Prep ahead (o que preparar no fim de semana)
- Estimativa de custo por refeição

**Integração inventário:**
- "Tens frango no congelador — usa esta semana"
- "Tomate expira em breve — incluído no cardápio"
- Lista de compras gerada automaticamente a partir do cardápio

### 5. Manutenção Preventiva

**Tracking Automático por Área:**

```
CASA:
├── Pintar paredes: cada 3-5 anos
├── Limpar calhas: cada 6 meses
├── Trocar filtro AC: cada 3 meses
├── Verificar canalização: anual
├── Dedetização: semestral

ELECTRODOMÉSTICOS:
├── Descalcificar máquina café: mensal
├── Limpar filtro máquina lavar: trimestral
├── Verificar geladeira: anual
├── Limpar exaustor: trimestral

JARDIM/EXTERIOR:
├── Cortar relva: quinzenal
├── Podar árvores: anual
├── Verificar telhado: semestral
```

**Por cada manutenção:**
- Quando foi feito (última data)
- Quanto custou
- Quem fez (contacto)
- Fotos antes/depois
- Próxima data estimada

**Alertas:**
- "Semana que vem: trocar filtro AC"
- "Faz 2 anos que pintaste a sala — considera repintar"
- "Limpar filtro máquina lavar (último: 3 meses atrás)"

### 6. Utilities Tracking

**Monitora:**
- Água (consumo + custo)
- Luz (consumo + custo)
- Gás (quando reabastecer)
- Internet (velocidade + custo)
- Gasosa/crédito celular (padrão de uso)

**Features:**
- Gráficos de consumo mensal
- Comparação com mês anterior
- Previsão de próxima conta
- Alertas de consumo anormal
- Dicas de economia
- Historial de 12+ meses

**Exemplo de alerta:**
```
⚠️ "Consumo de luz 40% acima do normal"
💡 Possíveis causas: AC ligado mais tempo? Aparelho com problema?
💰 "Conta de luz estimada: 2.100 MT (+15% vs mês passado)"
💡 "Se desligares AC 2h/dia, economizas ~300 MT"
```

### 7. Documentos Importantes

**Guarda digital:**
- Escrituras
- Contratos (aluguer, serviços)
- Garantias de electrodomésticos
- Manuais (PDF)
- Recibos importantes
- Seguros
- IPRA (veículo)
- Contactos emergência

**OCR Inteligente:**
- Scan documento → extrai informação automaticamente
- "Garantia expira: 2027" → alerta antes de expirar

**Busca Rápida:**
```
"Onde está garantia da TV?"
→ "Pasta Garantias > Samsung TV > Expira Março 2027"
```

**Partilha Segura:**
- Com parceiro (acesso total)
- Com filhos (acesso limitado)
- Temporário (ex: com advogado, com mecânico)

### 8. Gestão de Serviços/Fornecedores

Database pessoal de contactos de serviços.

**Exemplo:**
```
Canalizador: João (+258...) — Rating: ⭐⭐⭐⭐⭐
  Último serviço: Jan 2026, Custo: 2.000 MT, "Rápido e honesto"

Electricista: Maria (+258...) — Rating: ⭐⭐⭐⭐
  Último: Nov 2025, Custo: 1.500 MT

Jardineiro: Carlos — Mensal, 1.500 MT
  Próxima visita: Dia 5

Dedetização: EmpresaX — Semestral
  Próxima: Junho 2026
```

**SEM marketplace.** Não contrata via app. Só organiza contactos pessoais. Zero disputes.

### 9. Zonas da Casa — Mapa Virtual

```
Cozinha
├── Despensa
│   ├── Prateleira A (cereais, massas)
│   ├── Prateleira B (enlatados)
│   └── Prateleira C (temperos)
├── Geladeira
│   ├── Porta (bebidas, condimentos)
│   ├── Prateleira superior (sobras)
│   └── Gaveta legumes
└── Armários (panelas, pratos, copos)

Garagem
├── Ferramentas
├── Jardim
└── Armazenamento

Quartos
├── Roupas
├── Brinquedos (Breno)
└── Livros
```

**Busca:**
```
"Onde está a chave inglesa?"
→ "Garagem > Ferramentas > Caixa vermelha"
```

### 10. Rotinas Automáticas

**Definir rotinas configuráveis:**

```
DIÁRIA:
├── ☀️ Manhã: Verificar lista tarefas
└── 🌙 Noite: Lembrete fechar janelas

SEMANAL:
├── Segunda: Lixo na rua
├── Sexta: Empregada vem
└── Sábado: Lavar roupa

MENSAL:
├── Pagar contas (integra VIDA.DINHEIRO)
├── Verificar inventário
└── Agendar manutenções
```

### 11. Features Moçambique Específicas

**Segurança Casa:**
- Alarme: código, quem tem acesso
- Chaves: quem tem, onde estão sobressalentes
- Portão: controlo remoto tracking

**Gestão Água:**
- Tanque de água: nível, última limpeza, capacidade
- Cisterna: manutenção
- Frequência de cortes de água (padrão)

**Gerador/UPS (Cortes de Energia):**
- Combustível: quanto tem, quando reabastecer
- Manutenção: última, próxima
- Teste mensal: lembrete ligar

**Jardim Tropical:**
- Rega: frequência por planta
- Adubo: tipo, quando aplicar
- Poda: calendário
- Pragas: tratamentos

**Senhas & Acessos:**
- WiFi (password partilhável)
- Alarme
- Contas streaming (Netflix, etc.)
- Portões/garagem

### 12. Dashboard Central

```
🏠 STATUS CASA
├── ✅ Tudo em ordem
├── ⚠️ 2 tarefas pendentes
└── 💡 3 sugestões IA

📦 INVENTÁRIO
├── 45 itens tracked
├── ⚠️ 3 expirando em breve
└── 8 itens para repor

🛒 LISTA COMPRAS
├── 12 itens
└── ~850 MT estimado

👩 EMPREGADA
├── Próximo dia: Sexta
└── Lista tarefas: 5 itens

🍽️ CARDÁPIO
├── Hoje: Frango grelhado + arroz
└── Amanhã: Peixe + batata

🔧 MANUTENÇÕES
├── ✅ 3 completas este mês
├── 📅 1 agendada
└── ⚠️ 2 atrasadas

💰 CUSTOS CASA
├── Este mês: 8.500 MT
├── Média: 7.200 MT
└── +18% vs normal
```

---

## Database Schema

```sql
-- Inventário
inventory_items (id, user_id, home_id, name, category, quantity, unit,
  expiry_date, location_zone, location_detail, cost, supplier, barcode,
  photo_url, reorder_threshold, avg_consumption_days, last_purchased)

-- Lista de Compras
shopping_lists (id, user_id, home_id, name, status, estimated_total, created_at)
shopping_items (id, list_id, name, quantity, unit, estimated_price,
  category, is_checked, inventory_item_id)

-- Empregada/Funcionários
home_employees (id, user_id, home_id, name, phone, role, salary,
  work_days, work_hours_start, work_hours_end, start_date, is_active)
employee_tasks (id, employee_id, title, description, day_of_week,
  frequency, priority, is_completed, completed_at, week_date)

-- Cardápio
meal_plans (id, user_id, home_id, week_start, status, created_at)
meal_plan_items (id, plan_id, day, meal_type, recipe_name, description,
  member_variations, prep_notes, estimated_cost)

-- Manutenções
maintenance_items (id, user_id, home_id, name, area, frequency_months,
  last_done, next_due, cost_last, provider_id, notes, photos)

-- Utilities
utility_readings (id, user_id, home_id, type, reading_value,
  cost, date, notes)

-- Documentos
home_documents (id, user_id, home_id, name, category, file_url,
  expiry_date, notes, extracted_data, created_at)

-- Fornecedores/Serviços
service_providers (id, user_id, name, phone, service_type,
  rating, last_service_date, last_cost, notes)

-- Zonas da Casa
home_zones (id, user_id, home_id, name, parent_zone_id, description)

-- Rotinas
routines (id, user_id, home_id, title, frequency, day_of_week,
  time, description, is_active)
```

---

## Free vs Pro

### Free
- 30 itens no inventário
- Lista de compras básica
- 1 calendário empregada
- Cardápio manual (sem IA)
- 3 manutenções tracked
- 5 documentos
- 1 zona da casa

### Pro (250 MT/mês)
Tudo do Free mais:
- Inventário ilimitado
- IA meal planning (cardápio automático)
- OCR avançado
- Múltiplas empregadas
- Cardápio imprimível com variações por membro
- Zonas ilimitadas
- Rotinas automáticas
- Documentos ilimitados
- Família (até 4 pessoas)
- Backup cloud
- Integração total VIDA.DINHEIRO
- Sem anúncios
