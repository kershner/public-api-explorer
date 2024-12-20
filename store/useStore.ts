import { darkModeColors, lightModeColors } from '@/constants/constants';
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
  initialLoad: boolean;
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
  backgroundAnimation: boolean;
  modalOpen: boolean;
  currentApiExpanded: boolean,
  hideEmptyRows: boolean,
  expandAll: boolean,
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
  setBackgroundAnimation: (backgroundAnimation: boolean) => void;
  setModalOpen: (open: boolean) => void;
  setCurrentApiExpanded: (open: boolean) => void;
  toggleHideEmptyRows: () => void;
  toggleExpandAll: () => void;
  loadPersistedState: () => Promise<void>;
  persistState: () => Promise<void>;
}

export const defaultState: Omit<State, keyof Pick<State, 'setLoading' | 'setUrl' | 'setInputValue' | 'setError' | 'setJsonData' | 'setJsonDataForUrl' | 'getJsonDataForUrl' | 'toggleDarkMode' | 'setCustomBackgroundColor' | 'toggleCustomBackgroundColorOn' | 'setCustomAccentColor' | 'toggleCustomAccentColorOn' | 'setModalOpen' | 'loadPersistedState' | 'persistState' | 'setBackgroundAnimation' | 'setCurrentApiExpanded' | 'toggleHideEmptyRows' | 'toggleExpandAll' >> = {
  initialLoad: true,
  loading: false,
  url: '',
  inputValue: '',
  error: '',
  jsonData: null,
  jsonDataMap: {},
  darkMode: true,
  customBackgroundColor: '#FF0000',
  customBackgroundColorOn: false,
  customAccentColor: '#0000FF',
  customAccentColorOn: false,
  backgroundAnimation: true,
  modalOpen: false,
  currentApiExpanded: true,
  hideEmptyRows: true,
  colors: darkModeColors,
  expandAll: false
};

const isHexString = (color: string): boolean => /^#[0-9A-F]{6}$/i.test(color);
const cleanColor = (color: string | null): string => (color && isHexString(color) ? color : '#FFFFFF');

const getColors = (darkMode: boolean, customBackgroundColor: string, customBackgroundColorOn: boolean, customAccentColor: string, customAccentColorOn: boolean): ThemeColors => {
  const baseColors = darkMode ? darkModeColors : lightModeColors;
  return {
    ...baseColors,
    background: customBackgroundColorOn ? cleanColor(customBackgroundColor) : baseColors.background,
    accent: customAccentColorOn ? cleanColor(customAccentColor) : baseColors.accent,
  };
};

const persistData = async (state: Partial<State>) => {
  const entries = Object.entries(state).map(([key, value]) => [key, JSON.stringify(value)]);
  await AsyncStorage.multiSet(entries);
};

