# VIDA.FAMÍLIA — Especificações Completas

## Conceito

O coração do ecossistema VIDA. Hub central que coordena toda a família, conecta as outras apps, e serve como "home screen" da vida familiar. Calendário central, tarefas, comunicação, memórias, metas conjuntas.

**Tagline**: "O coração da tua família, digital"

**Target**: Famílias que querem coordenar vida, partilhar responsabilidades e preservar memórias.

---

## Features Core

### 1. Núcleo Familiar — Membros & Permissões

**Membros Principais:**
```
👩 Vivianne (Admin) — vê e edita tudo
👨 Bruno (Admin) — vê e edita tudo
👦 Breno (10 anos) — vê agenda dele, tarefas dele
```

**Família Alargada (opcional):**
```
👵 Mãe Vivianne — vê fotos, eventos
👴 Pai Vivianne — vê fotos, eventos
👵 Mãe Bruno — vê fotos, eventos
Irmãos, primos, etc.
```

**Círculo de Confiança (acesso limitado):**
```
👶 Babysitter — vê calendário Breno, contactos emergência
🏠 Empregada Ana — vê lista tarefas, cardápio
👨‍⚕️ Terapeuta Breno — vê progresso, exercícios
```

**Níveis de permissão:**
- Admin: vê e edita tudo
- Membro: vê tudo, edita o seu
- Criança: vê agenda e tarefas próprias
- Alargada: vê fotos e eventos (read-only)
- Confiança: acesso a secções específicas, temporário

### 2. Calendário Familiar Central

O MEGA CALENDÁRIO que puxa eventos de TODAS as apps VIDA.

**Visão do Dia:**
```
HOJE — 28 Fevereiro:
├── 8h00 — Breno: Escola
├── 9h00 — Vivianne: Reunião Banco de Moçambique
├── 10h00 — Ana (empregada): Limpeza geral
├── 15h00 — Breno: Terapia Ocupacional [de VIDA.SAÚDE]
├── 17h30 — Bruno: Ginásio
├── 19h00 — FAMÍLIA: Jantar juntos 🍽️
└── 20h00 — Breno: Hora de dormir
```

**Visão da Semana:**
```
Segunda:
├── Breno: Escola + Terapia Fono [SAÚDE]
├── Lixo na rua [LAR]
└── Vivianne: Escrita à noite

Terça:
├── TODOS: Dentista família [SAÚDE]
├── Ana: Dia dela [LAR]
└── Aniversário Bruno 🎂

Sábado:
├── Breno: Jogo futebol (manhã)
├── Família: Parque Tunduru (tarde)
└── Jantar avós (noite)
```

**Sincronização automática de:**
- VIDA.SAÚDE → consultas, terapias
- VIDA.LAR → empregada, manutenções
- Escola Breno → horários, eventos
- Aniversários → toda a família
- Feriados Moçambique
- Eventos recorrentes

**Tipos de eventos (códigos de cor):**
- 🏫 Escola/Trabalho (azul)
- 👨‍⚕️ Médico/Terapias (vermelho)
- 🎉 Celebrações (amarelo)
- 🏠 Casa (verde)
- 👨‍👩‍👧‍👦 Tempo família (roxo)
- ✈️ Viagens (laranja)
- 🎁 Eventos importantes (dourado)

### 3. Comunicação Familiar

**Chat Interno (E2E Encrypted):**

```
Grupo "Nossa Família" (Vivianne + Bruno + Breno):
├── Chat diário
├── Fotos instantâneas
├── Voice notes
├── Localização partilha (segura)
├── Listas partilhadas
└── Polls rápidos

Exemplo:
👩 Vivianne: "Bruno, pegas Breno hoje? Reunião atrasou"
👨 Bruno: "👍 Sim, pego às 15h30"
👦 Breno: [Emoji futebol] "Posso jogar depois?"
👩 Vivianne: "30min ok, depois banho!"
```

