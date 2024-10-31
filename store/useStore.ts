import { darkModeColors, lightModeColors } from '@/constants/constants';
import { create } from 'zustand';

export interface ThemeColors {
  background: string;
  accent: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  linkText: string;
  error: string;
}

interface State {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  currentUrl: string;
  setCurrentUrl: (url: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  error: string;
  setError: (value: string) => void;
  jsonData: unknown;
  setJsonData: (data: unknown) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  colors: ThemeColors;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  jsonDataMap: Record<string, unknown>;
  setJsonDataForUrl: (url: string, data: unknown) => void;
  getJsonDataForUrl: (url: string) => unknown;
}

export const useStore = create<State>((set, get) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
  currentUrl: '',
  setCurrentUrl: (url) => set({ currentUrl: url }),
  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),
  error: '',
  setError: (errorMsg) => set({ error: errorMsg }),
  jsonData: null,
  setJsonData: (jsonData) => set({ jsonData }),
  darkMode: true,
  toggleDarkMode: () => {
    set((state) => {
      const newDarkMode = !state.darkMode;
      return {
        darkMode: newDarkMode,
        colors: newDarkMode ? darkModeColors : lightModeColors
      };
    });
  },
  colors: darkModeColors,
  modalOpen: false,
  setModalOpen: (modalOpen) => set({ modalOpen }),
  
  jsonDataMap: {},
  setJsonDataForUrl: (url, data) =>
    set((state) => ({
      jsonDataMap: { ...state.jsonDataMap, [url]: data },
    })),
  getJsonDataForUrl: (url) => get().jsonDataMap[url],
}));
