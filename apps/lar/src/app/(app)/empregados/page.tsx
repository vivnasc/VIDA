"use client";

import { useState } from "react";
import {
  User,
  Phone,
  MessageCircle,
  Plus,
  Check,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  DollarSign,
  CalendarDays,
  X,
} from "lucide-react";

/* ─── Types ─── */
type EmployeeRole = "Empregada" | "Jardineiro" | "Guarda" | "Cozinheira";

interface WeeklyTask {
  day: string;
  tasks: string[];
}

interface Employee {
  id: string;
  name: string;
  role: EmployeeRole;
  phone: string;
  salary: number;
  weeklySchedule: WeeklyTask[];
  paymentStatus: "Pago" | "Pendente";
  completionRate: number;
  startDate: string;
}

/* ─── Mock Data ─── */
const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Graça Mondlane",
    role: "Empregada",
    phone: "+258 84 123 4567",
    salary: 8500,
    weeklySchedule: [
      { day: "Seg", tasks: ["Lavar roupa", "Limpar cozinha", "Passar a ferro"] },
      { day: "Ter", tasks: ["Limpar casas de banho", "Aspirar sala"] },
      { day: "Qua", tasks: ["Limpar quartos", "Mudar lençóis"] },
      { day: "Qui", tasks: ["Limpar cozinha", "Lavar janelas"] },
      { day: "Sex", tasks: ["Limpeza geral", "Organizar despensa"] },
      { day: "Sáb", tasks: ["Lavar roupa", "Passar a ferro"] },
    ],
    paymentStatus: "Pago",
    completionRate: 92,
    startDate: "2024-03-15",
  },
  {
    id: "2",
    name: "Carlos Nhambe",
    role: "Jardineiro",
    phone: "+258 87 987 6543",
    salary: 6000,
    weeklySchedule: [
      { day: "Seg", tasks: ["Regar plantas", "Cortar relva"] },
      { day: "Ter", tasks: ["Podar arbustos"] },
      { day: "Qua", tasks: ["Regar plantas", "Adubar canteiros"] },
      { day: "Qui", tasks: ["Limpar jardim"] },
      { day: "Sex", tasks: ["Regar plantas", "Manutenção ferramentas"] },
      { day: "Sáb", tasks: ["Cortar relva", "Regar plantas"] },
    ],
    paymentStatus: "Pendente",
    completionRate: 85,
    startDate: "2024-06-01",
  },
];

const roleColors: Record<EmployeeRole, string> = {
  Empregada: "bg-purple-100 text-purple-700",
  Jardineiro: "bg-green-100 text-green-700",
  Guarda: "bg-blue-100 text-blue-700",
  Cozinheira: "bg-orange-100 text-orange-700",
};

const roleIcons: Record<EmployeeRole, string> = {
  Empregada: "🏠",
  Jardineiro: "🌿",
  Guarda: "🛡️",
  Cozinheira: "👩‍🍳",
};

