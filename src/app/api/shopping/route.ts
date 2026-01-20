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

type AggregatedIngredient = {
  name: string;
  quantity: number;
  unit: string;
  category: string;
  recipes: Set<string>;
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

  // Aggregate ingredients by name + unit
  const aggregated = new Map<string, AggregatedIngredient>();

  for (const day of mealPlan.days) {
    for (const meal of day.meals) {
      const recipe = meal.recipe;
      for (const ingredient of recipe.ingredients) {
        // Create aggregation key from normalized name + unit
        const key = `${ingredient.name.toLowerCase()}-${ingredient.unit.toLowerCase()}`;

        if (aggregated.has(key)) {
          const existing = aggregated.get(key)!;
          existing.quantity += ingredient.quantity;
          existing.recipes.add(recipe.title);
        } else {
          aggregated.set(key, {
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            category: ingredient.category,
            recipes: new Set([recipe.title]),
          });
        }
      }
    }
  }

  // Convert aggregated items to array format
  const aggregatedItems = Array.from(aggregated.entries()).map(
    ([key, item]) => ({
      id: key,
      name: item.name,
      quantity: `${item.quantity} ${item.unit}`,
      category: item.category,
      recipes: Array.from(item.recipes),
    })
  );

  // Group by category
  const ingredientsByCategory: Record<string, typeof aggregatedItems> = {};
  for (const item of aggregatedItems) {
    if (!ingredientsByCategory[item.category]) {
      ingredientsByCategory[item.category] = [];
    }
    ingredientsByCategory[item.category].push(item);
  }

  // Group by recipe (each recipe shows only its ingredients, not aggregated)
  const ingredientsByRecipe: Record<
    string,
    Array<{ id: string; name: string; quantity: string }>
  > = {};

  for (const day of mealPlan.days) {
    for (const meal of day.meals) {
      const recipe = meal.recipe;
      if (!ingredientsByRecipe[recipe.title]) {
        ingredientsByRecipe[recipe.title] = [];
      }
      for (const ingredient of recipe.ingredients) {
        ingredientsByRecipe[recipe.title].push({
          id: ingredient.id,
          name: ingredient.name,
          quantity: `${ingredient.quantity} ${ingredient.unit}`,
        });
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
