import { useState, useCallback } from 'react';

// The navigation stack lives in memory for the duration of the session.
// Back/forward just moves the cursor — it does not add new entries.
// Navigating to a new address while behind the end of the stack drops
// everything after the cursor, which is how forward history gets lost.

interface NavState {
  stack: string[]; // the ordered list of addresses visited in this session
  cursor: number;  // which position in the stack we are currently looking at
}

export function useNavigation() {
  const [nav, setNav] = useState<NavState>({ stack: [], cursor: -1 });

  // go to a new address - called when user types in bar, clicks a link, or jumps from history
  const navigate = useCallback((address: string) => {
    setNav((prev) => {
      // drop anything forward of the current position, then append the new address
      const newStack = [...prev.stack.slice(0, prev.cursor + 1), address];
      return { stack: newStack, cursor: newStack.length - 1 };
    });
  }, []);

  const goBack = useCallback(() => {
    setNav((prev) => {
      if (prev.cursor <= 0) return prev;
      return { ...prev, cursor: prev.cursor - 1 };
    });
  }, []);

  const goForward = useCallback(() => {
    setNav((prev) => {
      if (prev.cursor >= prev.stack.length - 1) return prev;
      return { ...prev, cursor: prev.cursor + 1 };
    });
  }, []);

  const currentAddress = nav.cursor >= 0 ? nav.stack[nav.cursor] : null;
  const canGoBack = nav.cursor > 0;
  const canGoForward = nav.cursor < nav.stack.length - 1;

  return {
    stack: nav.stack,
    cursor: nav.cursor,
    currentAddress,
    canGoBack,
    canGoForward,
    navigate,
    goBack,
    goForward,
  };
}
