import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { IngredientsList } from "@/features/recipes/components/ingredients-list";
import { InstructionsList } from "@/features/recipes/components/instructions-list";
import { RecipeHeader } from "@/features/recipes/components/recipe-header";
import { db } from "@/lib/db";

const difficultyLabels: Record<string, string> = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const recipe = await db.recipe.findUnique({
    where: { id },
    include: { ingredients: true },
  });

  if (!recipe) {
    notFound();
  }

  const totalTime = (recipe.prepTime ?? 0) + (recipe.cookTime ?? 0);
  const ingredients = recipe.ingredients.map((ing) => {
    let text = `${ing.quantity} ${ing.unit} ${ing.name}`;
    if (ing.notes) {
      text += `, ${ing.notes}`;
    }
    return text;
  });

  return (
    <div className="min-h-screen bg-background pb-12 md:pb-16">
      <RecipeHeader
        title={recipe.title}
        difficulty={difficultyLabels[recipe.difficulty] ?? recipe.difficulty}
        time={totalTime}
        servings={recipe.servings}
      />

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-[minmax(280px,1fr)_1.5fr] gap-8 md:gap-12">
          <div className="md:sticky md:top-8 md:self-start">
            <IngredientsList ingredients={ingredients} />
          </div>

          <Separator className="md:hidden bg-border/30" />

          <InstructionsList instructions={recipe.instructions} />
        </div>
      </div>
    </div>
  );
}
