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

  jsonDataMap: Record<string, unknown>;
  setJsonDataForUrl: (url: string, data: unknown) => void;
  getJsonDataForUrl: (url: string) => unknown;

  colors: ThemeColors;

  darkMode: boolean;
  toggleDarkMode: () => void;

  customTheme: boolean;
  toggleCustomTheme: () => void;

  customBackgroundColor: string;
  setCustomBackgroundColor: (color: string) => void;

  customAccentColor: string;
  setCustomAccentColor: (color: string) => void;

  customBorderColor: string;
  setCustomBorderColor: (color: string) => void;

  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
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

  jsonDataMap: {},
  setJsonDataForUrl: (url, data) =>
    set((state) => ({
      jsonDataMap: { ...state.jsonDataMap, [url]: data },
    })),
  getJsonDataForUrl: (url) => get().jsonDataMap[url],

  colors: darkModeColors,

  darkMode: true,
  toggleDarkMode: () => {
    set((state) => {
      const newDarkMode = !state.darkMode;
      const baseColors = newDarkMode ? darkModeColors : lightModeColors;
      const colors = state.customTheme
        ? {
            ...baseColors,
            background: state.customBackgroundColor,
            accent: state.customAccentColor,
            border: state.customBorderColor,
          }
        : baseColors;

      return { darkMode: newDarkMode, colors };
    });
  },

  customTheme: false,
  toggleCustomTheme: () => {
    set((state) => {
      const baseColors = state.darkMode ? darkModeColors : lightModeColors;
      const colors = !state.customTheme
        ? {
            ...baseColors,
            background: state.customBackgroundColor,
            accent: state.customAccentColor,
            border: state.customBorderColor,
          }
        : baseColors;

      return { customTheme: !state.customTheme, colors };
    });
  },

  customBackgroundColor: '#FF0000',
  setCustomBackgroundColor: (color) => {
    set((state) => {
      const colors = state.customTheme
        ? { ...state.colors, background: color }
        : state.colors;
      return { customBackgroundColor: color, colors };
    });
  },

  customAccentColor: '#FF0000',
  setCustomAccentColor: (color) => {
    set((state) => {
      const colors = state.customTheme
        ? { ...state.colors, accent: color }
        : state.colors;
      return { customAccentColor: color, colors };
    });
  },

  customBorderColor: '#FF0000',
  setCustomBorderColor: (color) => {
    set((state) => {
      const colors = state.customTheme
        ? { ...state.colors, border: color }
        : state.colors;
      return { customBorderColor: color, colors };
    });
  },

  modalOpen: false,
  setModalOpen: (open) => set({ modalOpen: open }),
}));
