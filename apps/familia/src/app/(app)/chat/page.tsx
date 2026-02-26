"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Lock,
  ChevronDown,
  Check,
  CheckCheck,
  Play,
  Image as ImageIcon,
  Reply,
  ArrowDown,
  Users,
  Smile,
} from "lucide-react";

/* ─── Types ─── */

type MessageStatus = "sent" | "delivered" | "read";
type MessageType = "text" | "system" | "image" | "voice";

interface ChatGroup {
  id: string;
  name: string;
  memberCount: number;
  lastMessage: string;
  unread: number;
}

interface ChatMessage {
  id: string;
  type: MessageType;
  sender: string;
  senderInitial: string;
  senderColor: string;
  text: string;
  time: string;
  status: MessageStatus;
  isOwn: boolean;
  replyTo?: string;
}

/* ─── Mock Data ─── */

const chatGroups: ChatGroup[] = [
  { id: "g1", name: "Familia Principal", memberCount: 6, lastMessage: "Maria: Jantar as 19h!", unread: 3 },
  { id: "g2", name: "Pais", memberCount: 2, lastMessage: "Carlos: Vou buscar as criancas", unread: 0 },
  { id: "g3", name: "Avos", memberCount: 4, lastMessage: "Avo Rosa: Saudades dos netos", unread: 1 },
];

const mockMessages: ChatMessage[] = [
  {
    id: "m1",
    type: "system",
    sender: "Sistema",
    senderInitial: "",
    senderColor: "",
    text: "Maria criou o grupo Familia Principal",
    time: "09:00",
    status: "read",
    isOwn: false,
  },
  {
    id: "m2",
    type: "text",
    sender: "Maria",
    senderInitial: "M",
    senderColor: "bg-rose-500",
    text: "Bom dia familia! Lembrem-se que hoje temos jantar familiar as 19h.",
    time: "09:15",
    status: "read",
    isOwn: false,
  },
  {
    id: "m3",
    type: "text",
    sender: "Carlos",
    senderInitial: "C",
    senderColor: "bg-blue-500",
    text: "Bom dia! Ja confirmei a reserva no restaurante. Mesa para 8 pessoas.",
    time: "09:22",
    status: "read",
    isOwn: true,
  },
  {
    id: "m4",
    type: "text",
    sender: "Avo Rosa",
    senderInitial: "R",
    senderColor: "bg-pink-500",
    text: "Que maravilha! Vou levar o bolo de chocolate que o Tomas gosta.",
    time: "09:30",
    status: "read",
    isOwn: false,
  },
  {
    id: "m5",
    type: "system",
    sender: "Sistema",
    senderInitial: "",
    senderColor: "",
    text: "Maria adicionou uma tarefa: Comprar flores para a mesa",
    time: "09:45",
    status: "read",
    isOwn: false,
  },
  {
    id: "m6",
    type: "image",
    sender: "Sofia",
    senderInitial: "S",
    senderColor: "bg-purple-500",
    text: "[Foto do vestido novo para o jantar]",
    time: "10:00",
    status: "read",
    isOwn: false,
  },
  {
    id: "m7",
    type: "text",
    sender: "Maria",
    senderInitial: "M",
    senderColor: "bg-rose-500",
    text: "Que lindo Sofia! Vais ficar muito bonita!",
    time: "10:05",
    status: "read",
    isOwn: false,
    replyTo: "[Foto do vestido novo para o jantar]",
  },
  {
    id: "m8",
    type: "voice",
    sender: "Tomas",
    senderInitial: "T",
    senderColor: "bg-emerald-500",
    text: "Mensagem de voz (0:12)",
    time: "10:15",
    status: "delivered",
    isOwn: false,
  },
  {
    id: "m9",
    type: "text",
    sender: "Breno",
    senderInitial: "B",
    senderColor: "bg-amber-500",
    text: "Eu quero sentar ao lado da Avo!",
    time: "10:20",
    status: "delivered",
    isOwn: false,
  },
  {
    id: "m10",
    type: "text",
    sender: "Carlos",
    senderInitial: "C",
    senderColor: "bg-blue-500",
    text: "Claro Breno! Vou organizar os lugares. Alguem tem alguma preferencia?",
    time: "10:25",
    status: "sent",
    isOwn: true,
  },
  {
    id: "m11",
    type: "text",
    sender: "Maria",
    senderInitial: "M",
    senderColor: "bg-rose-500",
    text: "Eu fico ao pe do Tomas para ajudar com a comida. Nao se esquecam de confirmar com o Tio Joao!",
    time: "10:30",
    status: "read",
    isOwn: false,
  },
  {
    id: "m12",
    type: "system",
    sender: "Sistema",
    senderInitial: "",
    senderColor: "",
    text: "Carlos actualizou o evento: Jantar Familiar - Restaurante O Cantinho",
    time: "10:45",
    status: "read",
    isOwn: false,
  },
];

