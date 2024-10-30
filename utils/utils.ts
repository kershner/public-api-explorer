import { useStore } from '@/store/useStore';

// General utility functions
export const isHtml = (value: string): boolean =>
  typeof value === 'string' && /<\/?[a-z][\s\S]*>/i.test(value);

export const isUrl = (value: string): boolean =>
  typeof value === 'string' && /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i.test(value);

export const isImageUrl = (value: string): boolean =>
  typeof value === 'string' && /\.(jpeg|jpg|gif|png|svg)$/i.test(value);

export const shuffleArray = <T>(array: T[]): T[] => array.sort(() => Math.random() - 0.5);

export const setError = (errorMsg: string) => {
  const { setError, setLoading } = useStore.getState();
  setError(errorMsg);
  setLoading(false);
};

export async function checkUrl(url: string) {
  const { setJsonData, setLoading } = useStore.getState();
  const defaultMsg = 'Network issue or invalid URL.';

  try {
    setLoading(true);
    const response = await fetchWithTimeout(url, { method: 'GET' });
    
    if (response.ok) {
      const data = await response.json();
      setError('');
      setJsonData(data);
      return true; 
    } else {
      setError(`${defaultMsg} Status code: ${response.status}`);
      return false;
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : defaultMsg;
    setError(msg);
    return false;
  }
}

// Debounce function
export function debounce<Func extends (...args: Parameters<Func>) => ReturnType<Func>>(
  func: Func,
  delay: number
): (...args: Parameters<Func>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<Func>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeout: number = 5000
): Promise<Response> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return response;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`Fetch request timed out after ${timeout}ms`);
    }
    throw error;
  }
};

export { downloadJson } from '@/utils/downloads/downloadJson';

export { copyToClipboard } from '@/utils/clipboard/copyToClipboard';