"use client";

import { useState } from "react";
import {
  Plus,
  Baby,
  GraduationCap,
  HeartPulse,
  Users,
  Trophy,
  Calendar,
  Tag,
  Filter,
  ChevronDown,
  Image as ImageIcon,
  Star,
} from "lucide-react";

/* ─── Types ─── */

type MilestoneCategory = "primeiro" | "educacao" | "saude" | "familia" | "conquista";

interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  dateLabel: string;
  person: string;
  personInitial: string;
  personColor: string;
  category: MilestoneCategory;
  hasPhoto: boolean;
  photoColor?: string;
}

/* ─── Mock Data ─── */

const categoryConfig: Record<
  MilestoneCategory,
  { label: string; icon: React.ComponentType<{ className?: string }>; color: string; bg: string }
> = {
  primeiro: { label: "Primeiro", icon: Baby, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
  educacao: { label: "Educacao", icon: GraduationCap, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
  saude: { label: "Saude", icon: HeartPulse, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  familia: { label: "Familia", icon: Users, color: "text-familia-500", bg: "bg-familia-50 dark:bg-familia-500/10" },
  conquista: { label: "Conquista", icon: Trophy, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
};

const milestones: Milestone[] = [
  {
    id: "ms1",
    title: "Familia toda vacinada COVID",
    description: "Todos os membros da familia completaram a vacinacao contra COVID-19. Uma grande conquista de saude familiar!",
    date: "2025-09-15",
    dateLabel: "Setembro 2025",
    person: "Familia",
    personInitial: "F",
    personColor: "bg-familia-500",
    category: "saude",
    hasPhoto: true,
    photoColor: "bg-emerald-200",
  },
  {
    id: "ms2",
    title: "Breno completou terapia nivel 1",
    description: "O Breno terminou com sucesso o primeiro nivel de terapia da fala. Progresso incrivel!",
    date: "2025-07-20",
    dateLabel: "Julho 2025",
    person: "Breno",
    personInitial: "B",
    personColor: "bg-amber-500",
    category: "conquista",
    hasPhoto: false,
  },
  {
    id: "ms3",
    title: "Aniversario de casamento",
    description: "Carlos e Maria celebraram 15 anos de casamento com um jantar romantico.",
    date: "2025-03-12",
    dateLabel: "Marco 2025",
    person: "Carlos & Maria",
    personInitial: "C",
    personColor: "bg-rose-500",
    category: "familia",
    hasPhoto: true,
    photoColor: "bg-rose-200",
  },
  {
    id: "ms4",
    title: "Sofia entrou na escola secundaria",
    description: "A Sofia comecou a escola secundaria no Liceu Eduardo Mondlane. Muito orgulho!",
    date: "2025-02-03",
    dateLabel: "Fevereiro 2025",
    person: "Sofia",
    personInitial: "S",
    personColor: "bg-purple-500",
    category: "educacao",
    hasPhoto: true,
    photoColor: "bg-blue-200",
  },
  {
    id: "ms5",
    title: "Tomas disse primeira palavra",
    description: "O Tomas disse 'mama' pela primeira vez! Um momento muito especial para toda a familia.",
    date: "2024-01-18",
    dateLabel: "Janeiro 2024",
    person: "Tomas",
    personInitial: "T",
    personColor: "bg-emerald-500",
    category: "primeiro",
    hasPhoto: true,
    photoColor: "bg-amber-200",
  },
];

const allCategories: MilestoneCategory[] = ["primeiro", "educacao", "saude", "familia", "conquista"];
const allPersons = ["Todos", "Tomas", "Sofia", "Breno", "Carlos & Maria", "Familia"];

export default function MarcosPage() {
  const [selectedCategory, setSelectedCategory] = useState<MilestoneCategory | "todos">("todos");
  const [selectedPerson, setSelectedPerson] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);

  const filteredMilestones = milestones.filter((m) => {
    const categoryMatch = selectedCategory === "todos" || m.category === selectedCategory;
    const personMatch = selectedPerson === "Todos" || m.person === selectedPerson;
    return categoryMatch && personMatch;
  });

  return (
    <div className="space-y-6">
      {/* ─── Header Stats ─── */}
      <div className="flex gap-3">
        <div className="flex-1 card text-center">
          <p className="text-2xl font-bold text-familia-500">{milestones.length}</p>
          <p className="text-xs text-muted-foreground">Marcos registados</p>
        </div>
        <div className="flex-1 card text-center">
          <p className="text-2xl font-bold text-amber-500">
            {milestones.filter((m) => m.category === "conquista").length}
          </p>
          <p className="text-xs text-muted-foreground">Conquistas</p>
        </div>
        <div className="flex-1 card text-center">
          <p className="text-2xl font-bold text-emerald-500">
            {new Set(milestones.map((m) => m.person)).size}
          </p>
          <p className="text-xs text-muted-foreground">Pessoas</p>
        </div>
      </div>

      {/* ─── Category Filter ─── */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        <button
          onClick={() => setSelectedCategory("todos")}
          className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
            selectedCategory === "todos"
              ? "bg-familia-500 text-white shadow-sm"
              : "bg-muted text-muted-foreground dark:bg-muted-dark"
          }`}
        >
          Todos
        </button>
        {allCategories.map((cat) => {
          const config = categoryConfig[cat];
          const Icon = config.icon;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-familia-500 text-white shadow-sm"
                  : "bg-muted text-muted-foreground dark:bg-muted-dark"
              }`}
            >
              <Icon className="h-3 w-3" />
              {config.label}
            </button>
          );
        })}
      </div>

      {/* ─── Person Filter ─── */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 text-xs font-medium text-muted-foreground"
      >
        <Filter className="h-3.5 w-3.5" />
        Filtrar por pessoa: <span className="text-familia-500 font-semibold">{selectedPerson}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
      </button>

      {showFilters && (
        <div className="flex flex-wrap gap-2">
          {allPersons.map((person) => (
            <button
              key={person}
              onClick={() => {
                setSelectedPerson(person);
                setShowFilters(false);
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                selectedPerson === person
                  ? "bg-familia-500 text-white"
                  : "bg-white border border-border text-muted-foreground dark:bg-surface-dark dark:border-border-dark"
              }`}
            >
              {person}
            </button>
          ))}
        </div>
      )}

      {/* ─── Timeline ─── */}
      <section>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Linha do tempo
        </h3>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border dark:bg-border-dark" />

          <div className="space-y-6">
            {filteredMilestones.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center ml-12">
                <Star className="mb-3 h-12 w-12 text-muted-foreground/30" />
                <p className="text-sm font-medium text-muted-foreground">
                  Nenhum marco encontrado para este filtro
                </p>
              </div>
            ) : (
              filteredMilestones.map((milestone) => {
                const config = categoryConfig[milestone.category];
                const CatIcon = config.icon;

                return (
                  <div key={milestone.id} className="relative flex gap-4">
                    {/* Timeline dot */}
                    <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.bg} ring-4 ring-background dark:ring-background-dark`}>
                      <CatIcon className={`h-5 w-5 ${config.color}`} />
                    </div>

                    {/* Content card */}
                    <div className="flex-1 card transition-all hover:shadow-soft-lg">
                      {/* Date badge */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {milestone.dateLabel}
                        </span>
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${config.bg} ${config.color}`}>
                          <CatIcon className="h-2.5 w-2.5" />
                          {config.label}
                        </span>
                      </div>

                      {/* Photo placeholder */}
                      {milestone.hasPhoto && (
                        <div className={`mb-3 flex h-32 items-center justify-center rounded-xl ${milestone.photoColor}`}>
                          <ImageIcon className="h-8 w-8 text-white/60" />
                        </div>
                      )}

                      {/* Title */}
                      <h4 className="text-sm font-bold text-on-surface dark:text-on-surface-dark">
                        {milestone.title}
                      </h4>

                      {/* Description */}
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {milestone.description}
                      </p>

                      {/* Person tag */}
                      <div className="mt-3 flex items-center gap-2">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full ${milestone.personColor} text-[10px] font-bold text-white`}
                        >
                          {milestone.personInitial}
                        </div>
                        <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                          <Tag className="h-3 w-3" />
                          {milestone.person}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* ─── FAB: Add Milestone ─── */}
      <button className="fab" aria-label="Adicionar marco">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
