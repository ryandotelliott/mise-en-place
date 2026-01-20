import { NextResponse } from "next/server";
import { db } from "@/lib/db";

function formatDate(date: Date): { date: string; formattedDate: string } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatted = `${dayNames[targetDate.getDay()].slice(0, 3)}, ${monthNames[targetDate.getMonth()]} ${targetDate.getDate()}`;

  if (targetDate.getTime() === today.getTime()) {
    return { date: "Today", formattedDate: formatted };
  }
  if (targetDate.getTime() === tomorrow.getTime()) {
    return { date: "Tomorrow", formattedDate: formatted };
  }
  return { date: dayNames[targetDate.getDay()], formattedDate: formatted };
}

function formatMealType(type: string): string {
  return type.charAt(0) + type.slice(1).toLowerCase();
}

export async function GET() {
  const mealPlan = await db.mealPlan.findFirst({
    orderBy: { createdAt: "desc" },
    include: {
      days: {
        orderBy: { date: "asc" },
        include: {
          meals: {
            include: {
              recipe: true,
            },
            orderBy: { mealType: "asc" },
          },
        },
      },
    },
  });

  if (!mealPlan) {
    return NextResponse.json({ days: [] });
  }

  const days = mealPlan.days.map((day) => {
    const { date, formattedDate } = formatDate(day.date);
    return {
      date,
      formattedDate,
      meals: day.meals.map((meal) => ({
        id: meal.recipe.id,
        type: formatMealType(meal.mealType),
        title: meal.recipe.title,
        time: (meal.recipe.prepTime ?? 0) + (meal.recipe.cookTime ?? 0),
      })),
    };
  });

  return NextResponse.json({ days });
}
