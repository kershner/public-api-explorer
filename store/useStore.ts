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
  url: string;
  setUrl: (url: string) => void;
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

  url: '',
  setUrl: (url) => set({ url }),

  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),

  error: '',
  setError: (error) => set({ error }),

  jsonData: null,
  setJsonData: (data) => set({ jsonData: data }),

  darkMode: true,
  toggleDarkMode: () =>
    set((state) => ({
      darkMode: !state.darkMode,
      colors: state.darkMode ? lightModeColors : darkModeColors,
    })),

  colors: darkModeColors,

  modalOpen: false,
  setModalOpen: (open) => set({ modalOpen: open }),

  jsonDataMap: {},
  setJsonDataForUrl: (url, data) =>
    set((state) => ({
      jsonDataMap: { ...state.jsonDataMap, [url]: data },
    })),
  getJsonDataForUrl: (url) => get().jsonDataMap[url],
}));
