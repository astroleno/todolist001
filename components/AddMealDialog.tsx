"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { Meal } from "@/app/page";

interface AddMealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (meal: Omit<Meal, "id">) => void;
}

export function AddMealDialog({ open, onOpenChange, onAdd }: AddMealDialogProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<Meal["type"]>("breakfast");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name,
      type,
      notes,
      date: new Date(),
    });
    setName("");
    setType("breakfast");
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>添加餐点</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">餐点名称</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="输入餐点名称"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">餐点类型</Label>
            <Select value={type} onValueChange={(value: Meal["type"]) => setType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="选择餐点类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">早餐</SelectItem>
                <SelectItem value="lunch">午餐</SelectItem>
                <SelectItem value="dinner">晚餐</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">备注</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="添加备注（可选）"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              取消
            </Button>
            <Button type="submit">添加</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}