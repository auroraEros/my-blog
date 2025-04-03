import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(initialState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      if (storedValue) setValue(JSON.parse(storedValue));
    }
  }, [key]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key]);

  return [value, setValue];
}
