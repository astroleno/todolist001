"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddMealDialog } from "@/components/AddMealDialog";
import { MealList } from "@/components/MealList";
import { useToast } from "@/components/ui/use-toast";

export type Meal = {
  id: string;
  name: string;
  type: "breakfast" | "lunch" | "dinner";
  date: Date;
  notes?: string;
};

export default function Home() {
  const [date, setDate] = useState<Date>(new Date());
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const addMeal = (meal: Omit<Meal, "id">) => {
    const newMeal = {
      ...meal,
      id: Math.random().toString(36).substr(2, 9),
    };
    setMeals([...meals, newMeal]);
    toast({
      title: "添加成功",
      description: `已添加${meal.name}到${format(date, "MM月dd日")}的${
        meal.type === "breakfast" ? "早餐" : meal.type === "lunch" ? "午餐" : "晚餐"
      }`,
    });
  };

  const deleteMeal = (id: string) => {
    const mealToDelete = meals.find((meal) => meal.id === id);
    setMeals(meals.filter((meal) => meal.id !== id));
    if (mealToDelete) {
      toast({
        title: "删除成功",
        description: `已删除${mealToDelete.name}`,
        variant: "destructive",
      });
    }
  };

  const filteredMeals = meals.filter(
    (meal) => format(meal.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          每日饮食计划
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <Card className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border"
            />
          </Card>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                {format(date, "yyyy年MM月dd日")}的饮食计划
              </h2>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                添加餐点
              </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="breakfast">早餐</TabsTrigger>
                <TabsTrigger value="lunch">午餐</TabsTrigger>
                <TabsTrigger value="dinner">晚餐</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <MealList
                  meals={filteredMeals}
                  onDelete={deleteMeal}
                />
              </TabsContent>
              <TabsContent value="breakfast">
                <MealList
                  meals={filteredMeals.filter((meal) => meal.type === "breakfast")}
                  onDelete={deleteMeal}
                />
              </TabsContent>
              <TabsContent value="lunch">
                <MealList
                  meals={filteredMeals.filter((meal) => meal.type === "lunch")}
                  onDelete={deleteMeal}
                />
              </TabsContent>
              <TabsContent value="dinner">
                <MealList
                  meals={filteredMeals.filter((meal) => meal.type === "dinner")}
                  onDelete={deleteMeal}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <AddMealDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAdd={(meal) => {
            addMeal({ ...meal, date });
            setIsDialogOpen(false);
          }}
        />
      </div>
    </div>
  );
}