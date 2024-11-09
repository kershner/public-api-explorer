import { useMemo } from 'react';

const useCompareOrigins = (url1: string, url2: string): boolean => {
  const isValidUrl = (inputUrl: string) => {
    try {
      new URL(inputUrl);
      return true;
    } catch (_) {
      return false;
    }
  };

  return useMemo(() => {
    if (!isValidUrl(url1) || !isValidUrl(url2)) {
      return false; // Return false if either URL is invalid
    }

    return new URL(url1).origin === new URL(url2).origin;
  }, [url1, url2]);
};

export default useCompareOrigins;
