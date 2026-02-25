# VIDA.SAÚDE — Especificações Completas

## Conceito

Saúde familiar organizada digitalmente. Histórico médico, medicação, consultas, vacinação, custos. Tudo num lugar seguro e acessível.

**Tagline**: "Tua saúde e da tua família, organizada"

**Target**: Famílias moçambicanas que querem manter saúde em dia, gerir medicações, organizar consultas e controlar custos médicos.

---

## Features Core

### 1. Perfis Médicos Familiares

Um perfil completo para cada membro da família.

**Informação por perfil:**
```
Nome: Bruno
├── Tipo sanguíneo: O+
├── Alergias: Nenhuma conhecida
├── Condições crónicas: Hipertensão (controlada)
├── Cirurgias: Nenhuma
├── Medicação contínua: Losartana 50mg (1x/dia, manhã)
├── Vacinação: Completa e actualizada
├── Médico família: Dr. João (+258...)
├── Seguro: Medicus (apólice #1234)
├── Contacto emergência: Vivianne (+258...)
├── Peso actual: 82kg
├── Altura: 176cm
├── IMC: 26.5
└── Notas: Controlo tensão regular

Nome: Breno (10 anos, TEA)
├── Tipo sanguíneo: A+
├── Condições: TEA (Transtorno Espectro Autista)
├── Alergias: Lactose (intolerância leve)
├── Terapias activas:
│   ├── Terapia Ocupacional: 2x/semana
│   ├── Fonoaudiologia: 1x/semana
│   └── Psicologia: 1x/semana
├── Medicação: Nenhuma
├── Vacinação: Actualizada
├── Escola: Adaptações (IEP anexado)
├── Terapeuta principal: Dra. Ana
├── Pediatra: Dr. Carlos
└── Notas: Verbal, gosta de futebol, texturas específicas na alimentação
```

**Família alargada (opcional):**
- Avós (histórico médico familiar é importante)
- Irmãos
- Outros dependentes

### 2. Gestão de Medicação

**Por medicamento:**
```
Losartana 50mg (Bruno):
├── Para: Hipertensão
├── Dose: 1 comprimido
├── Frequência: 1x/dia
├── Horário: 8h00 (com pequeno-almoço)
├── Início: Março 2024
├── Prescrito por: Dr. João
├── Renovação receita: Cada 3 meses
├── Próxima renovação: 15 Março 2026
├── Farmácia habitual: Farmácia Moderna
├── Custo: 450 MT/caixa (30 comprimidos)
├── Stock actual: 18 comprimidos
└── Alerta reposição: Quando < 7 comprimidos
```

**Alertas:**
- Hora de tomar: "Bruno: Tomar Losartana" (8h00)
- Stock baixo: "Losartana — comprar esta semana (10 comprimidos restantes)"
- Renovar receita: "Renovar receita Losartana em 5 dias"
- Interacções: Aviso se adicionar medicamento que pode interagir

**Tracking de Adesão:**
- Registo diário: tomou / não tomou
- Percentagem de adesão mensal
- Gráfico de adesão ao longo do tempo
- Alerta se adesão cair abaixo de 90%

### 3. Calendário de Consultas & Exames

**Próximas consultas (todos os membros):**
```
📅 28 Fev — Breno — Terapia Ocupacional — 15h — Centro Terapêutico
📅 1 Mar — Bruno — Cardiologista (checkup) — 10h — Clínica Sommerschield
📅 3 Mar — Vivianne — Ginecologista — 14h30 — Clínica Sommerschield
📅 5 Mar — Breno — Fonoaudiologia — 16h — Centro Terapêutico
```

**Por consulta — histórico completo:**
```
15 Janeiro 2026 — Vivianne — Ginecologista
├── Médico: Dra. Marta Silva
├── Local: Clínica Sommerschield
├── Motivo: Checkup anual
├── Resultado: Tudo normal ✓
├── Exames pedidos: Papanicolau
├── Resultado exame: Aguardando
├── Custo: 2.500 MT
├── Reembolso seguro: 2.000 MT (80%)
├── Próxima: Janeiro 2027
└── Anexos: Receita.pdf, Pedido exame.pdf
```

**Recorrentes automáticos:**
- Breno terapias: 3x por semana (TO, Fono, Psico)
- Bruno cardiologista: semestral
- Vivianne ginecologista: anual
- Toda família dentista: semestral
- Toda família oftalmologista: anual

**Lembretes:**
- 1 semana antes: "Consulta Bruno cardiologista em 7 dias"
- 1 dia antes: "Amanhã: Breno Terapia Ocupacional 15h"
- Resultado pendente: "Resultado Papanicolau — ligar clínica"

