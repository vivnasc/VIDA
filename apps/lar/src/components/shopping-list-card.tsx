"use client";

import { ShoppingCart, ChevronRight } from "lucide-react";

interface ShoppingListCardProps {
  name: string;
  itemCount: number;
  checkedCount: number;
  progress: number;
  budget?: number;
  spent?: number;
}

export function ShoppingListCard({
  name,
  itemCount,
  checkedCount,
  progress,
  budget,
  spent,
}: ShoppingListCardProps) {
  const budgetPercentage = budget && spent ? Math.round((spent / budget) * 100) : 0;
  const overBudget = budget && spent ? spent > budget : false;

  return (
    <div className="app-card hover:shadow-soft-lg transition-shadow">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <ShoppingCart className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {name}
            </h3>
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            {checkedCount} de {itemCount} itens
          </p>

          {/* Progress bar */}
          <div className="mt-2">
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Budget */}
          {budget !== undefined && spent !== undefined && (
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-400">Orçamento</span>
              <span
                className={`text-xs font-medium ${
                  overBudget ? "text-red-600" : "text-gray-600"
                }`}
              >
                {spent.toFixed(2)} / {budget.toFixed(2)} EUR
                <span className="ml-1 text-2xs text-gray-400">
                  ({budgetPercentage}%)
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
