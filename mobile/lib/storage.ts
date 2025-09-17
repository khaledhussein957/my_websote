// utils/storage.ts
export const storage = {
  getItem: <T = string>(key: string, fallback: T | null = null): T | null => {
    if (typeof window === "undefined") return fallback;
    try {
      const value = localStorage.getItem(key);
      console.log(`Getting ${key} from localStorage:`, value);
      if (!value) return fallback;
      
      // Try to parse as JSON, fallback to string if it fails
      try {
        const parsed = JSON.parse(value) as T;
        console.log(`Parsed ${key} as JSON:`, parsed);
        return parsed;
      } catch {
        console.log(`Using ${key} as string:`, value);
        return value as T;
      }
    } catch (error) {
      console.error("Error getting item from localStorage:", error);
      return fallback;
    }
  },

  setItem: (key: string, value: unknown): void => {
    if (typeof window === "undefined") return;
    try {
      console.log(`Setting ${key} to localStorage:`, value);
      localStorage.setItem(key, JSON.stringify(value));
      console.log(`Successfully stored ${key} in localStorage`);
      window.dispatchEvent(
        new StorageEvent("storage", { key, newValue: JSON.stringify(value) })
      ); // 🔥 trigger update for hook
    } catch (error) {
      console.error("Error setting item in localStorage:", error);
    }
  },

  removeItem: (key: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
      window.dispatchEvent(
        new StorageEvent("storage", { key, newValue: null })
      );
    } catch (error) {
      console.error("Error removing item from localStorage:", error);
    }
  },

  clear: (): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.clear();
      window.dispatchEvent(new StorageEvent("storage"));
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};
