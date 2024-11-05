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
      const updatedColors = {
        ...baseColors,
        background: state.customBackgroundColorOn ? state.customBackgroundColor : baseColors.background,
        accent: state.customAccentColorOn ? state.customAccentColor : baseColors.accent,
      };
      return { darkMode: newDarkMode, colors: updatedColors };
    });
  },

  customBackgroundColor: '#FFFFFF',
  setCustomBackgroundColor: (color) => {
    set((state) => {
      const updatedColors = {
        ...state.colors,
        background: state.customBackgroundColorOn ? color : state.colors.background,
      };
      return { customBackgroundColor: color, colors: updatedColors };
    });
  },
  customBackgroundColorOn: false,
  toggleCustomBackgroundColorOn: () => {
    set((state) => {
      const baseColors = state.darkMode ? darkModeColors : lightModeColors;
      const updatedColors = {
        ...state.colors,
        background: state.customBackgroundColorOn ? baseColors.background : state.customBackgroundColor,
      };
      return { customBackgroundColorOn: !state.customBackgroundColorOn, colors: updatedColors };
    });
  },

  customAccentColor: '#FFFFFF',
  setCustomAccentColor: (color) => {
    set((state) => {
      const updatedColors = {
        ...state.colors,
        accent: state.customAccentColorOn ? color : state.colors.accent,
      };
      return { customAccentColor: color, colors: updatedColors };
    });
  },
  customAccentColorOn: false,
  toggleCustomAccentColorOn: () => {
    set((state) => {
      const baseColors = state.darkMode ? darkModeColors : lightModeColors;
      const updatedColors = {
        ...state.colors,
        accent: state.customAccentColorOn ? baseColors.accent : state.customAccentColor,
      };
      return { customAccentColorOn: !state.customAccentColorOn, colors: updatedColors };
    });
  },

  modalOpen: false,
  setModalOpen: (open) => set({ modalOpen: open }),
}));
