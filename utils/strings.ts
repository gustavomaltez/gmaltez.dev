/**
 * Sorts the given entries alphabetically.
 * @param entries An array of strings to sort.
 * @returns The sorted array.
 */
export function sortAlphabetically(entries: string[]) {
  return entries.sort((a, b) => a.localeCompare(b));
}