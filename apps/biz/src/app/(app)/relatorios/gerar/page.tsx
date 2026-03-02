"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  Calendar,
  BarChart3,
  Share2,
  Check,
  Printer,
  Clock,
} from "lucide-react";

type ReportType = "vendas" | "stock" | "clientes" | "geral";
type Period = "semana" | "mes" | "trimestre" | "semestre";

interface ReportConfig {
  type: ReportType;
  period: Period;
  includeCharts: boolean;
  includeDebts: boolean;
  includeStock: boolean;
  includeStaff: boolean;
  businessName: string;
}

const REPORT_TYPES: { key: ReportType; label: string; desc: string; icon: typeof FileText }[] = [
  { key: "geral", label: "Relatório Geral", desc: "Visão completa do negócio", icon: BarChart3 },
  { key: "vendas", label: "Relatório de Vendas", desc: "Receitas, métodos de pagamento, tendências", icon: ShoppingBag },
  { key: "stock", label: "Relatório de Stock", desc: "Inventário, valor, produtos em baixo", icon: Package },
  { key: "clientes", label: "Relatório de Clientes", desc: "Base de clientes, dívidas, fidelidade", icon: Users },
];

const PERIODS: { key: Period; label: string }[] = [
  { key: "semana", label: "Última semana" },
  { key: "mes", label: "Último mês" },
  { key: "trimestre", label: "Último trimestre" },
  { key: "semestre", label: "Último semestre" },
];