### 4. Cartão Vacinal Digital

**Por membro — histórico completo:**
```
BRENO — Vacinação:

COMPLETAS:
✅ BCG (nascimento)
✅ Hepatite B (nascimento, 1m, 6m)
✅ Pentavalente (2m, 4m, 6m, 18m)
✅ Polio (2m, 4m, 6m, 18m, 4 anos)
✅ Sarampo/Rubéola (9m, 18m)
✅ Febre Amarela (9m)
✅ COVID-19 (2 doses + reforço)

PRÓXIMAS:
⏰ HPV: Aos 12 anos (2028)
```

**Para viagens:**
- "Viagem para Inhambane: ✅ Febre Amarela em dia"
- "Viagem para Niassa: ⚠️ Profilaxia malária recomendada"

### 5. Rede Médica & Fornecedores de Saúde

Database pessoal de médicos, clínicas, farmácias, laboratórios.

**Médicos:**
```
Dr. João Silva (Clínico Geral):
├── Local: Clínica Polana
├── Telefone: +258 84...
├── Consulta: 1.500 MT
├── Rating pessoal: ⭐⭐⭐⭐⭐
├── Notas: "Muito atencioso, explica bem"
├── Aceita seguro: Sim (Medicus)
└── Última consulta: Dezembro 2025
```

**Clínicas:**
```
Clínica Sommerschield:
├── Qualidade: ⭐⭐⭐⭐
├── Custo: Médio-Alto
├── Tempo espera: 15-30min
├── Aceita seguro: Sim
└── Especialidades: Ginecologia, Pediatria, Cardiologia
```

**Farmácias:**
```
Farmácia Moderna:
├── Localização: Sommerschield
├── Horário: 7h-22h
├── Entrega: Sim (Bolt)
├── Preços: Médios
└── Stock confiável: ✅
```

**Laboratórios:**
```
Lab Clínico Maputo:
├── Exames: Sangue, urina, imagem
├── Preços: 200-2.000 MT
├── Resultado: 24-48h
└── Confiável: ✅
```

### 6. Custos & Seguros de Saúde

**Despesas médicas familiares:**
```
Fevereiro 2026:
├── Terapias Breno (8 sessões): 6.400 MT
├── Medicação Bruno: 450 MT
├── Consulta Vivianne: 2.500 MT
├── Farmácia diversos: 800 MT
└── TOTAL: 10.150 MT

Média mensal: 9.500 MT
```

**Seguro Saúde:**
```
Medicus Família:
├── Plano: Família (3 pessoas)
├── Custo: 4.500 MT/mês
├── Cobertura:
│   ├── Consultas: 80%
│   ├── Exames: 70%
│   ├── Internamento: 90%
│   └── Cirurgias: 85%
├── Limite anual: 500.000 MT
├── Renovação: Agosto 2026
└── Apólice: PDF anexado
```

**Tracking Reembolsos:**
```
Consulta Vivianne (15 Jan):
├── Custo: 2.500 MT
├── Reembolso 80%: 2.000 MT
├── Submetido: 20 Janeiro
├── Status: Aprovado ✓
└── Pago: 28 Janeiro
```

**Integração VIDA.DINHEIRO:**
- Categoria "Saúde" auto-sincronizada
- Budget mensal saúde definido
- Fundo emergência médica tracking
- Alertas se gastos saúde excederem previsão

### 7. Plano de Emergência Familiar

**Contactos Rápidos (1 tap):**
```
🚑 Ambulância: 199
🏥 Hospital urgência: HCM (+258 21...)
👨‍⚕️ Dr. João (emergência): +258 84...
💊 Farmácia 24h: +258 82...
```

**Informação Crítica Rápida (para mostrar ao médico):**
```
Vivianne:
├── ALERGIA: PENICILINA ⚠️
├── Tipo sangue: A+
└── Seguro: Medicus #1234

Bruno:
├── Hipertensão (toma Losartana 50mg)
├── Tipo sangue: O+
└── Seguro: Medicus #1234

Breno:
├── TEA — pode ter dificuldade em comunicar
├── Intolerância lactose
├── Tipo sangue: A+
└── Contacto escola: +258...
```

**Hospitais por proximidade:**
1. Clínica Sommerschield (5 min)
2. Hospital Privado de Maputo (10 min)
3. Hospital Central de Maputo (15 min)

**Guia de Primeiros Socorros:**
- Guia rápido integrado na app
- Quando chamar ambulância
- O que fazer enquanto espera

### 8. Tracking de Saúde

