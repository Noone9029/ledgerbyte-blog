import { financeArticlesA } from "./finance-a.mjs";
import { financeArticlesB } from "./finance-b.mjs";
import { financeArticlesC } from "./finance-c.mjs";
import { technologyArticlesA } from "./technology-a.mjs";
import { technologyArticlesB } from "./technology-b.mjs";

export const launchArticles = [
  ...financeArticlesA,
  ...financeArticlesB,
  ...financeArticlesC,
  ...technologyArticlesA,
  ...technologyArticlesB,
];
