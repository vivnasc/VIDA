"use client";

import { useState } from "react";
import {
  Plus,
  Mail,
  Phone,
  Shield,
  Crown,
  Baby,
  User,
  UserPlus,
  Copy,
  Link as LinkIcon,
  ChevronRight,
  Settings,
  Heart,
  GraduationCap,
  Users,
} from "lucide-react";

/* ─── Types ─── */

type MemberRole = "admin" | "membro" | "crianca";

interface FamilyMember {
  id: string;
  name: string;
  initial: string;
  color: string;
  role: MemberRole;
  relationship: string;
  email?: string;
  phone?: string;
  linkedApps: string[];
  permissions: string[];
}

interface TrustedPerson {
  id: string;
  name: string;
  initial: string;
  color: string;
  role: string;
  phone: string;
}

/* ─── Mock Data ─── */

const roleLabels: Record<MemberRole, string> = {
  admin: "Administrador",
  membro: "Membro",
  crianca: "Crianca",
};

const roleIcons: Record<MemberRole, React.ComponentType<{ className?: string }>> = {
  admin: Crown,
  membro: User,
  crianca: Baby,
};

const roleColors: Record<MemberRole, { text: string; bg: string }> = {
  admin: { text: "text-amber-700 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-500/20" },
  membro: { text: "text-blue-700 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-500/20" },
  crianca: { text: "text-purple-700 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-500/20" },
};

const familyMembers: FamilyMember[] = [
  {
    id: "1",
    name: "Carlos Silva",
    initial: "C",
    color: "bg-blue-500",
    role: "admin",
    relationship: "Pai",
    email: "carlos@email.com",
    phone: "+258 84 123 4567",
    linkedApps: ["Familia", "Dinheiro", "Lar", "Saude"],
    permissions: ["Gerir membros", "Gerir financas", "Todas as apps"],
  },
  {
    id: "2",
    name: "Maria Silva",
    initial: "M",
    color: "bg-rose-500",
    role: "admin",
    relationship: "Mae",
    email: "maria@email.com",
    phone: "+258 84 234 5678",
    linkedApps: ["Familia", "Dinheiro", "Lar", "Saude"],
    permissions: ["Gerir membros", "Gerir financas", "Todas as apps"],
  },
  {
    id: "3",
    name: "Tomas Silva",
    initial: "T",
    color: "bg-emerald-500",
    role: "crianca",
    relationship: "Filho (8 anos)",
    email: undefined,
    phone: undefined,
    linkedApps: ["Familia", "Saude"],
    permissions: ["Ver tarefas", "Ver calendario"],
  },
  {
    id: "4",
    name: "Sofia Silva",
    initial: "S",
    color: "bg-purple-500",
    role: "membro",
    relationship: "Filha (14 anos)",
    email: "sofia@email.com",
    phone: "+258 84 345 6789",
    linkedApps: ["Familia", "Saude"],
    permissions: ["Ver tarefas", "Ver calendario", "Chat"],
  },
  {
    id: "5",
    name: "Breno Silva",
    initial: "B",
    color: "bg-amber-500",
    role: "crianca",
    relationship: "Filho (5 anos)",
    email: undefined,
    phone: undefined,
    linkedApps: ["Familia", "Saude"],
    permissions: ["Ver tarefas"],
  },
];

const extendedFamily: FamilyMember[] = [
  {
    id: "e1",
    name: "Rosa Santos",
    initial: "R",
    color: "bg-pink-500",
    role: "membro",
    relationship: "Avo Materna",
    email: "rosa@email.com",
    phone: "+258 84 456 7890",
    linkedApps: ["Familia"],
    permissions: ["Ver calendario", "Chat"],
  },
  {
    id: "e2",
    name: "Joao Santos",
    initial: "J",
    color: "bg-indigo-500",
    role: "membro",
    relationship: "Tio",
    email: "joao@email.com",
    phone: "+258 84 567 8901",
    linkedApps: ["Familia"],
    permissions: ["Ver calendario", "Chat"],
  },
];

const trustedCircle: TrustedPerson[] = [
  {
    id: "t1",
    name: "Ana Mendes",
    initial: "A",
    color: "bg-teal-500",
    role: "Baba",
    phone: "+258 84 678 9012",
  },
  {
    id: "t2",
    name: "Prof. Carla",
    initial: "C",
    color: "bg-cyan-500",
    role: "Professora do Tomas",
    phone: "+258 84 789 0123",
  },
];

