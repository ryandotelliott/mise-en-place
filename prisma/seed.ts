import { db } from "../src/lib/db";

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await db.meal.deleteMany();
  await db.mealDay.deleteMany();
  await db.mealPlan.deleteMany();
  await db.ingredient.deleteMany();
  await db.recipe.deleteMany();

  // Create recipes
  const garlicButterSalmon = await db.recipe.create({
    data: {
      title: "Garlic Butter Salmon",
      description: "Pan-seared salmon with a rich garlic butter sauce",
      servings: 2,
      prepTime: 5,
      cookTime: 20,
      difficulty: "EASY",
      instructions: [
        "Pat salmon dry and season with salt and pepper.",
        "Heat olive oil in a skillet over medium-high heat.",
        "Cook salmon skin-side up for 4 minutes until golden.",
        "Flip and cook 3 more minutes.",
        "Add butter and garlic, cook until fragrant.",
        "Add lemon juice and spoon sauce over salmon.",
        "Garnish with parsley and serve.",
      ],
      ingredients: {
        create: [
          {
            quantity: 2,
            unit: "fillet",
            name: "Salmon fillets",
            category: "SEAFOOD",
            prepNotes: "6 oz each",
          },
          { quantity: 3, unit: "tbsp", name: "Butter", category: "DAIRY" },
          {
            quantity: 4,
            unit: "clove",
            name: "Garlic",
            category: "PRODUCE",
            prepNotes: "minced",
          },
          { quantity: 1, unit: "tbsp", name: "Olive oil", category: "PANTRY" },
          {
            quantity: 1,
            unit: "whole",
            name: "Lemon",
            category: "PRODUCE",
            prepNotes: "juiced",
          },
          {
            quantity: 2,
            unit: "tbsp",
            name: "Fresh parsley",
            category: "PRODUCE",
            prepNotes: "chopped",
          },
        ],
      },
    },
  });

  const chickenTikkaMasala = await db.recipe.create({
    data: {
      title: "Chicken Tikka Masala",
      description: "Creamy, spiced tomato curry with tender chicken",
      servings: 4,
      prepTime: 15,
      cookTime: 35,
      difficulty: "MEDIUM",
      instructions: [
        "Marinate chicken in yogurt and half the spices for 30 min.",
        "Cook chicken in a hot pan until browned. Set aside.",
        "Sauté onion and garlic until soft.",
        "Add remaining spices and tomatoes. Simmer 10 min.",
        "Stir in cream and add chicken back.",
        "Simmer 15 minutes until sauce thickens.",
        "Serve over rice with cilantro.",
      ],
      ingredients: {
        create: [
          {
            quantity: 1.5,
            unit: "lb",
            name: "Chicken breast",
            category: "MEAT",
            prepNotes: "cubed",
          },
          { quantity: 1, unit: "cup", name: "Yogurt", category: "DAIRY" },
          {
            quantity: 2,
            unit: "tbsp",
            name: "Tikka masala spice",
            category: "PANTRY",
          },
          {
            quantity: 1,
            unit: "can",
            name: "Crushed tomatoes",
            category: "PANTRY",
          },
          { quantity: 1, unit: "cup", name: "Heavy cream", category: "DAIRY" },
          {
            quantity: 1,
            unit: "whole",
            name: "Onion",
            category: "PRODUCE",
            prepNotes: "diced",
          },
          {
            quantity: 4,
            unit: "clove",
            name: "Garlic",
            category: "PRODUCE",
            prepNotes: "minced",
          },
          {
            quantity: 2,
            unit: "tbsp",
            name: "Fresh cilantro",
            category: "PRODUCE",
          },
        ],
      },
    },
  });

  const mushroomRisotto = await db.recipe.create({
    data: {
      title: "Mushroom Risotto",
      description: "Creamy Italian rice with sautéed mushrooms and parmesan",
      servings: 4,
      prepTime: 10,
      cookTime: 40,
      difficulty: "MEDIUM",
      instructions: [
        "Sauté mushrooms in butter until golden. Set aside.",
        "Cook shallot until soft, add rice and toast 2 min.",
        "Add wine and stir until absorbed.",
        "Add stock one ladle at a time, stirring constantly.",
        "Continue for 18-20 min until rice is creamy.",
        "Stir in mushrooms, parmesan, and butter.",
        "Season and serve with extra parmesan.",
      ],
      ingredients: {
        create: [
          {
            quantity: 1.5,
            unit: "cup",
            name: "Arborio rice",
            category: "PANTRY",
          },
          {
            quantity: 8,
            unit: "oz",
            name: "Mixed mushrooms",
            category: "PRODUCE",
            prepNotes: "sliced",
          },
          {
            quantity: 4,
            unit: "cup",
            name: "Chicken stock",
            category: "PANTRY",
            prepNotes: "warm",
          },
          {
            quantity: 0.5,
            unit: "cup",
            name: "White wine",
            category: "PANTRY",
          },
          {
            quantity: 0.5,
            unit: "cup",
            name: "Parmesan",
            category: "DAIRY",
            prepNotes: "grated",
          },
          { quantity: 2, unit: "tbsp", name: "Butter", category: "DAIRY" },
          {
            quantity: 1,
            unit: "whole",
            name: "Shallot",
            category: "PRODUCE",
            prepNotes: "minced",
          },
          {
            quantity: 1,
            unit: "tbsp",
            name: "Fresh thyme",
            category: "PRODUCE",
          },
        ],
      },
    },
  });

  const thaiGreenCurry = await db.recipe.create({
    data: {
      title: "Thai Green Curry",
      description: "Aromatic coconut curry with vegetables and fresh basil",
      servings: 4,
      prepTime: 10,
      cookTime: 25,
      difficulty: "EASY",
      instructions: [
        "Cook curry paste in a bit of coconut cream until fragrant.",
        "Add protein and cook until just done.",
        "Pour in remaining coconut milk.",
        "Add vegetables, fish sauce, and sugar.",
        "Simmer 10 minutes until vegetables are tender.",
        "Stir in fresh basil.",
        "Serve over jasmine rice.",
      ],
      ingredients: {
        create: [
          {
            quantity: 1,
            unit: "lb",
            name: "Chicken thigh",
            category: "MEAT",
            prepNotes: "sliced",
          },
          {
            quantity: 2,
            unit: "tbsp",
            name: "Green curry paste",
            category: "PANTRY",
          },
          {
            quantity: 1,
            unit: "can",
            name: "Coconut milk",
            category: "PANTRY",
          },
          {
            quantity: 1,
            unit: "cup",
            name: "Mixed vegetables",
            category: "PRODUCE",
          },
          { quantity: 1, unit: "tbsp", name: "Fish sauce", category: "PANTRY" },
          {
            quantity: 1,
            unit: "tbsp",
            name: "Brown sugar",
            category: "PANTRY",
          },
          {
            quantity: 0.5,
            unit: "cup",
            name: "Fresh basil",
            category: "PRODUCE",
          },
          {
            quantity: 2,
            unit: "cup",
            name: "Jasmine rice",
            category: "PANTRY",
          },
        ],
      },
    },
  });

  const mediterraneanQuinoaBowl = await db.recipe.create({
    data: {
      title: "Mediterranean Quinoa Bowl",
      description:
        "Healthy grain bowl with chickpeas, feta, and fresh vegetables",
      servings: 2,
      prepTime: 15,
      cookTime: 20,
      difficulty: "EASY",
      instructions: [
        "Cook quinoa according to package directions.",
        "Roast chickpeas at 400°F for 20 min until crispy.",
        "Prepare vegetables while quinoa cooks.",
        "Fluff quinoa and divide into bowls.",
        "Top with chickpeas, vegetables, feta, and olives.",
        "Drizzle with dressing.",
        "Garnish with fresh herbs.",
      ],
      ingredients: {
        create: [
          { quantity: 1, unit: "cup", name: "Quinoa", category: "PANTRY" },
          {
            quantity: 1,
            unit: "can",
            name: "Chickpeas",
            category: "PANTRY",
            prepNotes: "drained",
          },
          {
            quantity: 1,
            unit: "whole",
            name: "Cucumber",
            category: "PRODUCE",
            prepNotes: "diced",
          },
          {
            quantity: 1,
            unit: "cup",
            name: "Cherry tomatoes",
            category: "PRODUCE",
            prepNotes: "halved",
          },
          {
            quantity: 0.5,
            unit: "cup",
            name: "Feta cheese",
            category: "DAIRY",
          },
          {
            quantity: 0.25,
            unit: "cup",
            name: "Kalamata olives",
            category: "PANTRY",
          },
          { quantity: 2, unit: "tbsp", name: "Olive oil", category: "PANTRY" },
          {
            quantity: 1,
            unit: "whole",
            name: "Lemon",
            category: "PRODUCE",
            prepNotes: "juiced",
          },
        ],
      },
    },
  });

  // Additional quick meals
  const oatmealWithBerries = await db.recipe.create({
    data: {
      title: "Oatmeal with Berries",
      description: "Warm oatmeal topped with fresh berries and honey",
      servings: 1,
      prepTime: 2,
      cookTime: 8,
      difficulty: "EASY",
      instructions: [
        "Bring water or milk to a boil.",
        "Stir in oats and reduce heat.",
        "Cook for 5 minutes, stirring occasionally.",
        "Top with fresh berries and drizzle with honey.",
      ],
      ingredients: {
        create: [
          {
            quantity: 0.5,
            unit: "cup",
            name: "Rolled oats",
            category: "PANTRY",
          },
          { quantity: 1, unit: "cup", name: "Milk", category: "DAIRY" },
          {
            quantity: 0.5,
            unit: "cup",
            name: "Mixed berries",
            category: "PRODUCE",
          },
          { quantity: 1, unit: "tbsp", name: "Honey", category: "PANTRY" },
        ],
      },
    },
  });

  const grilledChickenSalad = await db.recipe.create({
    data: {
      title: "Grilled Chicken Salad",
      description: "Fresh greens with grilled chicken and balsamic dressing",
      servings: 1,
      prepTime: 10,
      cookTime: 15,
      difficulty: "EASY",
      instructions: [
        "Season chicken breast with salt and pepper.",
        "Grill chicken until cooked through, about 6-7 minutes per side.",
        "Let rest 5 minutes, then slice.",
        "Arrange greens on plate and top with chicken.",
        "Add tomatoes and cucumber, drizzle with dressing.",
      ],
      ingredients: {
        create: [
          {
            quantity: 0.5,
            unit: "lb",
            name: "Chicken breast",
            category: "MEAT",
          },
          {
            quantity: 2,
            unit: "cup",
            name: "Mixed greens",
            category: "PRODUCE",
          },
          {
            quantity: 0.5,
            unit: "cup",
            name: "Cherry tomatoes",
            category: "PRODUCE",
          },
          {
            quantity: 0.5,
            unit: "whole",
            name: "Cucumber",
            category: "PRODUCE",
            prepNotes: "sliced",
          },
          {
            quantity: 2,
            unit: "tbsp",
            name: "Balsamic dressing",
            category: "PANTRY",
          },
        ],
      },
    },
  });

  const turkeyWrap = await db.recipe.create({
    data: {
      title: "Turkey Wrap",
      description: "Quick and healthy turkey wrap with fresh veggies",
      servings: 1,
      prepTime: 5,
      cookTime: 0,
      difficulty: "EASY",
      instructions: [
        "Lay tortilla flat and spread with hummus.",
        "Layer turkey slices down the center.",
        "Add lettuce, tomato, and cucumber.",
        "Roll tightly, tucking in the sides.",
        "Cut in half and serve.",
      ],
      ingredients: {
        create: [
          {
            quantity: 1,
            unit: "whole",
            name: "Large tortilla",
            category: "BAKERY",
          },
          { quantity: 4, unit: "oz", name: "Sliced turkey", category: "MEAT" },
          { quantity: 2, unit: "tbsp", name: "Hummus", category: "PANTRY" },
          { quantity: 0.5, unit: "cup", name: "Lettuce", category: "PRODUCE" },
          { quantity: 2, unit: "slice", name: "Tomato", category: "PRODUCE" },
        ],
      },
    },
  });

  const avocadoToast = await db.recipe.create({
    data: {
      title: "Avocado Toast",
      description: "Classic avocado toast with everything bagel seasoning",
      servings: 1,
      prepTime: 5,
      cookTime: 5,
      difficulty: "EASY",
      instructions: [
        "Toast bread until golden.",
        "Mash avocado with a fork and season with salt and pepper.",
        "Spread avocado on toast.",
        "Top with everything bagel seasoning and red pepper flakes.",
      ],
      ingredients: {
        create: [
          {
            quantity: 2,
            unit: "slice",
            name: "Sourdough bread",
            category: "BAKERY",
          },
          { quantity: 1, unit: "whole", name: "Avocado", category: "PRODUCE" },
          {
            quantity: 1,
            unit: "tsp",
            name: "Everything bagel seasoning",
            category: "PANTRY",
          },
          {
            quantity: 0.25,
            unit: "tsp",
            name: "Red pepper flakes",
            category: "PANTRY",
          },
        ],
      },
    },
  });

  const greekYogurtHoney = await db.recipe.create({
    data: {
      title: "Greek Yogurt & Honey",
      description: "Creamy Greek yogurt with honey and granola",
      servings: 1,
      prepTime: 2,
      cookTime: 0,
      difficulty: "EASY",
      instructions: [
        "Scoop yogurt into a bowl.",
        "Drizzle with honey.",
        "Top with granola and fresh berries if desired.",
      ],
      ingredients: {
        create: [
          { quantity: 1, unit: "cup", name: "Greek yogurt", category: "DAIRY" },
          { quantity: 1, unit: "tbsp", name: "Honey", category: "PANTRY" },
          { quantity: 0.25, unit: "cup", name: "Granola", category: "PANTRY" },
        ],
      },
    },
  });

  // Create a meal plan for this week
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + 6);

  const mealPlan = await db.mealPlan.create({
    data: {
      name: "This Week",
      startDate: today,
      endDate: endDate,
    },
  });

  // Create meal days and meals
  const mealSchedule = [
    // Today (Monday)
    {
      offset: 0,
      meals: [
        { type: "BREAKFAST" as const, recipeId: oatmealWithBerries.id },
        { type: "LUNCH" as const, recipeId: grilledChickenSalad.id },
        { type: "DINNER" as const, recipeId: garlicButterSalmon.id },
      ],
    },
    // Tomorrow (Tuesday)
    {
      offset: 1,
      meals: [
        { type: "LUNCH" as const, recipeId: turkeyWrap.id },
        { type: "DINNER" as const, recipeId: chickenTikkaMasala.id },
      ],
    },
    // Wednesday
    {
      offset: 2,
      meals: [{ type: "DINNER" as const, recipeId: mushroomRisotto.id }],
    },
    // Thursday
    {
      offset: 3,
      meals: [
        { type: "BREAKFAST" as const, recipeId: avocadoToast.id },
        { type: "DINNER" as const, recipeId: thaiGreenCurry.id },
      ],
    },
    // Friday
    {
      offset: 4,
      meals: [
        { type: "SNACK" as const, recipeId: greekYogurtHoney.id },
        { type: "DINNER" as const, recipeId: mediterraneanQuinoaBowl.id },
      ],
    },
  ];

  for (const day of mealSchedule) {
    const date = new Date(today);
    date.setDate(date.getDate() + day.offset);

    const mealDay = await db.mealDay.create({
      data: {
        date,
        mealPlanId: mealPlan.id,
      },
    });

    for (const meal of day.meals) {
      await db.meal.create({
        data: {
          mealType: meal.type,
          mealDayId: mealDay.id,
          recipeId: meal.recipeId,
        },
      });
    }
  }

  console.log("Seeding complete!");
  console.log(`Created ${await db.recipe.count()} recipes`);
  console.log(`Created ${await db.ingredient.count()} ingredients`);
  console.log(`Created 1 meal plan with ${await db.mealDay.count()} days`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
