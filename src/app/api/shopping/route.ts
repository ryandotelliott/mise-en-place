import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const categoryOrder = [
  "PRODUCE",
  "MEAT",
  "SEAFOOD",
  "DAIRY",
  "BAKERY",
  "PANTRY",
  "FROZEN",
  "BEVERAGES",
  "OTHER",
];

const categoryLabels: Record<string, string> = {
  PRODUCE: "Produce",
  MEAT: "Meat & Poultry",
  SEAFOOD: "Seafood",
  DAIRY: "Dairy",
  BAKERY: "Bakery",
  PANTRY: "Pantry",
  FROZEN: "Frozen",
  BEVERAGES: "Beverages",
  OTHER: "Other",
};

export async function GET() {
  // Get the most recent meal plan with all ingredients
  const mealPlan = await db.mealPlan.findFirst({
    orderBy: { createdAt: "desc" },
    include: {
      days: {
        include: {
          meals: {
            include: {
              recipe: {
                include: {
                  ingredients: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!mealPlan) {
    return NextResponse.json({ byCategory: [], byRecipe: [] });
  }

  // Collect all ingredients grouped by category and recipe
  const ingredientsByCategory: Record<
    string,
    Array<{
      id: string;
      name: string;
      quantity: string;
      recipe: string;
    }>
  > = {};

  const ingredientsByRecipe: Record<
    string,
    Array<{
      id: string;
      name: string;
      quantity: string;
      recipe: string;
    }>
  > = {};

  for (const day of mealPlan.days) {
    for (const meal of day.meals) {
      const recipe = meal.recipe;
      for (const ingredient of recipe.ingredients) {
        const item = {
          id: ingredient.id,
          name: ingredient.name,
          quantity: `${ingredient.quantity} ${ingredient.unit}${ingredient.notes ? `, ${ingredient.notes}` : ""}`,
          recipe: recipe.title,
        };

        // Group by category
        const category = ingredient.category;
        if (!ingredientsByCategory[category]) {
          ingredientsByCategory[category] = [];
        }
        ingredientsByCategory[category].push(item);

        // Group by recipe
        if (!ingredientsByRecipe[recipe.title]) {
          ingredientsByRecipe[recipe.title] = [];
        }
        ingredientsByRecipe[recipe.title].push(item);
      }
    }
  }

  // Format by category with proper ordering
  const byCategory = categoryOrder
    .filter((cat) => ingredientsByCategory[cat]?.length > 0)
    .map((cat) => ({
      category: categoryLabels[cat] || cat,
      items: ingredientsByCategory[cat],
    }));

  // Format by recipe
  const byRecipe = Object.entries(ingredientsByRecipe).map(([name, items]) => ({
    name,
    items,
  }));

  return NextResponse.json({ byCategory, byRecipe });
}
