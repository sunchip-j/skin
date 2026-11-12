import rawArticles from "./articles.json";

export type SkinArticle = {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  takeaway: string;
  publishedAt: string;
  updatedAt: string;
  worksheet?: boolean;
  sections: {
    id: string;
    title: string;
    paragraphs: string[];
    sourceIds: string[];
    table?: { caption: string; columns: string[]; rows: string[][] };
  }[];
  checklist: string[];
  faq: { q: string; a: string }[];
  related: string[];
  sources: { id: string; title: string; url: string }[];
};

export const skinArticles = rawArticles as SkinArticle[];
export function getSkinArticle(slug: string) {
  return skinArticles.find(article => article.slug === slug);
}
