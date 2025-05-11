import { useState, useEffect } from "react";


export function useLocalStorageState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return defaultValue;
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) return JSON.parse(storedValue);
    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
