import { darkModeColors, lightModeColors } from '@/constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  url: string;
  inputValue: string;
  error: string;
  jsonData: unknown;
  jsonDataMap: Record<string, unknown>;
  colors: ThemeColors;
  darkMode: boolean;
  customBackgroundColor: string;
  customBackgroundColorOn: boolean;
  customAccentColor: string;
  customAccentColorOn: boolean;
  modalOpen: boolean;

  setLoading: (loading: boolean) => void;
  setUrl: (url: string) => void;
  setInputValue: (value: string) => void;
  setError: (value: string) => void;
  setJsonData: (data: unknown) => void;
  setJsonDataForUrl: (url: string, data: unknown) => void;
  getJsonDataForUrl: (url: string) => unknown;
  toggleDarkMode: () => void;
  setCustomBackgroundColor: (color: string) => void;
  toggleCustomBackgroundColorOn: () => void;
  setCustomAccentColor: (color: string) => void;
  toggleCustomAccentColorOn: () => void;
  setModalOpen: (open: boolean) => void;
  loadPersistedState: () => Promise<void>;
  persistState: () => Promise<void>;
}

// Initialize default state
const defaultState: Omit<State, 'setLoading' | 'setUrl' | 'setInputValue' | 'setError' | 'setJsonData' | 'setJsonDataForUrl' | 'getJsonDataForUrl' | 'toggleDarkMode' | 'setCustomBackgroundColor' | 'toggleCustomBackgroundColorOn' | 'setCustomAccentColor' | 'toggleCustomAccentColorOn' | 'setModalOpen' | 'loadPersistedState' | 'persistState'> = {
  loading: false,
  url: '',
  inputValue: '',
  error: '',
  jsonData: null,
  jsonDataMap: {},
  darkMode: true,
  customBackgroundColor: '#FFFFFF',
  customBackgroundColorOn: false,
  customAccentColor: '#FFFFFF',
  customAccentColorOn: false,
  modalOpen: false,
  colors: darkModeColors, // Default to dark mode colors
};

