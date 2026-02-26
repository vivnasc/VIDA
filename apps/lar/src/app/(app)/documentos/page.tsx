"use client";

import { useState } from "react";
import {
  FileText,
  Search,
  Plus,
  Upload,
  Calendar,
  AlertTriangle,
  Car,
  Home,
  User,
  Shield,
  FileCheck,
  ChevronRight,
  Clock,
  Filter,
} from "lucide-react";

/* ─── Types ─── */
type DocCategory = "Casa" | "Veículos" | "Identidade" | "Garantias" | "Contratos";

interface Document {
  id: string;
  name: string;
  category: DocCategory;
  type: string;
  expiryDate?: string;
  issueDate: string;
  notes?: string;
  holder?: string;
}

/* ─── Mock Data ─── */
const documents: Document[] = [
  {
    id: "1",
    name: "Escritura da Casa",
    category: "Casa",
    type: "Escritura",
    issueDate: "2020-06-15",
    notes: "Matola, Bairro do Fomento",
  },
  {
    id: "2",
    name: "Contrato de Renda",
    category: "Casa",
    type: "Contrato",
    expiryDate: "2027-01-31",
    issueDate: "2024-02-01",
    notes: "Renovação automática",
  },
  {
    id: "3",
    name: "Seguro Automóvel - Toyota Hilux",
    category: "Veículos",
    type: "Seguro",
    expiryDate: "2026-06-30",
    issueDate: "2025-07-01",
    holder: "João Silva",
  },
  {
    id: "4",
    name: "Inspecção Veicular",
    category: "Veículos",
    type: "Inspecção",
    expiryDate: "2026-04-15",
    issueDate: "2025-04-15",
    holder: "João Silva",
  },
  {
    id: "5",
    name: "BI - João Silva",
    category: "Identidade",
    type: "BI",
    expiryDate: "2028-03-20",
    issueDate: "2023-03-20",
    holder: "João Silva",
  },
  {
    id: "6",
    name: "BI - Maria Silva",
    category: "Identidade",
    type: "BI",
    expiryDate: "2027-08-10",
    issueDate: "2022-08-10",
    holder: "Maria Silva",
  },
  {
    id: "7",
    name: "Passaporte - João Silva",
    category: "Identidade",
    type: "Passaporte",
    expiryDate: "2026-05-01",
    issueDate: "2021-05-01",
    holder: "João Silva",
  },
  {
    id: "8",
    name: "Passaporte - Maria Silva",
    category: "Identidade",
    type: "Passaporte",
    expiryDate: "2029-11-15",
    issueDate: "2024-11-15",
    holder: "Maria Silva",
  },
  {
    id: "9",
    name: "Garantia - Frigorífico Samsung",
    category: "Garantias",
    type: "Garantia",
    expiryDate: "2026-03-30",
    issueDate: "2024-03-30",
  },
  {
    id: "10",
    name: "Garantia - Ar Condicionado",
    category: "Garantias",
    type: "Garantia",
    expiryDate: "2027-09-01",
    issueDate: "2025-09-01",
  },
  {
    id: "11",
    name: "Contrato Empregada Doméstica",
    category: "Contratos",
    type: "Contrato Trabalho",
    expiryDate: "2026-12-31",
    issueDate: "2024-01-01",
    holder: "Graça Mondlane",
  },
  {
    id: "12",
    name: "Contrato Internet Vodacom",
    category: "Contratos",
    type: "Contrato Serviço",
    expiryDate: "2026-08-01",
    issueDate: "2024-08-01",
  },
  {
    id: "13",
    name: "DIRE - João Silva",
    category: "Identidade",
    type: "DIRE",
    expiryDate: "2026-03-15",
    issueDate: "2024-03-15",
    holder: "João Silva",
  },
  {
    id: "14",
    name: "NUIT - Família Silva",
    category: "Identidade",
    type: "NUIT",
    issueDate: "2020-01-10",
    notes: "Número Único de Identificação Tributária",
  },
];

const categoryIcons: Record<DocCategory, typeof Home> = {
  Casa: Home,
  Veículos: Car,
  Identidade: User,
  Garantias: Shield,
  Contratos: FileCheck,
};

const categoryColors: Record<DocCategory, { bg: string; text: string; badge: string }> = {
  Casa: { bg: "bg-blue-100", text: "text-blue-600", badge: "bg-blue-100 text-blue-700" },
  Veículos: { bg: "bg-purple-100", text: "text-purple-600", badge: "bg-purple-100 text-purple-700" },
  Identidade: { bg: "bg-emerald-100", text: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700" },
  Garantias: { bg: "bg-orange-100", text: "text-orange-600", badge: "bg-orange-100 text-orange-700" },
  Contratos: { bg: "bg-indigo-100", text: "text-indigo-600", badge: "bg-indigo-100 text-indigo-700" },
};

function getExpiryStatus(expiryDate?: string): { label: string; color: string } | null {
  if (!expiryDate) return null;
  const now = new Date();
  const expiry = new Date(expiryDate);
  const daysUntil = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntil < 0) return { label: "Expirado", color: "bg-red-100 text-red-700" };
  if (daysUntil <= 30) return { label: `Expira em ${daysUntil} dias`, color: "bg-red-100 text-red-700" };
  if (daysUntil <= 90) return { label: `Expira em ${Math.floor(daysUntil / 30)} meses`, color: "bg-amber-100 text-amber-700" };
  return null;
}

