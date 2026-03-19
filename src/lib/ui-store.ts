import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'en' | 'zh';
type Theme = 'light' | 'dark' | 'system';

interface UserPreferences {
  language: Language;
  theme: Theme;
  b2bMode: boolean;
}

interface UIState {
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  preferences: UserPreferences;
  setMobileMenuOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  setB2bMode: (mode: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isMobileMenuOpen: false,
      isCartOpen: false,
      isSearchOpen: false,
      preferences: {
        language: 'en',
        theme: 'light',
        b2bMode: false,
      },
      
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
      setCartOpen: (open) => set({ isCartOpen: open }),
      setSearchOpen: (open) => set({ isSearchOpen: open }),
      setLanguage: (language) =>
        set((state) => ({
          preferences: { ...state.preferences, language },
        })),
      setTheme: (theme) =>
        set((state) => ({
          preferences: { ...state.preferences, theme },
        })),
      setB2bMode: (mode) =>
        set((state) => ({
          preferences: { ...state.preferences, b2bMode: mode },
        })),
    }),
    {
      name: 'heater-ui-preferences',
    }
  )
);
