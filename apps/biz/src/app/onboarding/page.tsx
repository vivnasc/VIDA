"use client";

import { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Briefcase,
  MapPin,
  Phone,
  Banknote,
  Gift,
  Zap,
} from "lucide-react";
import { getTemplateList, type TemplateDefinition } from "@/lib/templates";
import { checkAndStoreReferral } from "@/lib/referral";
import { getFreemiumData, getTrialDaysRemaining } from "@/lib/freemium";

type Step = "template" | "details" | "services" | "done";

const STEPS: { key: Step; label: string }[] = [
  { key: "template", label: "Tipo" },
  { key: "details", label: "Dados" },
  { key: "services", label: "Serviços" },
  { key: "done", label: "Pronto" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>("template");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateDefinition | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [referralCode, setReferralCode] = useState("");
  const [trialDays, setTrialDays] = useState(7);

  const templates = getTemplateList();

  // Check for referral code in URL and set trial info
  useEffect(() => {
    const ref = checkAndStoreReferral();
    if (ref) setReferralCode(ref);
    const freemium = getFreemiumData();
    setTrialDays(getTrialDaysRemaining(freemium));
  }, []);
  const currentStepIndex = STEPS.findIndex((s) => s.key === step);

  const handleSelectTemplate = (template: TemplateDefinition) => {
    setSelectedTemplate(template);
    // Pre-select all services
    setSelectedServices(new Set(template.services.map((s) => s.name)));
  };

  const toggleService = (name: string) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const canProceed = () => {
    switch (step) {
      case "template":
        return selectedTemplate !== null;
      case "details":
        return businessName.trim().length > 0;
      case "services":
        return selectedServices.size > 0;
      default:
        return true;
    }
  };

  const nextStep = () => {
    const idx = STEPS.findIndex((s) => s.key === step);
    if (idx < STEPS.length - 1) {
      setStep(STEPS[idx + 1]!.key);
    }
  };

  const prevStep = () => {
    const idx = STEPS.findIndex((s) => s.key === step);
    if (idx > 0) {
      setStep(STEPS[idx - 1]!.key);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary-500 to-primary-700 text-white px-4 pt-12 pb-6">
        <h1 className="text-xl font-bold mb-1">Configura o teu negócio</h1>
        <p className="text-primary-100 text-sm">
          {step === "template" && "Que tipo de negócio tens?"}
          {step === "details" && "Dados do teu negócio"}
          {step === "services" && "Que serviços/produtos ofereces?"}
          {step === "done" && "Tudo pronto!"}
        </p>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 mt-4">
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex-1 flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/20">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    i <= currentStepIndex ? "bg-white" : "bg-transparent"
                  }`}
                  style={{ width: i <= currentStepIndex ? "100%" : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          {STEPS.map((s, i) => (
            <span
              key={s.key}
              className={`text-2xs ${
                i <= currentStepIndex ? "text-white font-medium" : "text-primary-200"
              }`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </header>

      <main className="px-4 py-6">
        {/* Step 1: Template Selection */}
        {step === "template" && (
          <div className="space-y-3 animate-in">
            {templates.map((template) => {
              const isSelected = selectedTemplate?.id === template.id;
              const TemplateIcon = template.icon;

              return (
                <button
                  key={template.id}
                  onClick={() => handleSelectTemplate(template)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                    isSelected
                      ? "border-primary-500 bg-primary-50 shadow-sm"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-primary-200"
                  }`}
                >
                  <div
                    className={`w-12 h-12 ${template.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <TemplateIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{template.emoji}</span>
                      <p className="text-sm font-semibold truncate">{template.name}</p>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                      {template.description}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-2xs text-[var(--color-text-muted)]">
                      <span>{template.services.length} serviços</span>
                      {template.hasAppointments && <span>Marcações</span>}
                      {template.quickSaleMode && <span>Venda rápida</span>}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Step 2: Business Details */}
        {step === "details" && (
          <div className="space-y-5 animate-in">
            {selectedTemplate && (
              <div className="card p-3 flex items-center gap-3 bg-primary-50 border-primary-200">
                <div className={`w-10 h-10 ${selectedTemplate.color} rounded-xl flex items-center justify-center`}>
                  <selectedTemplate.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {selectedTemplate.emoji} {selectedTemplate.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {selectedTemplate.services.length} serviços pré-configurados
                  </p>
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
                Nome do negócio *
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Ex: Salão da Maria"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
                Localização (opcional)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  placeholder="Ex: Av. Eduardo Mondlane, Maputo"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">
                Telefone do negócio (opcional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  placeholder="+258 84 000 0000"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Services Selection */}
        {step === "services" && selectedTemplate && (
          <div className="space-y-4 animate-in">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Selecciona os serviços/produtos que ofereces. Podes editar depois.
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--color-text-muted)]">
                {selectedServices.size} seleccionados
              </span>
              <button
                onClick={() => {
                  if (selectedServices.size === selectedTemplate.services.length) {
                    setSelectedServices(new Set());
                  } else {
                    setSelectedServices(new Set(selectedTemplate.services.map((s) => s.name)));
                  }
                }}
                className="text-xs text-primary-600 font-medium"
              >
                {selectedServices.size === selectedTemplate.services.length
                  ? "Desmarcar todos"
                  : "Seleccionar todos"}
              </button>
            </div>

            <div className="space-y-2">
              {selectedTemplate.services.map((service) => {
                const isSelected = selectedServices.has(service.name);
                const margin = service.costEstimate
                  ? Math.round(((service.defaultPrice - service.costEstimate) / service.defaultPrice) * 100)
                  : null;

                return (
                  <button
                    key={service.name}
                    onClick={() => toggleService(service.name)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-primary-500 bg-primary-50"
                        : "border-[var(--color-border)] bg-[var(--color-surface)]"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 border-2 transition-colors ${
                        isSelected
                          ? "bg-primary-500 border-primary-500"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{service.name}</p>
                      <div className="flex items-center gap-2 text-2xs text-[var(--color-text-muted)]">
                        {service.durationMinutes && (
                          <span>
                            {service.durationMinutes >= 60
                              ? `${Math.floor(service.durationMinutes / 60)}h${service.durationMinutes % 60 > 0 ? service.durationMinutes % 60 : ""}`
                              : `${service.durationMinutes}min`}
                          </span>
                        )}
                        {service.costEstimate !== undefined && (
                          <span>Custo: {service.costEstimate.toLocaleString("pt-MZ")} MZN</span>
                        )}
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-primary-600">
                        {service.defaultPrice.toLocaleString("pt-MZ")}
                      </p>
                      {margin !== null && (
                        <p className="text-2xs text-emerald-600 font-medium">
                          Margem {margin}%
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Done */}
        {step === "done" && selectedTemplate && (
          <div className="text-center py-8 space-y-6 animate-in">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-emerald-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">
                {businessName || "Teu negócio"} está pronto!
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Configuraste {selectedServices.size} serviços para o teu{" "}
                {selectedTemplate.name.toLowerCase()}.
              </p>
            </div>

            {/* Trial info */}
            <div className="card p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-bold text-amber-800">
                    {trialDays} dias grátis no plano Pro!
                  </p>
                  <p className="text-xs text-amber-600">
                    Vendas ilimitadas, relatórios, sem publicidade
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-4 text-left space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-8 h-8 ${selectedTemplate.color} rounded-lg flex items-center justify-center`}>
                  <selectedTemplate.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold">{businessName}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {selectedTemplate.emoji} {selectedTemplate.name}
                  </p>
                </div>
              </div>
              {businessAddress && (
                <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" /> {businessAddress}
                </p>
              )}
              <div className="flex gap-4 pt-2 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)]">
                <span>{selectedServices.size} serviços</span>
                {selectedTemplate.hasAppointments && <span>Marcações activas</span>}
                {selectedTemplate.quickSaleMode && <span>Venda rápida</span>}
              </div>
            </div>

            {/* Referral code input */}
            <div className="card p-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-4 h-4 text-primary-600" />
                <p className="text-sm font-semibold">Tens código de convite?</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  placeholder="Ex: ABC123"
                  maxLength={6}
                  className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-sm font-mono tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {referralCode.length === 6 && (
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
                    <Check className="w-3.5 h-3.5" />
                    +7 dias!
                  </div>
                )}
              </div>
              <p className="text-2xs text-[var(--color-text-muted)] mt-1">
                Se alguém te recomendou, introduz o código para ambos ganharem 7 dias grátis
              </p>
            </div>

            <a
              href="/"
              className="block w-full py-3.5 rounded-xl bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-colors text-center"
            >
              Começar a usar maBIZ
            </a>
          </div>
        )}
      </main>

      {/* Navigation Buttons */}
      {step !== "done" && (
        <div className="fixed bottom-0 left-0 right-0 px-4 py-4 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
          <div className="flex gap-3 max-w-lg mx-auto">
            {step !== "template" && (
              <button
                onClick={prevStep}
                className="flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Voltar
              </button>
            )}
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl font-semibold text-sm transition-all ${
                canProceed()
                  ? "bg-primary-500 text-white hover:bg-primary-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {step === "services" ? "Concluir" : "Continuar"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
