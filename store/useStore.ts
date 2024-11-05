import { darkModeColors, lightModeColors } from '@/constants/constants';
import { isHexString } from '@/utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const DEBUG_MODE = true;

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

// Default state
const defaultState: Omit<State, keyof Pick<State, 'setLoading' | 'setUrl' | 'setInputValue' | 'setError' | 'setJsonData' | 'setJsonDataForUrl' | 'getJsonDataForUrl' | 'toggleDarkMode' | 'setCustomBackgroundColor' | 'toggleCustomBackgroundColorOn' | 'setCustomAccentColor' | 'toggleCustomAccentColorOn' | 'setModalOpen' | 'loadPersistedState' | 'persistState'>> = {
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
  colors: darkModeColors,
};

// Utility function to clean strings and colors
const cleanString = (value: string | null): string => (value ? value.replace(/^"|"$/g, '') : '');
const cleanColor = (color: string | null): string => cleanString(color) || '#FFFFFF';

// Persist state to AsyncStorage
const persistData = async (state: Partial<State>) => {
  const entries: [string, string][] = Object.entries(state).map(([key, value]) => [
    key,
    JSON.stringify(value),
  ]);
  await AsyncStorage.multiSet(entries);
};


// Load state from AsyncStorage
const loadData = async (keys: string[]) => {
  const persistedData = await AsyncStorage.multiGet(keys);
  return persistedData.reduce((acc, [key, value]) => {
    if (value !== null) acc[key] = cleanString(value);
    return acc;
  }, {} as Record<string, string | null>);
};

export const useStore = create<State>((set, get) => ({
  ...defaultState,

  setLoading: (loading) => set({ loading }),
  setUrl: (url) => set({ url }),
  setInputValue: (value) => set({ inputValue: value }),
  setError: (error) => set({ error }),
  setJsonData: (data) => set({ jsonData: data }),
  setJsonDataForUrl: (url, data) => set((state) => ({ jsonDataMap: { ...state.jsonDataMap, [url]: data } })),
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
    persistData({ darkMode: get().darkMode });
  },

  setCustomBackgroundColor: (color) => {
    if (isHexString(color)) {
      set((state) => ({
        customBackgroundColor: color,
        colors: {
          ...state.colors,
          background: state.customBackgroundColorOn ? color : state.colors.background,
        },
      }));
      persistData({ customBackgroundColor: color });
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
    persistData({ customBackgroundColorOn: get().customBackgroundColorOn });
  },

  setCustomAccentColor: (color) => {
    if (isHexString(color)) {
      set((state) => ({
        customAccentColor: color,
        colors: {
          ...state.colors,
          accent: state.customAccentColorOn ? color : state.colors.accent,
        },
      }));
      persistData({ customAccentColor: color });
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
    persistData({ customAccentColorOn: get().customAccentColorOn });
  },

  setModalOpen: (open) => set({ modalOpen: open }),

  loadPersistedState: async () => {
    const keys = [
      'darkMode',
      'customBackgroundColor',
      'customBackgroundColorOn',
      'customAccentColor',
      'customAccentColorOn',
    ];

    const loadedState = await loadData(keys);
    const isDarkMode = loadedState.darkMode === 'true';
    const isCustomBackgroundOn = loadedState.customBackgroundColorOn === 'true';
    const isCustomAccentOn = loadedState.customAccentColorOn === 'true';
    const baseColors = isDarkMode ? darkModeColors : lightModeColors;

    set({
      darkMode: isDarkMode,
      customBackgroundColor: cleanColor(loadedState.customBackgroundColor),
      customBackgroundColorOn: isCustomBackgroundOn,
      customAccentColor: cleanColor(loadedState.customAccentColor),
      customAccentColorOn: isCustomAccentOn,
      colors: {
        ...baseColors,
        background: isCustomBackgroundOn ? loadedState.customBackgroundColor : baseColors.background,
        accent: isCustomAccentOn ? loadedState.customAccentColor : baseColors.accent,
      } as ThemeColors,
    });
  },

  persistState: async () => {
    const state = get();
    persistData({
      darkMode: state.darkMode,
      customBackgroundColor: state.customBackgroundColor,
      customBackgroundColorOn: state.customBackgroundColorOn,
      customAccentColor: state.customAccentColor,
      customAccentColorOn: state.customAccentColorOn,
    });
  },
}));

if (DEBUG_MODE) {
  useStore.subscribe((newState, previousState) => {
    const diff: Partial<Record<keyof State, { from: unknown; to: unknown }>> = {};
    (Object.keys(newState) as Array<keyof State>).forEach((key) => {
      if (newState[key] !== previousState[key]) {
        diff[key] = { from: previousState[key], to: newState[key] };
      }
    });
    console.log("State diff:", diff);
    console.log("Full state:", newState);
  });
}
