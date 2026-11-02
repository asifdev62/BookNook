/**
 * Shared category helpers.
 *
 * Books store their category directly on the document, so the same category can
 * arrive with different casing or extra whitespace ("Science", "science",
 * " Science "). Everything that displays or saves categories should treat those
 * values as one category.
 */

export function normalizeCategory(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ");
}

export function categoryKey(value: unknown): string {
  return normalizeCategory(value).toLowerCase();
}

/**
 * Returns one display name per category, ignoring casing and extra whitespace.
 * A properly cased variant ("Science") wins over an all-lowercase one
 * ("science") so existing data keeps its nicest label.
 */
export function uniqueCategories(values: readonly unknown[]): string[] {
  const categories = new Map<string, string>();

  for (const value of values) {
    const name = normalizeCategory(value);

    if (!name) {
      continue;
    }

    const key = name.toLowerCase();
    const current = categories.get(key);

    if (
      !current ||
      (current === current.toLowerCase() && name !== name.toLowerCase())
    ) {
      categories.set(key, name);
    }
  }

  return [...categories.values()].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );
}

/**
 * Resolves typed input to an existing category when possible, otherwise
 * returns the trimmed input as a new category name.
 */
export function resolveCategorySelection(
  input: unknown,
  categories: readonly string[]
): string {
  const name = normalizeCategory(input);

  if (!name) {
    return "";
  }

  const key = name.toLowerCase();
  const existing = categories.find(
    (category) => normalizeCategory(category).toLowerCase() === key
  );

  return existing ? normalizeCategory(existing) : name;
}

export interface CategoryGroup<T> {
  key: string;
  category: string;
  books: T[];
}

/**
 * Groups books by normalized category. Each category is returned exactly once,
 * regardless of casing/whitespace differences in the stored documents.
 */
export function groupBooksByCategory<T extends { category?: string }>(
  books: readonly T[]
): CategoryGroup<T>[] {
  const groups = new Map<string, CategoryGroup<T>>();

  for (const book of books) {
    const category = normalizeCategory(book.category) || "Uncategorized";
    const key = category.toLowerCase();
    const group = groups.get(key);

    if (group) {
      group.books.push(book);
    } else {
      groups.set(key, { key, category, books: [book] });
    }
  }

  return [...groups.values()].sort((a, b) =>
    a.category.localeCompare(b.category, undefined, { sensitivity: "base" })
  );
}
