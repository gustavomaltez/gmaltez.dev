/**
 * Checks if the given values are valid strings.
 * - A value is considered valid if it is a string and it is not empty.
 * 
 * @example
 * isValidStringArray(['a', 'b', 'c']); // true
 * isValidStringArray(['a', '', 'c']); // false
 * isValidStringArray(['a', {}, 'c']); // false
 * isValidStringArray(['a', 1, 'c']); // false
 * isValidStringArray(['a', null, 'c']); // false
 * isValidStringArray(['a', undefined, 'c']); // false
 * 
 * @param values An array of values to be checked.
 * @returns Whether the given values are valid strings.
 */
export function isStringArray(values: unknown[],): values is string[] {
  return values.every(value => typeof value === 'string' && value.trim().length > 0);
}

/**
 * Checks if the given value is a valid date.
 * - A value is considered valid if it is a date and it is not invalid.
 * 
 * @param date A value to be checked.
 * @returns Whether the given value is a valid date.
 */
export function isDate(date: unknown): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}