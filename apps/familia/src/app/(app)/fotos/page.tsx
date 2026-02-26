"use client";

import { useState } from "react";
import {
  Plus,
  Upload,
  Image as ImageIcon,
  Calendar,
  FolderOpen,
  Heart,
  MessageSquare,
  ChevronDown,
  Share2,
  Tag,
  Clock,
  Sparkles,
  Star,
} from "lucide-react";

/* ─── Types ─── */

type PhotoFilter = "albuns" | "recentes" | "favoritas";

interface Album {
  id: string;
  name: string;
  coverColor: string;
  photoCount: number;
  lastUpdated: string;
}

interface Photo {
  id: string;
  color: string;
  album: string;
  date: string;
  likes: number;
  comments: number;
  isFavorite: boolean;
  taggedPersons?: string[];
}

interface MemoryCard {
  id: string;
  title: string;
  date: string;
  color: string;
  album: string;
}

/* ─── Mock Data ─── */

const albums: Album[] = [
  {
    id: "1",
    name: "Ferias 2025",
    coverColor: "from-familia-400 to-familia-600",
    photoCount: 72,
    lastUpdated: "Ha 2 semanas",
  },
  {
    id: "2",
    name: "Aniversario Sofia",
    coverColor: "from-purple-400 to-purple-600",
    photoCount: 48,
    lastUpdated: "Ha 1 mes",
  },
  {
    id: "3",
    name: "Dia a Dia",
    coverColor: "from-amber-400 to-amber-600",
    photoCount: 156,
    lastUpdated: "Hoje",
  },
  {
    id: "4",
    name: "Escola",
    coverColor: "from-blue-400 to-blue-600",
    photoCount: 34,
    lastUpdated: "Ha 3 dias",
  },
  {
    id: "5",
    name: "Familia Alargada",
    coverColor: "from-rose-400 to-rose-600",
    photoCount: 89,
    lastUpdated: "Ha 1 semana",
  },
];

const recentPhotos: Photo[] = [
  { id: "p1", color: "bg-familia-200", album: "Dia a Dia", date: "Hoje", likes: 3, comments: 1, isFavorite: true, taggedPersons: ["Carlos", "Maria"] },
  { id: "p2", color: "bg-blue-200", album: "Dia a Dia", date: "Hoje", likes: 5, comments: 2, isFavorite: false, taggedPersons: ["Sofia"] },
  { id: "p3", color: "bg-emerald-200", album: "Dia a Dia", date: "Hoje", likes: 2, comments: 0, isFavorite: true, taggedPersons: ["Tomas", "Breno"] },
  { id: "p4", color: "bg-purple-200", album: "Escola", date: "Ontem", likes: 7, comments: 3, isFavorite: false, taggedPersons: ["Sofia"] },
  { id: "p5", color: "bg-amber-200", album: "Escola", date: "Ontem", likes: 1, comments: 0, isFavorite: false },
  { id: "p6", color: "bg-rose-200", album: "Aniversario Sofia", date: "Ha 3 dias", likes: 12, comments: 5, isFavorite: true, taggedPersons: ["Sofia", "Maria", "Carlos"] },
  { id: "p7", color: "bg-indigo-200", album: "Aniversario Sofia", date: "Ha 3 dias", likes: 8, comments: 2, isFavorite: false, taggedPersons: ["Avo Rosa"] },
  { id: "p8", color: "bg-teal-200", album: "Familia Alargada", date: "Ha 1 semana", likes: 4, comments: 1, isFavorite: true, taggedPersons: ["Familia"] },
  { id: "p9", color: "bg-pink-200", album: "Ferias 2025", date: "Ha 2 semanas", likes: 15, comments: 4, isFavorite: true, taggedPersons: ["Carlos", "Maria", "Tomas"] },
];

const memoryCards: MemoryCard[] = [
  { id: "mem1", title: "Primeiro dia de escola da Sofia", date: "Ha 1 ano atras", color: "bg-purple-200", album: "Escola" },
  { id: "mem2", title: "Piquenique na praia", date: "Ha 1 ano atras", color: "bg-blue-200", album: "Ferias 2024" },
];

const filterLabels: Record<PhotoFilter, string> = {
  albuns: "Albuns",
  recentes: "Recentes",
  favoritas: "Favoritas",
};