export default function EmpregadosPage() {
  const [employees] = useState<Employee[]>(mockEmployees);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState<EmployeeRole>("Empregada");
  const [newPhone, setNewPhone] = useState("");
  const [newSalary, setNewSalary] = useState("");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-blue-500 pt-safe-top">
        <div className="px-4 pt-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-xl font-bold text-white">Empregados</h1>
              <p className="text-blue-100 text-sm">
                {employees.length} funcionário{employees.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              {showAddForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
          </div>

          {/* Summary */}
          <div className="flex gap-3">
            <div className="flex-1 bg-white/15 rounded-xl px-3 py-2">
              <p className="text-blue-100 text-2xs uppercase tracking-wider">Total Salários</p>
              <p className="text-white font-bold text-lg">
                {employees.reduce((sum, e) => sum + e.salary, 0).toLocaleString("pt-MZ")} MT
              </p>
            </div>
            <div className="flex-1 bg-white/15 rounded-xl px-3 py-2">
              <p className="text-blue-100 text-2xs uppercase tracking-wider">Pagamentos</p>
              <p className="text-white font-bold text-lg">
                {employees.filter((e) => e.paymentStatus === "Pago").length}/{employees.length}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-4">
        {/* Add Employee Form */}
        {showAddForm && (
          <div className="app-card space-y-3 border-2 border-dashed border-blue-200 bg-blue-50/50">
            <h3 className="text-sm font-semibold text-gray-900">Novo Funcionário</h3>
            <input
              type="text"
              placeholder="Nome completo"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as EmployeeRole)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
            >
              <option value="Empregada">Empregada Doméstica</option>
              <option value="Jardineiro">Jardineiro</option>
              <option value="Guarda">Guarda</option>
              <option value="Cozinheira">Cozinheira</option>
            </select>
            <input
              type="tel"
              placeholder="Telefone (+258 ...)"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="number"
              placeholder="Salário (MT)"
              value={newSalary}
              onChange={(e) => setNewSalary(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="w-full bg-blue-500 text-white font-medium py-2.5 rounded-lg hover:bg-blue-600 transition-colors text-sm">
              Adicionar Funcionário
            </button>
          </div>
        )}

        {/* Employee Cards */}
        {employees.map((employee) => (
          <div key={employee.id} className="app-card space-y-3">
            {/* Employee Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                {roleIcons[employee.role]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 truncate">{employee.name}</h3>
                  <span className={`text-2xs font-medium px-2 py-0.5 rounded-full ${roleColors[employee.role]}`}>
                    {employee.role}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {employee.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Salary and Payment Status */}
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Salário Mensal</p>
                  <p className="text-sm font-bold text-gray-900">{employee.salary.toLocaleString("pt-MZ")} MT</p>
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  employee.paymentStatus === "Pago"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {employee.paymentStatus === "Pago" ? (
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3" /> Pago
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Pendente
                  </span>
                )}
              </span>
            </div>

            {/* Completion Rate */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400" />
                  Taxa de conclusão
                </span>
                <span className="text-xs font-bold text-gray-700">{employee.completionRate}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    employee.completionRate >= 90
                      ? "bg-emerald-500"
                      : employee.completionRate >= 70
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${employee.completionRate}%` }}
                />
              </div>
            </div>

            {/* Communication Buttons */}
            <div className="flex gap-2">
              <a
                href={`https://wa.me/${employee.phone.replace(/\s+/g, "").replace("+", "")}`}
                className="flex-1 flex items-center justify-center gap-2 bg-green-50 text-green-700 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href={`tel:${employee.phone}`}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Ligar
              </a>
            </div>

            {/* Expand/Collapse Schedule */}
            <button
              onClick={() => toggleExpand(employee.id)}
              className="w-full flex items-center justify-center gap-1 text-xs text-blue-500 font-medium py-1 hover:text-blue-600 transition-colors"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              {expandedId === employee.id ? "Ocultar horário" : "Ver horário semanal"}
              {expandedId === employee.id ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Weekly Schedule Grid */}
            {expandedId === employee.id && (
              <div className="border-t border-gray-100 pt-3">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Horário Semanal
                </h4>
                <div className="grid grid-cols-6 gap-1.5">
                  {employee.weeklySchedule.map((daySchedule) => (
                    <div key={daySchedule.day} className="text-center">
                      <p className="text-2xs font-bold text-gray-600 mb-1">{daySchedule.day}</p>
                      <div className="space-y-1">
                        {daySchedule.tasks.map((task, idx) => (
                          <div
                            key={idx}
                            className="bg-blue-50 text-blue-700 text-2xs px-1 py-1 rounded leading-tight"
                          >
                            {task}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add Employee Card */}
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full app-card flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 py-6 text-gray-400 hover:text-blue-500 hover:border-blue-300 transition-colors"
        >
          <User className="w-5 h-5" />
          <span className="text-sm font-medium">Adicionar Funcionário</span>
        </button>
      </main>
    </div>
  );
}