/* ─── Status Icon Component ─── */

function MessageStatusIcon({ status }: { status: MessageStatus }) {
  if (status === "sent") return <Check className="h-3.5 w-3.5 text-muted-foreground/60" />;
  if (status === "delivered") return <CheckCheck className="h-3.5 w-3.5 text-muted-foreground/60" />;
  return <CheckCheck className="h-3.5 w-3.5 text-blue-500" />;
}

export default function ChatPage() {
  const [activeGroup, setActiveGroup] = useState<string>("g1");
  const [inputValue, setInputValue] = useState("");
  const [showScrollFab, setShowScrollFab] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>(["Sofia"]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const activeGroupData = chatGroups.find((g) => g.id === activeGroup);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      setShowScrollFab(scrollHeight - scrollTop - clientHeight > 200);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setInputValue("");
  };

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 8.5rem)" }}>
      {/* ─── Encryption Banner ─── */}
      <div className="flex items-center justify-center gap-1.5 bg-amber-50 py-1.5 text-[11px] text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 rounded-lg mb-3">
        <Lock className="h-3 w-3" />
        <span className="font-medium">Esta conversa e encriptada ponta a ponta</span>
      </div>

      {/* ─── Chat Group Selector ─── */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-3 pb-1">
        {chatGroups.map((group) => (
          <button
            key={group.id}
            onClick={() => setActiveGroup(group.id)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeGroup === group.id
                ? "bg-familia-500 text-white shadow-sm"
                : "bg-white border border-border text-muted-foreground hover:bg-muted dark:bg-surface-dark dark:border-border-dark dark:hover:bg-muted-dark"
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            {group.name}
            {group.unread > 0 && (
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  activeGroup === group.id
                    ? "bg-white text-familia-500"
                    : "bg-familia-500 text-white"
                }`}
              >
                {group.unread}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ─── Group Info Bar ─── */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div>
          <h3 className="text-sm font-semibold text-on-surface dark:text-on-surface-dark">
            {activeGroupData?.name}
          </h3>
          <p className="text-[11px] text-muted-foreground">
            {activeGroupData?.memberCount} membros
          </p>
        </div>
      </div>

      {/* ─── Messages ─── */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-hide"
      >
        {mockMessages.map((msg) => {
          if (msg.type === "system") {
            return (
              <div key={msg.id} className="flex justify-center py-1">
                <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground dark:bg-muted-dark">
                  {msg.text}
                </span>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex gap-2 ${msg.isOwn ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              {!msg.isOwn && (
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.senderColor} text-xs font-bold text-white`}
                >
                  {msg.senderInitial}
                </div>
              )}

              {/* Message Bubble */}
              <div className={`max-w-[75%] ${msg.isOwn ? "items-end" : "items-start"}`}>
                {/* Sender name */}
                {!msg.isOwn && (
                  <p className="mb-0.5 text-[11px] font-semibold text-muted-foreground">
                    {msg.sender}
                  </p>
                )}

                {/* Reply indicator */}
                {msg.replyTo && (
                  <div className={`mb-1 flex items-center gap-1 rounded-lg border-l-2 border-familia-500 bg-familia-50 px-2 py-1 dark:bg-familia-500/10 ${msg.isOwn ? "ml-auto" : ""}`}>
                    <Reply className="h-3 w-3 text-familia-500" />
                    <span className="text-[10px] text-muted-foreground truncate">{msg.replyTo}</span>
                  </div>
                )}

                <div
                  className={`rounded-2xl px-3 py-2 ${
                    msg.isOwn
                      ? "bg-familia-500 text-white rounded-tr-md"
                      : "bg-white border border-border dark:bg-surface-dark dark:border-border-dark rounded-tl-md"
                  }`}
                >
                  {/* Image message */}
                  {msg.type === "image" && (
                    <div className={`mb-2 flex h-32 w-48 items-center justify-center rounded-xl ${msg.isOwn ? "bg-familia-600" : "bg-muted dark:bg-muted-dark"}`}>
                      <ImageIcon className={`h-8 w-8 ${msg.isOwn ? "text-familia-300" : "text-muted-foreground/40"}`} />
                    </div>
                  )}

                  {/* Voice message */}
                  {msg.type === "voice" && (
                    <div className="flex items-center gap-2 mb-1">
                      <button
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          msg.isOwn ? "bg-white/20" : "bg-familia-50 dark:bg-familia-500/10"
                        }`}
                      >
                        <Play className={`h-4 w-4 ${msg.isOwn ? "text-white" : "text-familia-500"}`} />
                      </button>
                      <div className="flex-1">
                        <div className={`flex gap-0.5 ${msg.isOwn ? "opacity-60" : "opacity-40"}`}>
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 rounded-full ${msg.isOwn ? "bg-white" : "bg-on-surface dark:bg-on-surface-dark"}`}
                              style={{ height: `${Math.random() * 16 + 4}px` }}
                            />
                          ))}
                        </div>
                      </div>
                      <span className={`text-[10px] ${msg.isOwn ? "text-white/70" : "text-muted-foreground"}`}>
                        0:12
                      </span>
                    </div>
                  )}

                  {/* Text content */}
                  <p className={`text-sm ${msg.isOwn ? "text-white" : "text-on-surface dark:text-on-surface-dark"}`}>
                    {msg.type === "voice" ? "" : msg.text}
                  </p>

                  {/* Time & Status */}
                  <div className={`mt-1 flex items-center gap-1 ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                    <span className={`text-[10px] ${msg.isOwn ? "text-white/60" : "text-muted-foreground"}`}>
                      {msg.time}
                    </span>
                    {msg.isOwn && <MessageStatusIcon status={msg.status} />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* ─── Typing Indicator ─── */}
        {typingUsers.length > 0 && (
          <div className="flex gap-2 items-end">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white">
              S
            </div>
            <div className="rounded-2xl rounded-tl-md bg-white border border-border px-4 py-2.5 dark:bg-surface-dark dark:border-border-dark">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">{typingUsers.join(", ")} a escrever...</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ─── Scroll to Bottom FAB ─── */}
      {showScrollFab && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-28 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg border border-border dark:bg-surface-dark dark:border-border-dark transition-all hover:shadow-xl"
        >
          <ArrowDown className="h-5 w-5 text-on-surface dark:text-on-surface-dark" />
        </button>
      )}

      {/* ─── Message Input ─── */}
      <div className="mt-3 flex items-end gap-2">
        <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white transition-colors hover:bg-muted dark:bg-surface-dark dark:border-border-dark dark:hover:bg-muted-dark">
          <Smile className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="flex-1 flex items-end rounded-2xl border border-border bg-white dark:bg-surface-dark dark:border-border-dark overflow-hidden">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Escreve uma mensagem..."
            rows={1}
            className="flex-1 resize-none bg-transparent px-4 py-2.5 text-sm text-on-surface placeholder:text-muted-foreground focus:outline-none dark:text-on-surface-dark"
          />
        </div>
        <button
          onClick={handleSend}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-familia-500 text-white shadow-sm transition-all hover:bg-familia-600 active:scale-95"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
