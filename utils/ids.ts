import { nanoid } from "https://deno.land/x/nanoid/mod.ts";

/**
 * Generates a random unique id (with low probability of collision).
 * @returns A random string with 10 characters.
 */
export function generateId(): string {
  // For now, I'm using the nanoid library but I'll probably replace it with my
  // own implementation in the future. This library is not updated from a long
  // time and I want to implement a id generation focused on my needs. 
  return nanoid(10);
}