**Bruno — Hipertensão:**
```
Pressão Arterial:
├── Meta: <130/85
├── Última medição: 125/80 ✅
├── Data: 25 Fevereiro 2026
├── Tendência: Controlada ✅
├── Gráfico: Últimos 6 meses
└── Alerta se >140/90
```

**Peso (qualquer membro):**
```
├── Actual: 82kg
├── Meta: 78kg
├── Tendência: -0.5kg/mês ✅
└── IMC: 26.5 (sobrepeso leve)
```

**Breno — Desenvolvimento:**
```
Terapias:
├── TO: 2x/semana ✅ (sessões realizadas)
├── Fono: 1x/semana ✅
├── Psico: 1x/semana ✅
├── Progresso global: Positivo 📈
└── Relatórios trimestrais: Anexados

Crescimento:
├── Altura: 140cm (percentil 50)
├── Peso: 32kg (percentil 45)
└── Desenvolvimento: Adequado
```

**Métricas opcionais (qualquer membro):**
- Peso
- Pressão arterial
- Glicemia
- Colesterol
- Sono (horas, qualidade)
- Humor (escala simples)
- Exercício (frequência)
- Água (litros/dia)

### 9. Saúde Moçambique — Específico

**Malária:**
- Tracking profilaxia quando viaja para zonas de risco
- Sintomas a vigiar
- Mosquiteiro tracking (comprar, trocar)
- Repelente stock

**Saúde Tropical:**
- Calendário de chuvas → época mais arriscada
- Água potável: filtro, fervura, lembrete

**Terapias Especializadas (TEA):**
- Directório de terapeutas disponíveis em Maputo
- Custos médios por terapia
- Tracking de progresso integrado
- Exercícios para fazer em casa
- Comunicação terapeuta-família

---

## Database Schema

```sql
-- Perfis Médicos
medical_profiles (id, user_id, family_member_id, blood_type, height_cm,
  allergies, chronic_conditions, surgeries, notes, emergency_contact,
  insurance_provider, insurance_policy, created_at, updated_at)

-- Medicações
medications (id, profile_id, name, dosage, frequency, times_per_day,
  schedule_times, purpose, prescriber, start_date, end_date,
  refill_frequency_days, pharmacy, cost_per_unit, stock_current,
  stock_alert_threshold, notes, is_active)

-- Tracking de Adesão Medicação
medication_logs (id, medication_id, scheduled_at, taken_at, skipped, notes)

-- Consultas/Appointments
appointments (id, profile_id, provider_id, type, date, time, location,
  reason, diagnosis, treatment, cost, insurance_reimbursement,
  reimbursement_status, follow_up_date, attachments, notes, created_at)

-- Vacinação
vaccinations (id, profile_id, vaccine_name, dose_number, date_given,
  location, batch_number, next_dose_date, notes)

-- Fornecedores de Saúde
health_providers (id, user_id, name, specialty, location, phone,
  consultation_cost, accepts_insurance, insurance_names,
  rating, notes, last_visit)

-- Exames/Resultados
exam_results (id, profile_id, appointment_id, exam_type, date,
  result_summary, result_file_url, normal_range, is_normal, notes)

-- Tracking Métricas
health_metrics (id, profile_id, metric_type, value, unit, date, notes)
  -- metric_type: weight, blood_pressure_sys, blood_pressure_dia,
  -- glucose, cholesterol, sleep_hours, mood_score, exercise_minutes, water_ml

-- Seguro Saúde
insurance_policies (id, user_id, provider, plan_name, policy_number,
  monthly_cost, coverage_details, annual_limit, renewal_date,
  members_covered, document_url, is_active)

-- Reembolsos
insurance_claims (id, policy_id, appointment_id, amount_claimed,
  amount_approved, status, submitted_date, resolved_date, notes)

-- Emergência
emergency_info (id, user_id, contacts, hospitals_nearby, first_aid_notes)
```

---

## Free vs Pro

### Free
- 3 perfis familiares
- Histórico médico básico
- Calendário consultas
- Alertas medicação (5 medicações)
- Vacinação tracking
- Informação emergência
- 5 fornecedores de saúde

### Pro (200 MT/mês)
Tudo do Free mais:
- Perfis ilimitados
- Medicações ilimitadas
- OCR receitas e exames
- Anexos ilimitados (PDFs, fotos)
- Tracking métricas avançado (peso, pressão, etc.)
- Integração VIDA.DINHEIRO (despesas saúde)
- Relatórios PDF
- Backup cloud
- Família até 6 pessoas
- Fornecedores ilimitados
- Reembolsos tracking
- Sem anúncios
