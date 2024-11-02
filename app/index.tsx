import { useStore } from '@/store/useStore';
import React, { useEffect } from 'react';
import { useRouter } from "expo-router";

const HomeScreen: React.FC = () => {
  const jsonData = useStore((state) => state.jsonData);
  const url = useStore((state) => state.url);
  const setJsonDataForUrl = useStore((state) => state.setJsonDataForUrl);
  const router = useRouter();

  useEffect(() => {
    if (jsonData && url) {
      setJsonDataForUrl(url, jsonData);
      router.push({ pathname: "view", params: { url } });
    }
  }, [jsonData, url]);

  return null;
};

export default HomeScreen;
