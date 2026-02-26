"use client";

import { useState } from "react";
import {
  Phone,
  AlertTriangle,
  Droplets,
  Pill,
  Heart,
  Shield,
  ChevronDown,
  ChevronUp,
  Share2,
  User,
  MapPin,
  Clock,
  Activity,
  Flame,
  Thermometer,
  Bug,
} from "lucide-react";

/* ─── Types ─── */
interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  isPrimary: boolean;
}

interface FamilyMedical {
  id: string;
  name: string;
  avatar: string;
  bloodType: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
  insuranceNumber: string;
}

interface Hospital {
  id: string;
  name: string;
  type: string;
  distance: string;
  phone: string;
  address: string;
}

interface FirstAidGuide {
  id: string;
  title: string;
  icon: typeof AlertTriangle;
  color: string;
  steps: string[];
}

/* ─── Mock Data ─── */
const emergencyContacts: EmergencyContact[] = [
  { id: "1", name: "Emergencia Nacional", relation: "SOS", phone: "112", isPrimary: true },
  { id: "2", name: "Bombeiros", relation: "Emergencia", phone: "198", isPrimary: true },
  { id: "3", name: "Dr. Antonio Ferreira", relation: "Medico Familia", phone: "+258 84 555 1234", isPrimary: false },
  { id: "4", name: "Hospital Central", relation: "Urgencias", phone: "+258 21 431 441", isPrimary: false },
  { id: "5", name: "Ana Silva", relation: "Mae (Joao)", phone: "+258 84 333 7890", isPrimary: false },
];

const familyMedical: FamilyMedical[] = [
  {
    id: "1",
    name: "Joao Silva",
    avatar: "JS",
    bloodType: "A+",
    allergies: ["Penicilina", "Polen"],
    medications: ["Lisinopril 10mg", "Metformina 500mg", "Melatonina 3mg"],
    conditions: ["Hipertensao", "Diabetes Tipo 2"],
    insuranceNumber: "MED-2024-001234",
  },
  {
    id: "2",
    name: "Maria Silva",
    avatar: "MS",
    bloodType: "O-",
    allergies: ["Marisco"],
    medications: ["Anticoncepcional"],
    conditions: [],
    insuranceNumber: "MED-2024-001235",
  },
  {
    id: "3",
    name: "Tomas Silva",
    avatar: "TS",
    bloodType: "A+",
    allergies: [],
    medications: ["Ventolin (SOS)"],
    conditions: ["Asma leve"],
    insuranceNumber: "MED-2024-001236",
  },
  {
    id: "4",
    name: "Sofia Silva",
    avatar: "SS",
    bloodType: "O+",
    allergies: ["Lactose"],
    medications: [],
    conditions: [],
    insuranceNumber: "MED-2024-001237",
  },
];

const nearbyHospitals: Hospital[] = [
  {
    id: "1",
    name: "Hospital Central de Maputo",
    type: "Hospital Publico",
    distance: "3.2 km",
    phone: "+258 21 431 441",
    address: "Av. Eduardo Mondlane, Maputo",
  },
  {
    id: "2",
    name: "Clinica de Sommerschield",
    type: "Clinica Privada",
    distance: "1.8 km",
    phone: "+258 21 493 924",
    address: "Rua de Sommerschield, Maputo",
  },
  {
    id: "3",
    name: "Hospital Privado de Maputo",
    type: "Hospital Privado",
    distance: "4.5 km",
    phone: "+258 21 486 400",
    address: "Av. Marginal, Maputo",
  },
];