function generateReportHTML(config: ReportConfig): string {
  const now = new Date();
  const periodLabel = PERIODS.find((p) => p.key === config.period)?.label ?? config.period;

  // Mock data — in production, pull from Supabase
  const salesData = {
    total: 145750,
    transactions: 234,
    avgTicket: 623,
    cash: 87450,
    mpesa: 43800,
    transfer: 14500,
    growth: "+12%",
  };

  const stockData = {
    totalItems: 342,
    totalValue: 285000,
    totalCost: 171000,
    lowStock: 8,
    categories: 6,
  };

  const clientData = {
    total: 67,
    vip: 12,
    loyal: 23,
    newClients: 8,
    totalDebt: 15400,
    debtors: 11,
  };

  return `<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Relatório - ${config.businessName}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1a1a1a; background: white; padding: 32px; max-width: 800px; margin: 0 auto; }
  .header { text-align: center; border-bottom: 3px solid #1A5C35; padding-bottom: 20px; margin-bottom: 24px; }
  .header h1 { font-size: 24px; color: #1A5C35; margin-bottom: 4px; }
  .header .subtitle { color: #666; font-size: 14px; }
  .header .date { color: #999; font-size: 12px; margin-top: 8px; }
  .section { margin-bottom: 24px; }
  .section-title { font-size: 16px; font-weight: 700; color: #1A5C35; border-bottom: 1px solid #e5e5e5; padding-bottom: 8px; margin-bottom: 12px; }
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
  .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 16px; }
  .card { background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 12px; }
  .card .label { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; }
  .card .value { font-size: 22px; font-weight: 800; color: #1a1a1a; margin-top: 2px; }
  .card .unit { font-size: 12px; font-weight: 400; color: #666; }
  .card .trend { font-size: 11px; color: #16a34a; margin-top: 2px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { text-align: left; padding: 8px; background: #f1f5f9; font-weight: 600; color: #374151; border-bottom: 2px solid #e2e8f0; }
  td { padding: 8px; border-bottom: 1px solid #f1f5f9; }
  .text-right { text-align: right; }
  .text-green { color: #16a34a; }
  .text-red { color: #dc2626; }
  .text-amber { color: #d97706; }
  .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e5e5; text-align: center; color: #999; font-size: 11px; }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
  .badge-green { background: #dcfce7; color: #166534; }
  .badge-red { background: #fee2e2; color: #991b1b; }
  .badge-amber { background: #fef3c7; color: #92400e; }
  .watermark { color: #e5e5e5; font-size: 10px; text-align: center; margin-top: 8px; }
  @media print {
    body { padding: 16px; }
    .no-print { display: none; }
  }
</style>
</head>
<body>
<div class="header">
  <h1>${config.businessName}</h1>
  <div class="subtitle">${REPORT_TYPES.find((r) => r.key === config.type)?.label ?? "Relatório"} — ${periodLabel}</div>
  <div class="date">Gerado em ${now.toLocaleDateString("pt-MZ")} às ${now.toLocaleTimeString("pt-MZ", { hour: "2-digit", minute: "2-digit" })}</div>
</div>

${config.type === "geral" || config.type === "vendas" ? `
<div class="section">
  <div class="section-title">Resumo de Vendas</div>
  <div class="grid">
    <div class="card">
      <div class="label">Receita Total</div>
      <div class="value">${salesData.total.toLocaleString("pt-MZ")} <span class="unit">MZN</span></div>
      <div class="trend">${salesData.growth} vs período anterior</div>
    </div>
    <div class="card">
      <div class="label">Transações</div>
      <div class="value">${salesData.transactions}</div>
    </div>
    <div class="card">
      <div class="label">Ticket Médio</div>
      <div class="value">${salesData.avgTicket.toLocaleString("pt-MZ")} <span class="unit">MZN</span></div>
    </div>
  </div>
  <div class="section-title" style="font-size:13px;margin-top:12px;">Métodos de Pagamento</div>
  <table>
    <thead><tr><th>Método</th><th class="text-right">Valor (MZN)</th><th class="text-right">%</th></tr></thead>
    <tbody>
      <tr><td>Cash</td><td class="text-right">${salesData.cash.toLocaleString("pt-MZ")}</td><td class="text-right">${Math.round((salesData.cash / salesData.total) * 100)}%</td></tr>
      <tr><td>M-Pesa</td><td class="text-right">${salesData.mpesa.toLocaleString("pt-MZ")}</td><td class="text-right">${Math.round((salesData.mpesa / salesData.total) * 100)}%</td></tr>
      <tr><td>Transferência</td><td class="text-right">${salesData.transfer.toLocaleString("pt-MZ")}</td><td class="text-right">${Math.round((salesData.transfer / salesData.total) * 100)}%</td></tr>
    </tbody>
  </table>
</div>
` : ""}

${config.type === "geral" || config.type === "stock" ? `
<div class="section">
  <div class="section-title">Stock / Inventário</div>
  <div class="grid">
    <div class="card">
      <div class="label">Total Itens</div>
      <div class="value">${stockData.totalItems}</div>
    </div>
    <div class="card">
      <div class="label">Valor de Venda</div>
      <div class="value">${stockData.totalValue.toLocaleString("pt-MZ")} <span class="unit">MZN</span></div>
    </div>
    <div class="card">
      <div class="label">Stock Baixo</div>
      <div class="value ${stockData.lowStock > 5 ? "text-red" : ""}">${stockData.lowStock} <span class="unit">itens</span></div>
    </div>
  </div>
  <div class="grid-2">
    <div class="card">
      <div class="label">Custo Total Stock</div>
      <div class="value">${stockData.totalCost.toLocaleString("pt-MZ")} <span class="unit">MZN</span></div>
    </div>
    <div class="card">
      <div class="label">Margem Potencial</div>
      <div class="value text-green">${((1 - stockData.totalCost / stockData.totalValue) * 100).toFixed(0)}%</div>
    </div>
  </div>
</div>
` : ""}

${config.type === "geral" || config.type === "clientes" ? `
<div class="section">
  <div class="section-title">Clientes</div>
  <div class="grid">
    <div class="card">
      <div class="label">Total Clientes</div>
      <div class="value">${clientData.total}</div>
    </div>
    <div class="card">
      <div class="label">Clientes VIP</div>
      <div class="value">${clientData.vip}</div>
    </div>
    <div class="card">
      <div class="label">Novos (período)</div>
      <div class="value">${clientData.newClients}</div>
    </div>
  </div>
  ${config.includeDebts ? `
  <div class="section-title" style="font-size:13px;margin-top:12px;">Fiado / Dívidas</div>
  <div class="grid-2">
    <div class="card">
      <div class="label">Total em Dívida</div>
      <div class="value text-amber">${clientData.totalDebt.toLocaleString("pt-MZ")} <span class="unit">MZN</span></div>
    </div>
    <div class="card">
      <div class="label">Clientes c/ Dívida</div>
      <div class="value">${clientData.debtors}</div>
    </div>
  </div>
  ` : ""}
</div>
` : ""}

<div class="footer">
  <p>Relatório gerado automaticamente pelo maBIZ — mabiz.co.mz</p>
  <p class="watermark">Dados do período: ${periodLabel}. Os valores podem não reflectir transações não registadas.</p>
</div>
</body>
</html>`;
}