**Grupos especiais:**
- "Pais" (Vivianne + Bruno) — decisões de casal
- "Avós" (4 avós + pais) — fotos Breno, eventos
- "Equipa Breno" (pais + terapeutas) — coordenação terapias

**Features:**
- Mensagens com timer (desaparecem em 24h, se quiser)
- Partilha localização em tempo real (segura)
- Botão SOS (emergência familiar)
- Lembretes via chat: "Não esquecer..."
- Privacidade total (E2E encrypted)
- Sem ads, sem tracking externo

### 4. Tarefas & Responsabilidades

**Distribuição Familiar:**
```
BRUNO:
├── ✅ Levar Breno escola (manhãs)
├── ✅ Supermercado (Sábados)
├── ✅ Lixo na rua (Segundas)
├── ✅ Pagar contas casa
└── ✅ Manutenção carro

VIVIANNE:
├── ✅ Buscar Breno escola (tardes)
├── ✅ Coordenar terapias Breno
├── ✅ Gestão empregada
├── ✅ Planeamento refeições
└── ✅ Compras roupa/casa

BRENO (responsabilidades idade-apropriadas):
├── ✅ Arrumar quarto
├── ✅ Colocar roupa suja no cesto
├── ✅ Ajudar pôr mesa
├── ✅ Regar planta dele
└── ✅ Escolher roupa dia seguinte
```

**Rotação justa:**
- Semana A: Bruno cozinha Sábado
- Semana B: Vivianne cozinha Sábado
- Sistema sugere baseado em histórico

**Tarefas pontuais:**
```
[ ] Comprar presente aniversário avó (Bruno) — até 10 Mar
[ ] Marcar revisão carro (Bruno) — esta semana
[ ] Reunião escola Breno (Vivianne) — 15 Mar
[ ] Renovar licença bebidas (Bruno — BIZ) — Março
```

**Gamificação Breno:**
- ⭐ Estrelas por cada tarefa completa
- 🏆 10 estrelas = recompensa (escolher filme família, tempo extra futebol)
- Visual motivador adaptado à idade
- Celebra conquistas

### 5. Finanças Família — Overview

Dashboard financeiro que puxa de VIDA.DINHEIRO (visão executiva, não duplica).

```
RECEITAS FAMÍLIA: 117.000 MT/mês
├── Vivianne: 65.000 MT
└── Bruno: 52.000 MT

DESPESAS FIXAS: 62.000 MT
DESPESAS VARIÁVEIS: ~25.000 MT
POUPANÇA: 23.000 MT
SOBRA: ~7.000 MT

METAS ACTIVAS:
├── Férias Dezembro: 44% ✓
├── Carro Novo: 22%
└── Emergência: 78%

ALERTAS:
├── "Mês que vem: IPRA 8.000 MT"
└── "Meta férias no caminho ✅"
```

Quick link: "Ver detalhes completos → VIDA.DINHEIRO"

### 6. Metas & Sonhos Família

Objectivos CONJUNTOS que motivam toda a família.

```
🏖️ FÉRIAS FAMÍLIA DEZEMBRO 2026:
├── Destino: Vilankulo / Bazaruto
├── Orçamento: 80.000 MT
├── Guardado: 35.000 MT (44%)
├── Falta: 45.000 MT
├── Por mês: 4.500 MT
├── Status: ✅ No caminho
└── Foto de sonho: [imagem praia Bazaruto]

🚗 CARRO NOVO (2027):
├── Modelo: SUV 7 lugares
├── Valor: 800.000 MT (entrada 300.000 MT)
├── Guardado: 112.000 MT (37%)
└── Status: 🔥 Acelerando

🏠 CASA PRÓPRIA (2030):
├── Entrada 20%: 700.000 MT
├── Guardado: 85.000 MT (12%)
└── Status: 📈 Longo prazo, consistente

🎓 UNIVERSIDADE BRENO (2034):
├── Estimativa: 2.000.000 MT
├── Guardado: 160.000 MT (8%)
└── Status: ⏳ Investindo cedo
```