const firstAidGuides: FirstAidGuide[] = [
  {
    id: "1",
    title: "Convulsoes",
    icon: Activity,
    color: "bg-purple-100 text-purple-700",
    steps: [
      "Manter a calma e cronometrar a duracao",
      "Afastar objectos perigosos a volta",
      "NAO colocar nada na boca da pessoa",
      "Colocar a pessoa de lado (posicao lateral de seguranca)",
      "Chamar 112 se durar mais de 5 minutos",
      "Nao restringir movimentos",
    ],
  },
  {
    id: "2",
    title: "Queimaduras",
    icon: Flame,
    color: "bg-orange-100 text-orange-700",
    steps: [
      "Arrefecer a zona com agua corrente (15-20 min)",
      "Remover roupa/joias se nao estiverem coladas",
      "Cobrir com pelicula aderente ou pano limpo",
      "NAO aplicar cremes, manteiga ou pasta de dentes",
      "Procurar ajuda medica se for maior que a palma da mao",
    ],
  },
  {
    id: "3",
    title: "Reaccao Alergica",
    icon: AlertTriangle,
    color: "bg-red-100 text-red-700",
    steps: [
      "Identificar e remover o alergeno se possivel",
      "Administrar anti-histaminico se disponivel",
      "Se tiver EpiPen, usar conforme instrucoes",
      "Ligar 112 imediatamente se houver dificuldade respiratoria",
      "Manter a pessoa sentada (se consciente)",
      "Monitorizar sinais vitais",
    ],
  },
  {
    id: "4",
    title: "Malaria",
    icon: Bug,
    color: "bg-emerald-100 text-emerald-700",
    steps: [
      "Medir temperatura - febre acima de 38C e sinal de alerta",
      "Procurar tratamento medico URGENTE",
      "Manter a pessoa hidratada",
      "Administrar antipiretico (paracetamol) para baixar febre",
      "NAO esperar - a malaria pode ser fatal se nao tratada",
      "Levar ao hospital mais proximo",
    ],
  },
];

