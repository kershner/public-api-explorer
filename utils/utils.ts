import { useStore } from '@/store/useStore';

export const isHtml = (value: string): boolean => typeof value === 'string' && /<\/?[a-z][\s\S]*>/i.test(value);
export const isUrl = (value: string): boolean => typeof value === 'string' && /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i.test(value);
export const isImageUrl = (value: string): boolean => typeof value === 'string' && /\.(jpeg|jpg|gif|png|svg)$/i.test(value);

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
    const response = await fetch(url, { method: 'GET' });
    
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
