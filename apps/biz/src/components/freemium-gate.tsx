"use client";

import { useState, useEffect } from "react";
import {
  Lock,
  Star,
  Zap,
  Check,
  X,
  Crown,
  ShoppingBag,
  BarChart3,
  Shield,
} from "lucide-react";
import {
  getFreemiumData,
  isTrialExpired,
  getTrialDaysRemaining,
  getMonthlyTransactionCount,
  FREE_LIMITS,
  getPlanInfo,
  type PlanType,
} from "@/lib/freemium";

interface FreemiumGateProps {
  feature: "reports" | "export" | "multiStore" | "transactions";
  children: React.ReactNode;
}

/**
 * Wraps premium features and shows upgrade prompt for free users.
 */
export function FreemiumGate({ feature, children }: FreemiumGateProps) {
  const [plan, setPlan] = useState<PlanType>("trial");
  const [hasAccess, setHasAccess] = useState(true);

  useEffect(() => {
    const data = getFreemiumData();
    setPlan(data.plan);

    const isPaid = data.plan === "pro" || data.plan === "business";
    const isActiveTrial = data.plan === "trial" && !isTrialExpired(data);

    if (isPaid || isActiveTrial) {
      setHasAccess(true);
      return;
    }

    // Free plan — check specific feature
    switch (feature) {
      case "reports":
      case "export":
      case "multiStore":
        setHasAccess(false);
        break;
      case "transactions": {
        const txn = getMonthlyTransactionCount();
        setHasAccess(txn.count < FREE_LIMITS.monthlyTransactions);
        break;
      }
    }
  }, [feature]);

  if (hasAccess) return <>{children}</>;

  return <FeatureLockedMessage feature={feature} />;
}

function FeatureLockedMessage({ feature }: { feature: string }) {
  const featureInfo: Record<string, { title: string; desc: string; icon: typeof Lock }> = {
    reports: {
      title: "Relatórios Avançados",
      desc: "Vê análises detalhadas do teu negócio com gráficos e tendências.",
      icon: BarChart3,
    },
    export: {
      title: "Exportar Dados",
      desc: "Exporta vendas, stock e relatórios para Excel.",
      icon: Shield,
    },
    multiStore: {
      title: "Multi-loja",
      desc: "Gere múltiplas lojas a partir de uma única conta.",
      icon: ShoppingBag,
    },
    transactions: {
      title: "Limite de Transações",
      desc: `Atingiste o limite de ${FREE_LIMITS.monthlyTransactions} transações/mês no plano grátis.`,
      icon: Zap,
    },
  };

  const info = featureInfo[feature] ?? {
    title: "Funcionalidade Premium",
    desc: "Esta funcionalidade requer o plano Pro.",
    icon: Lock,
  };
  const Icon = info.icon;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{info.title}</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-xs">{info.desc}</p>

      <div className="w-full max-w-sm space-y-3">
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-4 h-4 text-primary-600" />
            <p className="text-sm font-bold text-primary-800">Plano Pro</p>
          </div>
          <p className="text-2xl font-black text-primary-700 mb-1">
            499 <span className="text-sm font-normal text-primary-500">MZN/mês</span>
          </p>
          <ul className="space-y-1.5 mt-3">
            {[
              "Vendas ilimitadas",
              "Relatórios avançados",
              "Exportar para Excel",
              "Sem publicidade",
            ].map((text) => (
              <li key={text} className="flex items-center gap-2 text-xs text-primary-700">
                <Check className="w-3 h-3 text-primary-500" />
                {text}
              </li>
            ))}
          </ul>
          <a
            href="#upgrade"
            className="block w-full text-center mt-3 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-bold"
          >
            Activar Pro
          </a>
        </div>

        <p className="text-2xs text-gray-400">
          Ou convida amigos para ganhar dias grátis no Pro
        </p>
      </div>
    </div>
  );
}

/**
 * Small plan badge shown in header/settings.
 */
export function PlanBadge() {
  const [plan, setPlan] = useState<PlanType>("free");
  const [trialDays, setTrialDays] = useState(0);

  useEffect(() => {
    const data = getFreemiumData();
    setPlan(data.plan);
    if (data.plan === "trial") {
      setTrialDays(getTrialDaysRemaining(data));
    }
  }, []);

  const info = getPlanInfo(plan);

  return (
    <span className={`inline-flex items-center gap-1 text-2xs font-bold px-2 py-0.5 rounded-full ${info.badge}`}>
      {plan === "trial" && <Zap className="w-2.5 h-2.5" />}
      {plan === "pro" && <Star className="w-2.5 h-2.5" />}
      {plan === "business" && <Crown className="w-2.5 h-2.5" />}
      {info.name}
      {plan === "trial" && trialDays > 0 && ` (${trialDays}d)`}
    </span>
  );
}

/**
 * Transaction limit indicator for the dashboard.
 */
export function TransactionLimitBar() {
  const [count, setCount] = useState(0);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const data = getFreemiumData();
    if (data.plan === "pro" || data.plan === "business") return;
    if (data.plan === "trial" && !isTrialExpired(data)) return;

    const txn = getMonthlyTransactionCount();
    setCount(txn.count);
    setShowBar(true);
  }, []);

  if (!showBar) return null;

  const limit = FREE_LIMITS.monthlyTransactions;
  const percentage = Math.min(100, (count / limit) * 100);
  const isNearLimit = percentage >= 80;

  return (
    <div className={`card p-3 ${isNearLimit ? "bg-amber-50 border-amber-200" : ""}`}>
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-2xs font-medium text-[var(--color-text-muted)]">
          Transações este mês
        </p>
        <span className={`text-2xs font-bold ${isNearLimit ? "text-amber-600" : "text-gray-500"}`}>
          {count}/{limit}
        </span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            isNearLimit ? "bg-amber-500" : "bg-primary-400"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {isNearLimit && (
        <p className="text-2xs text-amber-600 mt-1">
          Quase no limite! <a href="#upgrade" className="font-bold underline">Passar para Pro</a>
        </p>
      )}
    </div>
  );
}
