import {
  ChefHat,
  Cookie,
  type LucideIcon,
  Sun,
  Sunrise,
  Sunset,
} from "lucide-react";

export const getMealIcon = (type: string): LucideIcon => {
  switch (type.toLowerCase()) {
    case "breakfast":
      return Sunrise;
    case "lunch":
      return Sun;
    case "dinner":
      return Sunset;
    case "snack":
      return Cookie;
    default:
      return ChefHat;
  }
};

export const getMealOrder = (type: string): number => {
  switch (type.toLowerCase()) {
    case "breakfast":
      return 1;
    case "lunch":
      return 2;
    case "snack":
      return 3;
    case "dinner":
      return 4;
    default:
      return 5;
  }
};