export default function DocumentosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<DocCategory | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  const categories: DocCategory[] = ["Casa", "Veículos", "Identidade", "Garantias", "Contratos"];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const expiringDocs = documents.filter((doc) => {
    if (!doc.expiryDate) return false;
    const daysUntil = Math.ceil(
      (new Date(doc.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntil >= 0 && daysUntil <= 90;
  }).sort((a, b) => new Date(a.expiryDate!).getTime() - new Date(b.expiryDate!).getTime());

  // Group documents by month for calendar view
  const docsByMonth = documents
    .filter((d) => d.expiryDate)
    .sort((a, b) => new Date(a.expiryDate!).getTime() - new Date(b.expiryDate!).getTime())
    .reduce((acc, doc) => {
      const month = new Date(doc.expiryDate!).toLocaleDateString("pt-PT", { month: "long", year: "numeric" });
      if (!acc[month]) acc[month] = [];
      acc[month].push(doc);
      return acc;
    }, {} as Record<string, Document[]>);

  return (
    <div>
      {/* Header */}
      <header className="bg-blue-500 pt-safe-top">
        <div className="px-4 pt-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-white">Documentos</h1>
              <p className="text-blue-100 text-sm">{documents.length} documentos guardados</p>
            </div>
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <Upload className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
            <input
              type="text"
              placeholder="Pesquisar documentos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/20 text-white placeholder:text-blue-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4">
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              !selectedCategory
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => {
            const CatIcon = categoryIcons[cat];
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <CatIcon className="w-3 h-3" />
                {cat}
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setViewMode("list")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            <Filter className="w-3 h-3" />
            Lista
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === "calendar" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            <Calendar className="w-3 h-3" />
            Validades
          </button>
        </div>

        {/* Expiring Soon Alert */}
        {expiringDocs.length > 0 && viewMode === "list" && (
          <div className="app-card bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-semibold text-amber-800">A expirar em breve</h3>
            </div>
            <div className="space-y-1.5">
              {expiringDocs.slice(0, 3).map((doc) => {
                const status = getExpiryStatus(doc.expiryDate);
                return (
                  <div key={doc.id} className="flex items-center justify-between">
                    <p className="text-xs text-amber-700">{doc.name}</p>
                    {status && (
                      <span className={`text-2xs font-medium px-2 py-0.5 rounded-full ${status.color}`}>
                        {status.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {viewMode === "list" ? (
          /* Document List */
          <section className="space-y-2">
            {filteredDocs.map((doc) => {
              const CatIcon = categoryIcons[doc.category];
              const colors = categoryColors[doc.category];
              const expiryStatus = getExpiryStatus(doc.expiryDate);

              return (
                <div key={doc.id} className="app-card flex items-center gap-3">
                  <div className={`w-10 h-10 ${colors.bg} ${colors.text} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <CatIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{doc.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-2xs font-medium px-1.5 py-0.5 rounded-full ${colors.badge}`}>
                        {doc.type}
                      </span>
                      {doc.expiryDate && (
                        <span className="text-xs text-gray-400 flex items-center gap-0.5">
                          <Clock className="w-3 h-3" />
                          {new Date(doc.expiryDate).toLocaleDateString("pt-PT")}
                        </span>
                      )}
                    </div>
                    {doc.holder && (
                      <p className="text-2xs text-gray-400 mt-0.5">{doc.holder}</p>
                    )}
                  </div>
                  {expiryStatus && (
                    <span className={`text-2xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${expiryStatus.color}`}>
                      {expiryStatus.label}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                </div>
              );
            })}

            {filteredDocs.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">Nenhum documento encontrado</p>
              </div>
            )}
          </section>
        ) : (
          /* Calendar View */
          <section className="space-y-4">
            {Object.entries(docsByMonth).map(([month, docs]) => (
              <div key={month}>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {month}
                </h3>
                <div className="space-y-2">
                  {docs.map((doc) => {
                    const expiryStatus = getExpiryStatus(doc.expiryDate);
                    return (
                      <div key={doc.id} className="app-card flex items-center gap-3">
                        <div className="w-10 text-center flex-shrink-0">
                          <p className="text-lg font-bold text-gray-900">
                            {new Date(doc.expiryDate!).getDate()}
                          </p>
                          <p className="text-2xs text-gray-400">
                            {new Date(doc.expiryDate!).toLocaleDateString("pt-PT", { month: "short" })}
                          </p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                          <p className="text-xs text-gray-400">{doc.type}</p>
                        </div>
                        {expiryStatus && (
                          <span className={`text-2xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${expiryStatus.color}`}>
                            {expiryStatus.label}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Upload Button */}
        <button className="w-full app-card flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 py-4 text-gray-400 hover:text-blue-500 hover:border-blue-300 transition-colors">
          <Plus className="w-5 h-5" />
          <span className="text-sm font-medium">Carregar Documento</span>
        </button>
      </main>
    </div>
  );
}
