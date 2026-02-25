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
}

/* ─── Mock Data ─── */

const albums: Album[] = [
  {
    id: "1",
    name: "Fim de semana",
    coverColor: "from-familia-400 to-familia-600",
    photoCount: 24,
    lastUpdated: "Hoje",
  },
  {
    id: "2",
    name: "Aniversario do Avo",
    coverColor: "from-purple-400 to-purple-600",
    photoCount: 48,
    lastUpdated: "Ha 3 dias",
  },
  {
    id: "3",
    name: "Escola - Ana",
    coverColor: "from-blue-400 to-blue-600",
    photoCount: 12,
    lastUpdated: "Ha 1 semana",
  },
  {
    id: "4",
    name: "Passeio ao parque",
    coverColor: "from-emerald-400 to-emerald-600",
    photoCount: 36,
    lastUpdated: "Ha 2 semanas",
  },
  {
    id: "5",
    name: "Casa nova",
    coverColor: "from-amber-400 to-amber-600",
    photoCount: 18,
    lastUpdated: "Ha 1 mes",
  },
  {
    id: "6",
    name: "Ferias",
    coverColor: "from-rose-400 to-rose-600",
    photoCount: 72,
    lastUpdated: "Ha 2 meses",
  },
];

const recentPhotos: Photo[] = [
  { id: "p1", color: "bg-familia-200", album: "Fim de semana", date: "Hoje", likes: 3, comments: 1, isFavorite: true },
  { id: "p2", color: "bg-blue-200", album: "Fim de semana", date: "Hoje", likes: 5, comments: 2, isFavorite: false },
  { id: "p3", color: "bg-emerald-200", album: "Fim de semana", date: "Hoje", likes: 2, comments: 0, isFavorite: true },
  { id: "p4", color: "bg-purple-200", album: "Fim de semana", date: "Ontem", likes: 7, comments: 3, isFavorite: false },
  { id: "p5", color: "bg-amber-200", album: "Fim de semana", date: "Ontem", likes: 1, comments: 0, isFavorite: false },
  { id: "p6", color: "bg-rose-200", album: "Aniversario do Avo", date: "Ha 3 dias", likes: 12, comments: 5, isFavorite: true },
  { id: "p7", color: "bg-indigo-200", album: "Aniversario do Avo", date: "Ha 3 dias", likes: 8, comments: 2, isFavorite: false },
  { id: "p8", color: "bg-teal-200", album: "Aniversario do Avo", date: "Ha 3 dias", likes: 4, comments: 1, isFavorite: true },
  { id: "p9", color: "bg-pink-200", album: "Escola - Ana", date: "Ha 1 semana", likes: 6, comments: 0, isFavorite: false },
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

  return (
    <div className="space-y-6">
      {/* ─── Upload Button ─── */}
      <button className="btn-primary w-full">
        <Upload className="h-4 w-4" />
        Carregar fotos
      </button>

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

        {/* Filter by date/album dropdown */}
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
                  className={`flex h-28 items-center justify-center bg-gradient-to-br ${album.coverColor}`}
                >
                  <FolderOpen className="h-8 w-8 text-white/70 transition-transform group-hover:scale-110" />
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-semibold text-on-surface dark:text-on-surface-dark">
                    {album.name}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ImageIcon className="h-3 w-3" />
                      {album.photoCount}
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
                      <Heart className="h-3.5 w-3.5 fill-white text-white drop-shadow" />
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
