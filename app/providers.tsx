// app/providers.tsx
'use client';

import { ThemeProvider } from 'next-themes';
import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export function Providers({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system"
      enableSystem={true}
      suppressHydrationWarning={true}
    >
      <AppContext.Provider value={{ isLoading, setIsLoading }}>
        {children}
      </AppContext.Provider>
    </ThemeProvider>
  );
}