**Visualização:**
- Progress bars visuais e motivadores
- Marcos celebrados (25%, 50%, 75%)
- Fotos do sonho (tangibilizar)
- "Vocês conseguem!" — mensagens motivacionais

### 7. Memórias & Momentos

**Álbum Família Digital (Privado):**
- Fotos e vídeos organizados por data, pessoa, evento, local
- Albums especiais: "Crescimento Breno", "Férias família", "Conquistas"
- Pesquisa: "Breno aniversário 2025"
- Privacidade total (só família vê)
- Partilha links temporários (ex: avós)
- Backup automático cloud

**Marcos Importantes:**
```
├── Primeira palavra Breno (gravação)
├── Primeiro dia escola
├── Progressos terapias
├── Golo no futebol
├── Viagens família
└── Timeline visual bonita
```

**Diário Família:**
```
"28 Fev 2026 — Breno marcou GOL hoje! Ficou tão feliz
que repetiu 'GOL GOL GOL' a noite toda 😂⚽"
```
- Voice notes, fotos, texto
- Preservar momentos
- Ler no futuro com nostalgia

**Partilha Segura:**
- Avós: álbum Breno (read-only)
- Terapeutas: vídeos progresso (permissão temporária)
- Escola: fotos eventos (autorização)

### 8. Breno — Hub Dedicado (TEA Support)

Secção especial dentro de VIDA.FAMÍLIA para acompanhamento de Breno.

**Desenvolvimento:**
- Marcos por idade
- Progresso nas terapias (gráficos)
- Relatórios trimestrais dos terapeutas (anexados)
- Evolução visual ao longo dos anos
- Celebração de conquistas

**Escola:**
- Horários aulas
- Contacto professora
- IEP (Plano Educacional Individualizado) — documento
- Notas e observações
- Eventos escolares
- Comunicação escola-casa

**Terapias:**
- Calendário TO, Fono, Psico (sincronizado com SAÚDE)
- Exercícios para fazer em casa
- Progresso semanal
- Objectivos de cada terapia
- Rede de apoio

**Rotinas Visuais (para Breno ver):**
```
MANHÃ: [ícones visuais]
Acordar → Banho → Pequeno-almoço → Vestir → Escola

TARDE:
Escola → Lanche → Terapia → Brincar → Banho

NOITE:
Jantar → Tempo livre → História → Dormir
```
Previsibilidade = segurança para crianças TEA

**Interesses (para motivação/recompensas):**
- ⚽ Futebol (obsessão!)
- 🚗 Carros
- 🎮 Jogos específicos
- Usar estes interesses como motivadores nas tarefas

### 9. Eventos & Celebrações

**Calendário Especial:**
```
Aniversários:
├── Breno: 15 Maio
├── Bruno: 3 Março
├── Vivianne: 22 Setembro
├── Mãe Vivianne: 10 Junho
└── (todos da família)
```

**Alertas inteligentes:**
```
"Aniversário Bruno em 3 dias!"
├── Ideias presente (baseado em gostos dele)
├── Restaurantes favoritos
├── Budget disponível: 5.000 MT
└── "Breno quer fazer cartão?"
```

**Tradições Família:**
- Pizza Sextas (quando possível)
- Parque Domingos
- Filme família Sábado noite
- Jantar avós 1x/mês
- Sistema lembra!

**Feriados Moçambique:**
- Dia da Mulher (8 Março)
- Dia do Trabalhador (1 Maio)
- Independência (25 Junho)
- Planeamento antecipado

**Cerimónias:**
- Lobolo primo (Maio) — budget + planeamento
- Casamento amiga (Julho) — budget + presente
- Funerais (imprevistos) — fundo emergência social

### 10. Mega Dashboard Central

O "painel de controlo" de toda a vida familiar.