export default function FotosPage() {
  const [filter, setFilter] = useState<PhotoFilter>("albuns");

  const displayedPhotos =
    filter === "favoritas"
      ? recentPhotos.filter((p) => p.isFavorite)
      : recentPhotos;

  const totalPhotos = albums.reduce((sum, a) => sum + a.photoCount, 0);

  return (
    <div className="space-y-6">
      {/* ─── Stats Bar ─── */}
      <div className="flex gap-3">
        <div className="flex-1 rounded-xl bg-familia-50 p-3 dark:bg-familia-500/10">
          <p className="text-xs text-muted-foreground">Total de fotos</p>
          <p className="text-lg font-bold text-familia-600 dark:text-familia-400">{totalPhotos}</p>
        </div>
        <div className="flex-1 rounded-xl bg-purple-50 p-3 dark:bg-purple-500/10">
          <p className="text-xs text-muted-foreground">Albuns</p>
          <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{albums.length}</p>
        </div>
        <div className="flex-1 rounded-xl bg-rose-50 p-3 dark:bg-rose-500/10">
          <p className="text-xs text-muted-foreground">Favoritas</p>
          <p className="text-lg font-bold text-rose-600 dark:text-rose-400">
            {recentPhotos.filter((p) => p.isFavorite).length}
          </p>
        </div>
      </div>

      {/* ─── Upload & Share Buttons ─── */}
      <div className="flex gap-2">
        <button className="btn-primary flex-1">
          <Upload className="h-4 w-4" />
          Carregar fotos
        </button>
        <button className="btn-secondary flex-none px-4">
          <Share2 className="h-4 w-4" />
        </button>
      </div>

      {/* ─── Memory Cards "Ha 1 ano atras..." ─── */}
      {memoryCards.length > 0 && (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-on-surface dark:text-on-surface-dark">
              Ha 1 ano atras...
            </h3>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {memoryCards.map((memory) => (
              <div
                key={memory.id}
                className="shrink-0 w-48 rounded-2xl border border-amber-200 bg-amber-50/50 overflow-hidden dark:border-amber-500/20 dark:bg-amber-500/5"
              >
                <div className={`h-24 ${memory.color} flex items-center justify-center`}>
                  <ImageIcon className="h-8 w-8 text-white/60" />
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-on-surface dark:text-on-surface-dark line-clamp-2">
                    {memory.title}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {memory.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Filter Tabs ─── */}
      <div className="flex items-center gap-2">
        {(Object.keys(filterLabels) as PhotoFilter[]).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filter === key
                ? "bg-familia-500 text-white shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80 dark:bg-muted-dark dark:hover:bg-muted-dark/80"
            }`}
          >
            {filterLabels[key]}
          </button>
        ))}

        <div className="flex-1" />

        <button className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted dark:border-border-dark dark:hover:bg-muted-dark">
          <Calendar className="h-3 w-3" />
          Data
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      {/* ─── Albums Grid ─── */}
      {filter === "albuns" && (
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Albuns
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {albums.map((album) => (
              <button
                key={album.id}
                className="group overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-soft-lg dark:border-border-dark dark:bg-surface-dark"
              >
                {/* Cover thumbnail placeholder */}
                <div
                  className={`flex h-28 items-center justify-center bg-gradient-to-br ${album.coverColor} relative`}
                >
                  <FolderOpen className="h-8 w-8 text-white/70 transition-transform group-hover:scale-110" />
                  {/* Share button overlay */}
                  <button className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/30 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <Share2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-semibold text-on-surface dark:text-on-surface-dark">
                    {album.name}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ImageIcon className="h-3 w-3" />
                      {album.photoCount} fotos
                    </span>
                    <span>{album.lastUpdated}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ─── Photo Grid (Recent / Favorites) ─── */}
      {(filter === "recentes" || filter === "favoritas") && (
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {filter === "favoritas" ? "Fotos favoritas" : "Fotos recentes"}
          </h3>
          {displayedPhotos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Heart className="mb-3 h-12 w-12 text-muted-foreground/30" />
              <p className="text-sm font-medium text-muted-foreground">
                Nenhuma foto favorita ainda
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1.5">
              {displayedPhotos.map((photo) => (
                <button
                  key={photo.id}
                  className="group relative aspect-square overflow-hidden rounded-xl transition-all hover:opacity-90"
                >
                  {/* Placeholder colored box */}
                  <div
                    className={`h-full w-full ${photo.color} flex items-center justify-center`}
                  >
                    <ImageIcon className="h-6 w-6 text-white/50" />
                  </div>

                  {/* Person tagging badges */}
                  {photo.taggedPersons && photo.taggedPersons.length > 0 && (
                    <div className="absolute top-1 left-1 flex items-center gap-0.5">
                      <span className="flex items-center gap-0.5 rounded-full bg-black/40 px-1.5 py-0.5 text-[9px] font-medium text-white">
                        <Tag className="h-2.5 w-2.5" />
                        {photo.taggedPersons.length}
                      </span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex w-full items-center justify-between p-2">
                      <span className="flex items-center gap-0.5 text-xs text-white">
                        <Heart className="h-3 w-3" />
                        {photo.likes}
                      </span>
                      <span className="flex items-center gap-0.5 text-xs text-white">
                        <MessageSquare className="h-3 w-3" />
                        {photo.comments}
                      </span>
                    </div>
                  </div>

                  {/* Favorite indicator */}
                  {photo.isFavorite && (
                    <div className="absolute right-1 top-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 drop-shadow" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ─── FAB: Add Photo ─── */}
      <button className="fab" aria-label="Adicionar foto">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
