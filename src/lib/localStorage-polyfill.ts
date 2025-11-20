// localStorage polyfill for SSR
// This ensures localStorage is available during SSR to prevent errors
if (typeof window === 'undefined') {
  // Create a mock localStorage for server-side rendering
  const localStorageMock = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  };

  global.localStorage = localStorageMock;
}

export {};