export default function RelatorioGerarPage() {
  const [reportType, setReportType] = useState<ReportType>("geral");
  const [period, setPeriod] = useState<Period>("mes");
  const [includeDebts, setIncludeDebts] = useState(true);
  const [includeStock, setIncludeStock] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const html = generateReportHTML({
        type: reportType,
        period,
        includeCharts: true,
        includeDebts,
        includeStock,
        includeStaff: true,
        businessName: localStorage.getItem("mabiz-business-name") || "Meu Negócio",
      });

      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `relatorio-${reportType}-${new Date().toISOString().split("T")[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setGenerating(false);
      setGenerated(true);
      setTimeout(() => setGenerated(false), 3000);
    }, 1500);
  };

  const handlePrint = () => {
    const html = generateReportHTML({
      type: reportType,
      period,
      includeCharts: true,
      includeDebts,
      includeStock,
      includeStaff: true,
      businessName: localStorage.getItem("mabiz-business-name") || "Meu Negócio",
    });

    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
      setTimeout(() => win.print(), 500);
    }
  };

  const handleShare = async () => {
    const html = generateReportHTML({
      type: reportType,
      period,
      includeCharts: true,
      includeDebts,
      includeStock,
      includeStaff: true,
      businessName: localStorage.getItem("mabiz-business-name") || "Meu Negócio",
    });

    const blob = new Blob([html], { type: "text/html" });
    const file = new File([blob], `relatorio-${reportType}.html`, { type: "text/html" });

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: "Relatório maBIZ" }).catch(() => {});
    } else {
      handleGenerate();
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <header className="bg-gradient-to-br from-purple-500 to-violet-600 text-white px-4 pt-12 pb-6 rounded-b-3xl">
        <h1 className="text-xl font-bold">Gerar Relatório</h1>
        <p className="text-purple-100 text-sm mt-1">
          Exporta dados do teu negócio em formato profissional
        </p>
      </header>

      <main className="px-4 -mt-2 space-y-4">
        {/* Report type selection */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-[var(--color-text-muted)] mt-4">Tipo de relatório</p>
          {REPORT_TYPES.map((rt) => {
            const isSelected = reportType === rt.key;
            const Icon = rt.icon;
            return (
              <button
                key={rt.key}
                onClick={() => setReportType(rt.key)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? "border-purple-500 bg-purple-50"
                    : "border-[var(--color-border)] bg-[var(--color-surface)]"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? "bg-purple-500" : "bg-gray-100"}`}>
                  <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-gray-500"}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{rt.label}</p>
                  <p className="text-2xs text-[var(--color-text-muted)]">{rt.desc}</p>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Period selection */}
        <div>
          <p className="text-xs font-medium text-[var(--color-text-muted)] mb-2">Período</p>
          <div className="flex gap-2 flex-wrap">
            {PERIODS.map((p) => (
              <button
                key={p.key}
                onClick={() => setPeriod(p.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  period === p.key
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="card p-4 space-y-3">
          <p className="text-xs font-medium text-[var(--color-text-muted)]">Incluir no relatório</p>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeDebts}
              onChange={(e) => setIncludeDebts(e.target.checked)}
              className="w-4 h-4 rounded text-purple-500 focus:ring-purple-500"
            />
            <span className="text-sm">Dados de fiado/dívidas</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeStock}
              onChange={(e) => setIncludeStock(e.target.checked)}
              className="w-4 h-4 rounded text-purple-500 focus:ring-purple-500"
            />
            <span className="text-sm">Dados de stock/inventário</span>
          </label>
        </div>

        {/* Info box */}
        <div className="card p-4 bg-blue-50 border-blue-100">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-800">Relatório profissional</p>
              <p className="text-xs text-blue-600 mt-0.5">
                O relatório é gerado em formato HTML/PDF com os dados do teu negócio.
                Podes imprimir, guardar ou partilhar com quem precisares.
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
              generated
                ? "bg-emerald-500 text-white"
                : generating
                  ? "bg-purple-300 text-white"
                  : "bg-purple-500 text-white hover:bg-purple-600"
            }`}
          >
            {generated ? (
              <>
                <Check className="w-4 h-4" />
                Relatório descarregado!
              </>
            ) : generating ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                A gerar...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Descarregar relatório
              </>
            )}
          </button>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium"
            >
              <Printer className="w-4 h-4" />
              Imprimir
            </button>
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium"
            >
              <Share2 className="w-4 h-4" />
              Partilhar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