// Utility function to clean color strings
const cleanColor = (color: string | null): string => {
  return typeof color === 'string' ? color.replace(/['"]+/g, '').trim() : '#FFFFFF';
};

// Utility function to persist a single key-value pair
const persistData = async (key: string, value: unknown) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

// Utility function to load data from AsyncStorage
const loadData = async (keys: string[]) => {
  const persistedData = await AsyncStorage.multiGet(keys);
  return persistedData.reduce((acc, [key, value]) => {
    if (value !== null) {
      acc[key] = value; // Keep the value as a string for now
    }
    return acc;
  }, {} as Record<string, string | null>);
};

export const useStore = create<State>((set, get) => ({
  ...defaultState,

  setLoading: (loading) => set({ loading }),

  setUrl: (url) => {
    set({ url });
    persistData('url', url);
  },

  setInputValue: (value) => {
    set({ inputValue: value });
    persistData('inputValue', value);
  },

  setError: (error) => {
    set({ error });
    persistData('error', error);
  },

  setJsonData: (data) => {
    set({ jsonData: data });
    persistData('jsonData', data);
  },

  setJsonDataForUrl: (url, data) => {
    set((state) => ({
      jsonDataMap: { ...state.jsonDataMap, [url]: data },
    }));
    persistData('jsonDataMap', get().jsonDataMap);
  },

  getJsonDataForUrl: (url) => get().jsonDataMap[url],

  toggleDarkMode: () => {
    set((state) => {
      const newDarkMode = !state.darkMode;
      const baseColors = newDarkMode ? darkModeColors : lightModeColors;
      return {
        darkMode: newDarkMode,
        colors: {
          ...baseColors,
          background: state.customBackgroundColorOn ? state.customBackgroundColor : baseColors.background,
          accent: state.customAccentColorOn ? state.customAccentColor : baseColors.accent,
        },
      };
    });
    persistData('darkMode', get().darkMode);
  },

  setCustomBackgroundColor: (color) => {
    if (/^#[0-9A-F]{6}$/i.test(color)) { // Validate hex format
      set((state) => ({
        customBackgroundColor: color,
        colors: {
          ...state.colors,
          background: state.customBackgroundColorOn ? color : state.colors.background,
        },
      }));
      persistData('customBackgroundColor', color);
    }
  },

  toggleCustomBackgroundColorOn: () => {
    set((state) => {
      const background = state.customBackgroundColorOn ? darkModeColors.background : state.customBackgroundColor;
      return {
        customBackgroundColorOn: !state.customBackgroundColorOn,
        colors: { ...state.colors, background },
      };
    });
    persistData('customBackgroundColorOn', get().customBackgroundColorOn);
  },

  setCustomAccentColor: (color) => {
    if (/^#[0-9A-F]{6}$/i.test(color)) { // Validate hex format
      set((state) => ({
        customAccentColor: color,
        colors: {
          ...state.colors,
          accent: state.customAccentColorOn ? color : state.colors.accent,
        },
      }));
      persistData('customAccentColor', color);
    }
  },

  toggleCustomAccentColorOn: () => {
    set((state) => {
      const accent = state.customAccentColorOn ? darkModeColors.accent : state.customAccentColor;
      return {
        customAccentColorOn: !state.customAccentColorOn,
        colors: { ...state.colors, accent },
      };
    });
    persistData('customAccentColorOn', get().customAccentColorOn);
  },

  setModalOpen: (open) => {
    set({ modalOpen: open });
    persistData('modalOpen', open);
  },

  loadPersistedState: async () => {
    const keys = [
      'url',
      'inputValue',
      'error',
      'jsonData',
      'jsonDataMap',
      'darkMode',
      'customBackgroundColor',
      'customBackgroundColorOn',
      'customAccentColor',
      'customAccentColorOn',
      'modalOpen',
    ];

    const loadedState = await loadData(keys);
    const isDarkMode = loadedState.darkMode === 'true';
    const isCustomBackgroundOn = loadedState.customBackgroundColorOn === 'true';
    const isCustomAccentOn = loadedState.customAccentColorOn === 'true';

    const baseColors = isDarkMode ? darkModeColors : lightModeColors;

    const finalBackgroundColor = isCustomBackgroundOn && loadedState.customBackgroundColor
      ? cleanColor(loadedState.customBackgroundColor)
      : baseColors.background;

    const finalAccentColor = isCustomAccentOn && loadedState.customAccentColor
      ? cleanColor(loadedState.customAccentColor)
      : baseColors.accent;

    set({
      url: loadedState.url || '',
      inputValue: loadedState.inputValue || '',
      error: loadedState.error || '',
      jsonData: loadedState.jsonData,
      jsonDataMap: loadedState.jsonDataMap ? JSON.parse(loadedState.jsonDataMap) : {},
      darkMode: isDarkMode,
      customBackgroundColor: cleanColor(loadedState.customBackgroundColor) || '#FFFFFF',
      customBackgroundColorOn: isCustomBackgroundOn,
      customAccentColor: cleanColor(loadedState.customAccentColor) || '#FFFFFF',
      customAccentColorOn: isCustomAccentOn,
      modalOpen: loadedState.modalOpen === 'true',
      colors: {
        ...baseColors,
        background: finalBackgroundColor,
        accent: finalAccentColor,
      } as ThemeColors,
    });
},


  persistState: async () => {
    const state = get();
    await AsyncStorage.multiSet([
      ['url', state.url],
      ['inputValue', state.inputValue],
      ['error', state.error],
      ['jsonData', JSON.stringify(state.jsonData)],
      ['jsonDataMap', JSON.stringify(state.jsonDataMap)],
      ['darkMode', JSON.stringify(state.darkMode)],
      ['customBackgroundColor', state.customBackgroundColor],
      ['customBackgroundColorOn', JSON.stringify(state.customBackgroundColorOn)],
      ['customAccentColor', state.customAccentColor],
      ['customAccentColorOn', JSON.stringify(state.customAccentColorOn)],
      ['modalOpen', JSON.stringify(state.modalOpen)],
    ]);
  },
}));
