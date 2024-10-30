import { useStore } from '@/store/useStore';
import { downloadCsv } from '@/utils/downloadCsv'; // Automatically resolves to .web.ts or .native.ts based on platform

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

// CSV utility functions
type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonPrimitive[] | JsonRecord; // Supports nested and array structures
interface JsonRecord {
  [key: string]: JsonValue;
}

function flattenObject(
  obj: JsonRecord,
  parentKey = '',
  result: Record<string, JsonPrimitive> = {}
): Record<string, JsonPrimitive> {
  for (const key in obj) {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    const value = obj[key];

    if (Array.isArray(value)) {
      // Handle arrays by flattening each element with an index in the key
      value.forEach((element, index) => {
        if (typeof element === 'object' && element !== null) {
          flattenObject(element as JsonRecord, `${fullKey}.${index}`, result);
        } else {
          result[`${fullKey}.${index}`] = element;
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      // Recursively flatten nested objects
      flattenObject(value as JsonRecord, fullKey, result);
    } else {
      // Assign primitive values directly
      result[fullKey] = value;
    }
  }
  return result;
}

export function jsonToCsv<T extends JsonRecord | JsonRecord[]>(json: T): string {
  const jsonArray = Array.isArray(json) ? json : [json];
  if (jsonArray.length === 0) {
    throw new Error('JSON data must be a non-empty array or object.');
  }

  const flattenedArray = jsonArray.map(obj => flattenObject(obj));

  // Generate CSV headers from all keys across flattened objects
  const headers = Array.from(
    flattenedArray.reduce((headerSet, obj) => {
      Object.keys(obj).forEach(key => headerSet.add(key));
      return headerSet;
    }, new Set<string>())
  );

  // Build CSV rows
  const rows = flattenedArray.map(obj =>
    headers.map(header => (header in obj ? `"${obj[header]}"` : '""')).join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}



// Export downloadCsv for both web and native
export { downloadCsv };
