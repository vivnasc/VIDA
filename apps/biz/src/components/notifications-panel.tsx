"use client";

import { useState } from "react";
import {
  Bell,
  Package,
  AlertTriangle,
  Calendar,
  TrendingUp,
  X,
  Check,
  Clock,
  Users,
} from "lucide-react";

type NotifType = "stock" | "fiado" | "marcacao" | "resumo" | "dica";

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionLabel?: string;
  actionHref?: string;
}

const TYPE_CONFIG: Record<NotifType, { icon: typeof Bell; color: string; bg: string }> = {
  stock: { icon: Package, color: "text-red-500", bg: "bg-red-50" },
  fiado: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50" },
  marcacao: { icon: Calendar, color: "text-pink-500", bg: "bg-pink-50" },
  resumo: { icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-50" },
  dica: { icon: Clock, color: "text-emerald-500", bg: "bg-emerald-50" },
};

function generateNotifications(): Notification[] {
  const now = new Date();
  return [
    {
      id: "1",
      type: "stock",
      title: "Stock em baixo",
      message: "Arroz (5kg) e Óleo estão abaixo do mínimo. Reponha o stock.",
      time: "Agora",
      read: false,
      actionLabel: "Ver stock",
      actionHref: "/stock",
    },
    {
      id: "2",
      type: "fiado",
      title: "Dívida vencida",
      message: "Maria João tem 2.500 MZN em dívida vencida há 5 dias.",
      time: "Há 1h",
      read: false,
      actionLabel: "Ver fiado",
      actionHref: "/fiado",
    },
    {
      id: "3",
      type: "marcacao",
      title: "Marcação em 30min",
      message: "Ana Silva — Tranças às 14:00",
      time: "Há 30min",
      read: false,
      actionLabel: "Ver agenda",
      actionHref: "/agendamentos",
    },
    {
      id: "4",
      type: "resumo",
      title: "Resumo de ontem",
      message: "Vendas: 12.500 MZN | Despesas: 3.200 MZN | Lucro: 9.300 MZN",
      time: "Ontem 20:00",
      read: true,
    },
    {
      id: "5",
      type: "dica",
      title: "Dica do dia",
      message: "Sexta-feira é o teu melhor dia de vendas. Prepara stock extra!",
      time: "Hoje 08:00",
      read: true,
    },
    {
      id: "6",
      type: "fiado",
      title: "Cobranças pendentes",
      message: "3 clientes com dívidas a vencer esta semana. Total: 4.800 MZN",
      time: "Há 2h",
      read: true,
      actionLabel: "Ver todos",
      actionHref: "/fiado",
    },
  ];
}

interface NotificationsPanelProps {
  onClose: () => void;
}

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>(generateNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const dismiss = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-[var(--color-surface)] shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 pt-12 pb-3 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-gray-600" />
              <h2 className="text-base font-bold">Notificações</h2>
              {unreadCount > 0 && (
                <span className="w-5 h-5 bg-red-500 text-white rounded-full text-2xs flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-2xs text-blue-500 font-medium"
                >
                  Marcar tudo lido
                </button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications list */}
        <div className="p-4 space-y-2">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-10 h-10 text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Sem notificações</p>
            </div>
          ) : (
            notifications.map((notif) => {
              const cfg = TYPE_CONFIG[notif.type];
              const Icon = cfg.icon;

              return (
                <div
                  key={notif.id}
                  onClick={() => markRead(notif.id)}
                  className={`p-3 rounded-xl transition-colors cursor-pointer ${
                    notif.read ? "bg-[var(--color-surface)]" : "bg-blue-50/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 ${cfg.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${cfg.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-semibold ${notif.read ? "text-gray-600" : "text-gray-900"}`}>
                          {notif.title}
                        </p>
                        <button
                          onClick={(e) => { e.stopPropagation(); dismiss(notif.id); }}
                          className="p-1"
                        >
                          <X className="w-3 h-3 text-gray-300" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{notif.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-2xs text-gray-300">{notif.time}</span>
                        {notif.actionLabel && notif.actionHref && (
                          <a
                            href={notif.actionHref}
                            onClick={onClose}
                            className="text-2xs text-blue-500 font-medium"
                          >
                            {notif.actionLabel} &rarr;
                          </a>
                        )}
                      </div>
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

/** Badge for the bell icon on dashboard */
export function NotificationBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-2xs flex items-center justify-center font-bold">
      {count > 9 ? "9+" : count}
    </span>
  );
}
