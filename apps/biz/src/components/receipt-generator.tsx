"use client";

import { useState } from "react";
import {
  FileText,
  Send,
  MessageCircle,
  Copy,
  Check,
  Download,
  Share2,
} from "lucide-react";

interface ReceiptItem {
  name: string;
  qty: number;
  price: number;
}

interface ReceiptData {
  businessName: string;
  businessPhone?: string;
  businessAddress?: string;
  items: ReceiptItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: string;
  customerName?: string;
  date: string;
  receiptNumber: string;
}

function generateReceiptText(data: ReceiptData): string {
  const lines: string[] = [];

  lines.push("═══════════════════════");
  lines.push(`  ${data.businessName}`);
  if (data.businessAddress) lines.push(`  ${data.businessAddress}`);
  if (data.businessPhone) lines.push(`  Tel: ${data.businessPhone}`);
  lines.push("═══════════════════════");
  lines.push(`Recibo #${data.receiptNumber}`);
  lines.push(`Data: ${data.date}`);
  if (data.customerName) lines.push(`Cliente: ${data.customerName}`);
  lines.push("───────────────────────");

  for (const item of data.items) {
    const total = item.qty * item.price;
    lines.push(`${item.name}`);
    lines.push(`  ${item.qty}x ${item.price.toLocaleString("pt-MZ")} = ${total.toLocaleString("pt-MZ")} MZN`);
  }

  lines.push("───────────────────────");
  if (data.discount > 0) {
    lines.push(`Subtotal: ${data.subtotal.toLocaleString("pt-MZ")} MZN`);
    lines.push(`Desconto: -${data.discount.toLocaleString("pt-MZ")} MZN`);
  }
  lines.push(`TOTAL: ${data.total.toLocaleString("pt-MZ")} MZN`);
  lines.push(`Pago: ${data.paymentMethod}`);
  lines.push("═══════════════════════");
  lines.push("  Obrigado pela preferência!");
  lines.push("  Gerado por maBIZ");
  lines.push("═══════════════════════");

  return lines.join("\n");
}

function generateReceiptNumber(): string {
  const now = new Date();
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `${datePart}-${rand}`;
}

interface ReceiptGeneratorProps {
  items: ReceiptItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: string;
  customerName?: string;
  businessName: string;
  businessPhone?: string;
  businessAddress?: string;
  onClose?: () => void;
}

export function ReceiptGenerator({
  items,
  subtotal,
  discount,
  total,
  paymentMethod,
  customerName,
  businessName,
  businessPhone,
  businessAddress,
  onClose,
}: ReceiptGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const receiptData: ReceiptData = {
    businessName,
    businessPhone,
    businessAddress,
    items,
    subtotal,
    discount,
    total,
    paymentMethod,
    customerName,
    date: new Date().toLocaleDateString("pt-MZ"),
    receiptNumber: generateReceiptNumber(),
  };

  const receiptText = generateReceiptText(receiptData);

  const handleCopy = () => {
    navigator.clipboard.writeText(receiptText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(receiptText)}`;
    window.open(url, "_blank");
    setSent(true);
  };

  const handleSMS = () => {
    window.location.href = `sms:?body=${encodeURIComponent(receiptText)}`;
    setSent(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `Recibo - ${businessName}`,
        text: receiptText,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="space-y-4">
      {/* Receipt preview */}
      <div className="bg-gray-50 rounded-xl p-4 font-mono text-xs whitespace-pre-line leading-relaxed">
        {receiptText}
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button
          onClick={handleWhatsApp}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-500 text-white text-sm font-medium"
        >
          <MessageCircle className="w-4 h-4" />
          Enviar por WhatsApp
        </button>

        <div className="flex gap-2">
          <button
            onClick={handleSMS}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-blue-100 text-blue-700 text-sm font-medium"
          >
            <Send className="w-3.5 h-3.5" />
            SMS
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copiado!" : "Copiar"}
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium"
          >
            <Share2 className="w-3.5 h-3.5" />
            Partilhar
          </button>
        </div>
      </div>
    </div>
  );
}
