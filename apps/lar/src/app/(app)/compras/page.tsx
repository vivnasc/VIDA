"use client";

import { useState } from "react";
import { Plus, ShoppingCart } from "lucide-react";
import { ShoppingListCard } from "@/components/shopping-list-card";

interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price?: number;
  checked: boolean;
}

interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingItem[];
  budget?: number;
  createdAt: string;
}

const mockLists: ShoppingList[] = [
  {
    id: "1",
    name: "Compras da semana",
    budget: 80,
    createdAt: "2026-02-23",
    items: [
      { id: "1a", name: "Leite", quantity: 2, unit: "L", price: 1.29, checked: true },
      { id: "1b", name: "Pão", quantity: 1, unit: "un", price: 1.49, checked: true },
      { id: "1c", name: "Frango", quantity: 1, unit: "kg", price: 5.99, checked: false },
      { id: "1d", name: "Arroz", quantity: 1, unit: "kg", price: 1.89, checked: false },
      { id: "1e", name: "Tomate", quantity: 0.5, unit: "kg", price: 2.49, checked: false },
      { id: "1f", name: "Cebola", quantity: 1, unit: "kg", price: 1.29, checked: false },
      { id: "1g", name: "Azeite", quantity: 1, unit: "L", price: 5.99, checked: false },
    ],
  },
  {
    id: "2",
    name: "Limpeza mensal",
    budget: 30,
    createdAt: "2026-02-20",
    items: [
      { id: "2a", name: "Detergente roupa", quantity: 1, unit: "L", price: 6.99, checked: false },
      { id: "2b", name: "Lixívia", quantity: 1, unit: "L", price: 1.49, checked: false },
      { id: "2c", name: "Esponjas", quantity: 1, unit: "pack", price: 2.29, checked: true },
      { id: "2d", name: "Sacos do lixo", quantity: 1, unit: "rolo", price: 1.99, checked: false },
    ],
  },
  {
    id: "3",
    name: "Farmácia",
    budget: 25,
    createdAt: "2026-02-22",
    items: [
      { id: "3a", name: "Ibuprofeno", quantity: 1, unit: "cx", price: 4.5, checked: false },
      { id: "3b", name: "Pensos rápidos", quantity: 1, unit: "cx", price: 2.99, checked: false },
      { id: "3c", name: "Protetor solar", quantity: 1, unit: "un", price: 12.99, checked: false },
    ],
  },
];

export default function ComprasPage() {
  const [lists, setLists] = useState<ShoppingList[]>(mockLists);
  const [selectedList, setSelectedList] = useState<string | null>(null);

  const activeList = lists.find((l) => l.id === selectedList);

  const toggleItem = (listId: string, itemId: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId
                  ? { ...item, checked: !item.checked }
                  : item
              ),
            }
          : list
      )
    );
  };

  const getListProgress = (list: ShoppingList) => {
    const checked = list.items.filter((i) => i.checked).length;
    return Math.round((checked / list.items.length) * 100);
  };

  const getListSpent = (list: ShoppingList) => {
    return list.items
      .filter((i) => i.checked)
      .reduce((sum, i) => sum + (i.price ?? 0) * i.quantity, 0);
  };

  const getListTotal = (list: ShoppingList) => {
    return list.items.reduce(
      (sum, i) => sum + (i.price ?? 0) * i.quantity,
      0
    );
  };

  if (activeList) {
    const spent = getListSpent(activeList);
    const total = getListTotal(activeList);

    return (
      <div>
        <header className="bg-blue-500 pt-safe-top">
          <div className="px-4 pt-4 pb-4">
            <button
              onClick={() => setSelectedList(null)}
              className="text-blue-100 text-sm mb-2 hover:text-white transition-colors"
            >
              &larr; Voltar às listas
            </button>
            <h1 className="text-xl font-bold text-white">{activeList.name}</h1>
            {activeList.budget && (
              <div className="mt-2">
                <div className="flex justify-between text-sm text-blue-100 mb-1">
                  <span>
                    Gasto: {spent.toFixed(2)} EUR / {activeList.budget.toFixed(2)} EUR
                  </span>
                  <span>{Math.round((spent / activeList.budget) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      spent > activeList.budget ? "bg-red-400" : "bg-white"
                    }`}
                    style={{
                      width: `${Math.min(
                        (spent / activeList.budget) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="px-4 pt-4 space-y-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              {activeList.items.filter((i) => i.checked).length} de{" "}
              {activeList.items.length} itens
            </span>
            <span className="text-sm font-medium text-gray-700">
              Total: {total.toFixed(2)} EUR
            </span>
          </div>

          <div className="app-card divide-y divide-gray-100">
            {activeList.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                <button
                  onClick={() => toggleItem(activeList.id, item.id)}
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                    item.checked
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {item.checked && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      item.checked
                        ? "line-through text-gray-400"
                        : "text-gray-900"
                    }`}
                  >
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.quantity} {item.unit}
                  </p>
                </div>
                {item.price && (
                  <span
                    className={`text-sm font-medium ${
                      item.checked ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    {(item.price * item.quantity).toFixed(2)} EUR
                  </span>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <header className="bg-blue-500 pt-safe-top">
        <div className="px-4 pt-4 pb-4">
          <h1 className="text-xl font-bold text-white">Listas de Compras</h1>
          <p className="text-blue-100 text-sm mt-0.5">
            {lists.length} listas ativas
          </p>
        </div>
      </header>

      <main className="px-4 pt-4 space-y-3">
        {lists.map((list) => (
          <button
            key={list.id}
            onClick={() => setSelectedList(list.id)}
            className="w-full text-left"
          >
            <ShoppingListCard
              name={list.name}
              itemCount={list.items.length}
              checkedCount={list.items.filter((i) => i.checked).length}
              progress={getListProgress(list)}
              budget={list.budget}
              spent={getListSpent(list)}
            />
          </button>
        ))}

        {lists.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Nenhuma lista de compras</p>
            <p className="text-gray-400 text-xs mt-1">
              Cria uma nova lista para começar
            </p>
          </div>
        )}
      </main>

      {/* FAB - Create List */}
      <button className="fixed bottom-24 right-4 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-600 active:bg-blue-700 transition-colors z-30">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
