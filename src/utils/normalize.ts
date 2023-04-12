export function normalizeName(name: string): string {
  // Normalize name by removing extra spaces and non-word characters
  const normalized = name
    .normalize("NFC")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks (accents)
    .replace(/[^\w\s\d\-_.,;:(){}\[\]<>@#$%^&*+=!?|~`'"\u00A1-\uFFFF]/g, "") // Remove non-word characters except for special characters in most written languages
    .trim();

  return normalized;
}