export default function MembrosPage() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [showInvite, setShowInvite] = useState(false);
  const inviteCode = "SILVA-FAM-2025";

  const selectedData = [...familyMembers, ...extendedFamily].find(
    (m) => m.id === selectedMember
  );

  return (
    <div className="space-y-6">
      {/* ─── Family Header ─── */}
      <div className="card bg-gradient-to-br from-familia-500 to-familia-600 border-none text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
            <Heart className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Familia Silva</h2>
            <p className="text-sm text-white/80">{familyMembers.length + extendedFamily.length} membros</p>
          </div>
        </div>
      </div>

      {/* ─── Core Family Members ─── */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Nucleo familiar
        </h3>
        <div className="space-y-2">
          {familyMembers.map((member) => {
            const RoleIcon = roleIcons[member.role];
            const colors = roleColors[member.role];
            return (
              <button
                key={member.id}
                onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                className="flex w-full items-center gap-3 rounded-xl border border-border bg-white p-3 text-left transition-all hover:shadow-soft dark:border-border-dark dark:bg-surface-dark"
              >
                {/* Avatar */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${member.color} text-lg font-bold text-white`}
                >
                  {member.initial}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-on-surface dark:text-on-surface-dark">
                      {member.name}
                    </p>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${colors.bg} ${colors.text}`}>
                      <RoleIcon className="h-2.5 w-2.5" />
                      {roleLabels[member.role]}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{member.relationship}</p>
                </div>

                <ChevronRight className={`h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform ${selectedMember === member.id ? "rotate-90" : ""}`} />
              </button>
            );
          })}
        </div>

        {/* ─── Member Detail Expansion ─── */}
        {selectedData && (
          <div className="mt-3 card border-familia-200 dark:border-familia-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full ${selectedData.color} text-xl font-bold text-white`}
              >
                {selectedData.initial}
              </div>
              <div>
                <h4 className="text-base font-bold text-on-surface dark:text-on-surface-dark">
                  {selectedData.name}
                </h4>
                <p className="text-xs text-muted-foreground">{selectedData.relationship}</p>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-2 mb-4">
              {selectedData.email && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{selectedData.email}</span>
                </div>
              )}
              {selectedData.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{selectedData.phone}</span>
                </div>
              )}
            </div>

            {/* Linked apps */}
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                Apps associadas
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedData.linkedApps.map((app) => (
                  <span
                    key={app}
                    className="rounded-full bg-familia-50 px-3 py-1 text-xs font-medium text-familia-600 dark:bg-familia-500/10 dark:text-familia-400"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>

            {/* Permissions */}
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                Permissoes
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedData.permissions.map((perm) => (
                  <span
                    key={perm}
                    className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                  >
                    <Shield className="h-3 w-3" />
                    {perm}
                  </span>
                ))}
              </div>
            </div>

            {/* Manage button */}
            <button className="mt-4 w-full btn-secondary flex items-center justify-center gap-2">
              <Settings className="h-4 w-4" />
              Gerir permissoes
            </button>
          </div>
        )}
      </section>

      {/* ─── Extended Family ─── */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Familia alargada
        </h3>
        <div className="space-y-2">
          {extendedFamily.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-white p-3 transition-all hover:shadow-soft dark:border-border-dark dark:bg-surface-dark"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${member.color} text-sm font-bold text-white`}
              >
                {member.initial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-on-surface dark:text-on-surface-dark">
                  {member.name}
                </p>
                <p className="text-xs text-muted-foreground">{member.relationship}</p>
              </div>
              <Users className="h-4 w-4 shrink-0 text-muted-foreground/40" />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Trusted Circle ─── */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Circulo de confianca
        </h3>
        <div className="space-y-2">
          {trustedCircle.map((person) => (
            <div
              key={person.id}
              className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-white/50 p-3 dark:border-border-dark dark:bg-surface-dark/50"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${person.color} text-sm font-bold text-white`}
              >
                {person.initial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-on-surface dark:text-on-surface-dark">
                  {person.name}
                </p>
                <p className="text-xs text-muted-foreground">{person.role}</p>
              </div>
              <a
                href={`tel:${person.phone}`}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Invite Section ─── */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Convidar membro
        </h3>
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-familia-50 dark:bg-familia-500/10">
              <UserPlus className="h-5 w-5 text-familia-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface dark:text-on-surface-dark">
                Convida alguem para a familia
              </p>
              <p className="text-xs text-muted-foreground">Partilha o codigo ou link</p>
            </div>
          </div>

          {/* Invite code */}
          <div className="flex items-center gap-2 rounded-xl bg-muted p-3 dark:bg-muted-dark">
            <code className="flex-1 text-sm font-mono font-bold text-on-surface dark:text-on-surface-dark">
              {inviteCode}
            </code>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm transition-colors hover:bg-familia-50 dark:bg-surface-dark dark:hover:bg-familia-500/10">
              <Copy className="h-4 w-4 text-familia-500" />
            </button>
          </div>

          {/* Buttons */}
          <div className="mt-3 flex gap-2">
            <button className="btn-primary flex-1 text-xs">
              <LinkIcon className="h-3.5 w-3.5" />
              Copiar link
            </button>
            <button className="btn-secondary flex-1 text-xs">
              <Mail className="h-3.5 w-3.5" />
              Enviar convite
            </button>
          </div>
        </div>
      </section>

      {/* ─── FAB: Add Member ─── */}
      <button className="fab" aria-label="Adicionar membro">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