const loadData = async (keys: string[]) => {
  const persistedData = await AsyncStorage.multiGet(keys);
  return persistedData.reduce((acc, [key, value]) => {
    if (value !== null) {
      acc[key] = value.replace(/^"|"$/g, ''); // Clean up stored string values
    } else if (key in defaultState) {
      // Convert the default value to a string if it's not null
      const defaultValue = defaultState[key as keyof typeof defaultState];
      acc[key] = defaultValue !== null ? String(defaultValue) : null;
    }
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
      const colors = getColors(newDarkMode, state.customBackgroundColor, state.customBackgroundColorOn, state.customAccentColor, state.customAccentColorOn);
      persistData({ darkMode: newDarkMode });
      return { darkMode: newDarkMode, colors };
    });
  },

  setCustomBackgroundColor: (color) => {
    if (isHexString(color)) {
      set((state) => {
        const colors = getColors(state.darkMode, color, state.customBackgroundColorOn, state.customAccentColor, state.customAccentColorOn);
        persistData({ customBackgroundColor: color });
        return { customBackgroundColor: color, colors };
      });
    }
  },

  toggleCustomBackgroundColorOn: () => {
    set((state) => {
      const newCustomBackgroundColorOn = !state.customBackgroundColorOn;
      const colors = getColors(state.darkMode, state.customBackgroundColor, newCustomBackgroundColorOn, state.customAccentColor, state.customAccentColorOn);
      persistData({ customBackgroundColorOn: newCustomBackgroundColorOn });
      return { customBackgroundColorOn: newCustomBackgroundColorOn, colors };
    });
  },

  setCustomAccentColor: (color) => {
    if (isHexString(color)) {
      set((state) => {
        const colors = getColors(state.darkMode, state.customBackgroundColor, state.customBackgroundColorOn, color, state.customAccentColorOn);
        persistData({ customAccentColor: color });
        return { customAccentColor: color, colors };
      });
    }
  },

  toggleCustomAccentColorOn: () => {
    set((state) => {
      const newCustomAccentColorOn = !state.customAccentColorOn;
      const colors = getColors(state.darkMode, state.customBackgroundColor, state.customBackgroundColorOn, state.customAccentColor, newCustomAccentColorOn);
      persistData({ customAccentColorOn: newCustomAccentColorOn });
      return { customAccentColorOn: newCustomAccentColorOn, colors };
    });
  },

  setBackgroundAnimation: (backgroundAnimation) => {
    set((state) => {
      persistData({ backgroundAnimation });
      return { backgroundAnimation };
    });
  },

  setModalOpen: (open) => set({ modalOpen: open }),
  
  setCurrentApiExpanded: (open) => set({ currentApiExpanded: open }),

  toggleHideEmptyRows: () => {
    set((state) => {
      const hideEmptyRows = !state.hideEmptyRows;
      persistData({ hideEmptyRows: hideEmptyRows });
      return { hideEmptyRows };
    });
  },

  toggleExpandAll: () => {
    set((state) => {
      const expandAll = !state.expandAll;
      persistData({ expandAll: expandAll });
      return { expandAll };
    });
  },

  loadPersistedState: async () => {
    const keys = [
      'darkMode',
      'customBackgroundColor',
      'customBackgroundColorOn',
      'customAccentColor',
      'customAccentColorOn',
      'backgroundAnimation',
      'hideEmptyRows',
      'expandAll'
    ];

    const loadedState = await loadData(keys);
    const isDarkMode = loadedState.darkMode === 'true';
    const isCustomBackgroundOn = loadedState.customBackgroundColorOn === 'true';
    const isCustomAccentOn = loadedState.customAccentColorOn === 'true';
    const backgroundAnimation = loadedState.backgroundAnimation === 'true';
    const hideEmptyRows = loadedState.hideEmptyRows === 'true';
    const expandAll = loadedState.expandAll === 'true';
    
    set((state) => ({
      darkMode: isDarkMode,
      customBackgroundColor: cleanColor(loadedState.customBackgroundColor),
      customBackgroundColorOn: isCustomBackgroundOn,
      customAccentColor: cleanColor(loadedState.customAccentColor),
      customAccentColorOn: isCustomAccentOn,
      hideEmptyRows: hideEmptyRows,
      expandAll: expandAll,
      backgroundAnimation: backgroundAnimation,
      colors: getColors(
        isDarkMode,
        cleanColor(loadedState.customBackgroundColor),
        isCustomBackgroundOn,
        cleanColor(loadedState.customAccentColor),
        isCustomAccentOn
      ),
      initialLoad: false,
    }));
  },

  persistState: async () => {
    const state = get();
    persistData({
      darkMode: state.darkMode,
      customBackgroundColor: state.customBackgroundColor,
      customBackgroundColorOn: state.customBackgroundColorOn,
      customAccentColor: state.customAccentColor,
      customAccentColorOn: state.customAccentColorOn,
      backgroundAnimation: state.backgroundAnimation,
      hideEmptyRows: state.hideEmptyRows,
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
    console.log("State updated:", diff);
    // console.log("Full state:", newState);
  });
}
