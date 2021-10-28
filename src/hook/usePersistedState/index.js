import { useEffect, useState } from 'react';

function usePersistedState(key = '', initialState = {}) {
  // exemplo de uso: const [theme, setTheme] = usePersistedState('key', initialValue = {});

  const [state, setState] = useState(() => {
    const storage = localStorage.getItem(key);

    if (storage) {
      return JSON.parse(storage);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;
