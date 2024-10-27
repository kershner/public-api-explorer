import { create } from 'zustand';

interface State {
  loading: boolean;
  setLoading: (url: boolean) => void;
  currentUrl: string;
  setCurrentUrl: (url: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  error: string;
  setError: (value: string) => void;
  jsonData: unknown;
  setJsonData: (data: unknown) => void;
  firstEntryOpen: boolean;
  setFirstEntryOpen: (url: boolean) => void;
}

export const useStore = create<State>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading: loading }),
  currentUrl: '',
  setCurrentUrl: (url) => set({ currentUrl: url }),
  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),
  error: '',
  setError: (errorMsg) => set({ error: errorMsg }),
  jsonData: null,
  setJsonData: (jsonData) => set({ jsonData: jsonData }),
  firstEntryOpen: false,
  setFirstEntryOpen: (open) => set({ firstEntryOpen: open }),
}));
