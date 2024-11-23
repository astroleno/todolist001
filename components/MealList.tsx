"use client";

import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import type { Meal } from "@/app/page";

const mealTypeMap = {
  breakfast: "早餐",
  lunch: "午餐",
  dinner: "晚餐",
};

interface MealListProps {
  meals: Meal[];
  onDelete: (id: string) => void;
}

export function MealList({ meals, onDelete }: MealListProps) {
  if (meals.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        还没有添加任何餐点
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {meals.map((meal) => (
        <Card key={meal.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{meal.name}</h3>
                <p className="text-sm text-gray-500">
                  {mealTypeMap[meal.type]}
                  {meal.notes && ` • ${meal.notes}`}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(meal.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}