export default function EmergenciaPage() {
  const [expandedPerson, setExpandedPerson] = useState<string | null>("1");
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);
  const [showCard, setShowCard] = useState<string | null>(null);

  return (
    <>
      {/* SOS Header */}
      <header className="bg-gradient-to-b from-rose-600 to-rose-500 pt-safe-top">
        <div className="px-4 pt-4 pb-6 text-center">
          <h1 className="text-xl font-bold text-white mb-4">Emergencia</h1>

          {/* Big SOS Button */}
          <a
            href="tel:112"
            className="inline-flex items-center justify-center w-28 h-28 bg-white rounded-full shadow-2xl shadow-red-500/40 mx-auto relative"
          >
            <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-20" />
            <span className="absolute inset-2 rounded-full border-4 border-red-100" />
            <div className="relative z-10 text-center">
              <Phone className="w-8 h-8 text-red-600 mx-auto mb-1" />
              <span className="text-red-600 font-black text-xl">SOS</span>
            </div>
          </a>
          <p className="text-rose-100 text-sm mt-3">Toque para ligar 112</p>
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-6 px-4 py-6">
        {/* Emergency Contacts */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Contactos de Emergencia</h2>
          <div className="space-y-2">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className={`card flex items-center gap-3 ${
                  contact.isPrimary ? "border-l-4 border-l-red-500 bg-red-50/30" : ""
                }`}
              >
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                    contact.isPrimary
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Phone className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.relation}</p>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-1.5 bg-primary-50 text-primary-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-100 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Ligar
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Critical Medical Info */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Informacao Medica Critica</h2>
          <div className="space-y-3">
            {familyMedical.map((person) => {
              const isExpanded = expandedPerson === person.id;
              return (
                <div key={person.id} className="card space-y-3">
                  <button
                    onClick={() => setExpandedPerson(isExpanded ? null : person.id)}
                    className="w-full flex items-center gap-3"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                      {person.avatar}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-semibold text-gray-900">{person.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                          <Droplets className="h-3 w-3" />
                          {person.bloodType}
                        </span>
                        {person.allergies.length > 0 && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                            <AlertTriangle className="h-3 w-3" />
                            {person.allergies.length} alergia{person.allergies.length > 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="space-y-3 border-t border-gray-100 pt-3">
                      {/* Allergies */}
                      {person.allergies.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1.5">
                            Alergias
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {person.allergies.map((allergy) => (
                              <span
                                key={allergy}
                                className="inline-flex items-center gap-1 rounded-lg bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700"
                              >
                                <AlertTriangle className="h-3 w-3" />
                                {allergy}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Current Medications */}
                      {person.medications.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                            Medicacao Actual
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {person.medications.map((med) => (
                              <span
                                key={med}
                                className="inline-flex items-center gap-1 rounded-lg bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700"
                              >
                                <Pill className="h-3 w-3" />
                                {med}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Chronic Conditions */}
                      {person.conditions.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                            Condicoes Cronicas
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {person.conditions.map((condition) => (
                              <span
                                key={condition}
                                className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                              >
                                <Heart className="h-3 w-3" />
                                {condition}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Insurance */}
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        <Shield className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">N. Seguro</p>
                          <p className="text-sm font-mono font-medium text-gray-900">{person.insuranceNumber}</p>
                        </div>
                      </div>

                      {/* Share Medical Card */}
                      <button
                        onClick={() => setShowCard(showCard === person.id ? null : person.id)}
                        className="w-full flex items-center justify-center gap-2 bg-primary-50 text-primary-600 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-100 transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                        {showCard === person.id ? "Ocultar Cartao" : "Ver Cartao Medico"}
                      </button>

                      {/* Visual Medical Card */}
                      {showCard === person.id && (
                        <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl p-4 text-white shadow-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="text-rose-200 text-xs uppercase tracking-wider">Cartao Medico</p>
                              <p className="text-lg font-bold">{person.name}</p>
                            </div>
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                              {person.avatar}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="bg-white/15 rounded-lg px-3 py-2">
                              <p className="text-rose-200 text-2xs">Tipo Sanguineo</p>
                              <p className="font-bold text-lg">{person.bloodType}</p>
                            </div>
                            <div className="bg-white/15 rounded-lg px-3 py-2">
                              <p className="text-rose-200 text-2xs">Seguro</p>
                              <p className="font-mono text-xs mt-1">{person.insuranceNumber}</p>
                            </div>
                          </div>
                          {person.allergies.length > 0 && (
                            <div className="mt-2 bg-white/15 rounded-lg px-3 py-2">
                              <p className="text-rose-200 text-2xs">Alergias</p>
                              <p className="font-semibold">{person.allergies.join(", ")}</p>
                            </div>
                          )}
                          {person.conditions.length > 0 && (
                            <div className="mt-2 bg-white/15 rounded-lg px-3 py-2">
                              <p className="text-rose-200 text-2xs">Condicoes</p>
                              <p className="font-semibold">{person.conditions.join(", ")}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Nearest Hospitals */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Hospitais Proximos</h2>
          <div className="space-y-2">
            {nearbyHospitals.map((hospital) => (
              <div key={hospital.id} className="card flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">{hospital.name}</p>
                  <p className="text-xs text-gray-500">{hospital.type}</p>
                  <p className="text-xs text-gray-400">{hospital.address}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-medium text-gray-500">{hospital.distance}</p>
                  <a
                    href={`tel:${hospital.phone}`}
                    className="inline-flex items-center gap-1 mt-1 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-emerald-100 transition-colors"
                  >
                    <Phone className="h-3 w-3" />
                    Ligar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* First Aid Quick Guide */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Guia Rapido de Primeiros Socorros</h2>
          <div className="space-y-2">
            {firstAidGuides.map((guide) => {
              const Icon = guide.icon;
              const isExpanded = expandedGuide === guide.id;

              return (
                <div key={guide.id} className="card">
                  <button
                    onClick={() => setExpandedGuide(isExpanded ? null : guide.id)}
                    className="w-full flex items-center gap-3"
                  >
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${guide.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="flex-1 text-left text-sm font-semibold text-gray-900">{guide.title}</p>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 border-t border-gray-100 pt-3 space-y-2">
                      {guide.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-2xs font-bold text-gray-600">
                            {idx + 1}
                          </span>
                          <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
