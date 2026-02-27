"use client";

import { X, Download, RefreshCw, WifiOff } from "lucide-react";
import { useServiceWorker } from "@/hooks/use-service-worker";
import { usePwaInstall } from "@/hooks/use-pwa-install";

export function PwaPrompts() {
  const { hasUpdate, isOffline, applyUpdate } = useServiceWorker();
  const { canInstall, install, dismiss } = usePwaInstall();

  return (
    <>
      {/* Update Available Banner */}
      {hasUpdate && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-primary-600 text-white px-4 py-3 safe-top animate-in">
          <div className="flex items-center gap-3 max-w-lg mx-auto">
            <RefreshCw className="w-5 h-5 flex-shrink-0 animate-spin" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">Nova versão disponível</p>
              <p className="text-xs text-primary-100">Toca para actualizar o maBIZ</p>
            </div>
            <button
              onClick={applyUpdate}
              className="px-3 py-1.5 bg-white text-primary-700 rounded-lg text-xs font-bold flex-shrink-0 hover:bg-primary-50 transition-colors"
            >
              Actualizar
            </button>
          </div>
        </div>
      )}

      {/* Offline Banner */}
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 z-[59] bg-gray-800 text-white px-4 py-2.5 safe-top">
          <div className="flex items-center gap-2 justify-center max-w-lg mx-auto">
            <WifiOff className="w-4 h-4 flex-shrink-0" />
            <p className="text-xs font-medium">Modo offline - alguns dados podem não estar actualizados</p>
          </div>
        </div>
      )}

      {/* Install Prompt */}
      {canInstall && !hasUpdate && (
        <div className="fixed bottom-20 left-4 right-4 z-50 max-w-lg mx-auto animate-in">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Download className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold mb-0.5">Instalar maBIZ</h3>
                <p className="text-xs text-gray-500 mb-3">
                  Adiciona ao ecrã inicial para acesso rápido e funcionar offline
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={install}
                    className="flex-1 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors"
                  >
                    Instalar
                  </button>
                  <button
                    onClick={dismiss}
                    className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Agora não
                  </button>
                </div>
              </div>
              <button
                onClick={dismiss}
                className="p-1 text-gray-400 hover:text-gray-600 -mt-1 -mr-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