```
👨‍👩‍👧‍👦 BOM DIA, FAMÍLIA!

📅 HOJE:
├── 3 eventos
├── Bruno: Reunião 10h
├── Breno: Terapia 15h
└── Jantar em casa 🍽️

💰 FINANÇAS [de DINHEIRO]:
├── Saldo total: 85.000 MT
├── Gastos mês: 67.000 MT / 87.000 MT orçamento
└── Meta férias: 44% ✓

🏠 CASA [de LAR]:
├── Empregada amanhã
├── Cardápio hoje: Frango grelhado
└── ⚠️ Trocar filtro AC (5 dias)

🏥 SAÚDE [de SAÚDE]:
├── Bruno: Tomar Losartana ✅
├── Breno: 3 terapias esta semana
└── Próxima consulta: Bruno cardio, 1 Mar

⚡ ALERTAS:
├── "IPRA vence Março — 8.000 MT"
├── "Aniversário Bruno em 3 dias"
└── "Stock leite baixo — adicionar lista?"

🎯 QUICK ACTIONS:
[+ Evento] [Lista compras] [Lembrete] [Chat família]
```

### 11. Integrações com Outras Apps VIDA

FAMÍLIA é o maestro que orquestra tudo.

```
FAMÍLIA → DINHEIRO:
├── Dashboard financeiro família
├── Metas conjuntas
├── Budget família
└── "Como estamos financeiramente?"

FAMÍLIA → LAR:
├── Calendário empregada
├── Lista compras
├── Cardápio semana
└── "O que tem para jantar?"

FAMÍLIA → SAÚDE:
├── Consultas todos
├── Medicação família
├── Vacinas Breno
└── "Próximos appointments?"

FAMÍLIA → BIZ.MZ (se aplicável):
├── Separar vida pessoal/profissional
├── "Quanto tempo trabalho está a tomar da família?"
└── Work-life balance awareness
```

---

## Database Schema

```sql
-- Grupos Familiares
family_groups (id, name, created_by, invite_code, created_at)

-- Membros
family_members (id, family_id, user_id, name, role, avatar_url,
  date_of_birth, permissions, is_active)

-- Calendário
calendar_events (id, family_id, creator_id, title, description,
  date, time_start, time_end, recurrence, color, category,
  assigned_to, source_app, source_id, location, reminders)

-- Tarefas
family_tasks (id, family_id, assigned_to, title, description,
  due_date, priority, status, recurrence, category,
  gamification_points, completed_at)

-- Chat/Mensagens
chat_messages (id, family_id, group_name, sender_id, content,
  type, media_url, is_read, expires_at, created_at)

-- Fotos/Memórias
family_photos (id, family_id, uploader_id, file_url, thumbnail_url,
  caption, tagged_members, event_name, location, date_taken, created_at)

-- Marcos
milestones (id, family_id, member_id, title, description,
  date, photo_url, category, created_at)

-- Diário
family_diary (id, family_id, author_id, content, media_urls,
  mood, date, created_at)

-- Metas Família
family_goals (id, family_id, name, target_amount, current_amount,
  deadline, icon, photo_url, category, created_at)

-- Tradições
family_traditions (id, family_id, name, frequency, description,
  last_date, next_date)

-- Rotinas Breno (TEA)
child_routines (id, member_id, routine_name, time_of_day,
  steps, visual_icons, is_active)
```

---

## Free vs Pro

### Free
- 4 membros núcleo
- Calendário básico (sem sync com outras apps)
- Chat família
- Tarefas simples (sem gamificação)
- Fotos: 1 GB
- 3 metas família

### Pro (400 MT/mês)
Tudo do Free mais:
- Membros ilimitados (incluindo família alargada)
- Calendário avançado (sync com SAÚDE, LAR)
- Chat com grupos múltiplos
- Tarefas gamificadas (estrelas, recompensas)
- Fotos ilimitadas + backup cloud
- Integração TOTAL com DINHEIRO, LAR, SAÚDE
- Dashboard mega
- Hub Breno (TEA completo)
- Relatórios família
- Diário família ilimitado
- Sem anúncios
- Suporte prioritário
