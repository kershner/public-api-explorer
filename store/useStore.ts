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

  customBackgroundColor: string;
  setCustomBackgroundColor: (color: string) => void;
  customBackgroundColorOn: boolean;
  toggleCustomBackgroundColorOn: () => void;

  customAccentColor: string;
  setCustomAccentColor: (color: string) => void;
  customAccentColorOn: boolean;
  toggleCustomAccentColorOn: () => void;

  customBorderColor: string;
  setCustomBorderColor: (color: string) => void;
  customBorderColorOn: boolean;
  toggleCustomBorderColorOn: () => void;

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
      const colors = {
        ...baseColors,
        background: state.customBackgroundColorOn ? state.customBackgroundColor : baseColors.background,
        accent: state.customAccentColorOn ? state.customAccentColor : baseColors.accent,
        border: state.customBorderColorOn ? state.customBorderColor : baseColors.border,
      };
      return { darkMode: newDarkMode, colors };
    });
  },

  customBackgroundColor: '#FF0000',
  setCustomBackgroundColor: (color) => {
    set((state) => {
      if (state.customBackgroundColorOn) {
        return { customBackgroundColor: color, colors: { ...state.colors, background: color } };
      }
      return { customBackgroundColor: color };
    });
  },
  customBackgroundColorOn: false,
  toggleCustomBackgroundColorOn: () => {
    set((state) => {
      const colors = state.customBackgroundColorOn
        ? { ...state.colors, background: darkModeColors.background }
        : { ...state.colors, background: state.customBackgroundColor };
      return { customBackgroundColorOn: !state.customBackgroundColorOn, colors };
    });
  },

  customAccentColor: '#FF0000',
  setCustomAccentColor: (color) => {
    set((state) => {
      if (state.customAccentColorOn) {
        return { customAccentColor: color, colors: { ...state.colors, accent: color } };
      }
      return { customAccentColor: color };
    });
  },
  customAccentColorOn: false,
  toggleCustomAccentColorOn: () => {
    set((state) => {
      const colors = state.customAccentColorOn
        ? { ...state.colors, accent: darkModeColors.accent }
        : { ...state.colors, accent: state.customAccentColor };
      return { customAccentColorOn: !state.customAccentColorOn, colors };
    });
  },

  customBorderColor: '#FF0000',
  setCustomBorderColor: (color) => {
    set((state) => {
      if (state.customBorderColorOn) {
        return { customBorderColor: color, colors: { ...state.colors, border: color } };
      }
      return { customBorderColor: color };
    });
  },
  customBorderColorOn: false,
  toggleCustomBorderColorOn: () => {
    set((state) => {
      const colors = state.customBorderColorOn
        ? { ...state.colors, border: darkModeColors.border }
        : { ...state.colors, border: state.customBorderColor };
      return { customBorderColorOn: !state.customBorderColorOn, colors };
    });
  },

  modalOpen: false,
  setModalOpen: (open) => set({ modalOpen: open }),
}));
