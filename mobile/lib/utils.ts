// utils.ts

/**
 * Formats a date as: Month Day, Year
 * Example: January 18, 2025
 */
export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Formats a date + time as: Mon Day, Year, HH:MM
 * Example: Jan 18, 2025, 03:45 PM
 */
export function formatDateTime(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

/**
 * Combines multiple style objects into one
 * Works like a replacement for clsx + twMerge for React Native
 */
export function mergeStyles(...styles: any[]) {
  return Object.assign({}, ...styles);
}
