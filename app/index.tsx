import { useStore } from '@/store/useStore';
import React, { useEffect } from 'react';
import { useRouter } from "expo-router";

const HomeScreen: React.FC = () => {
  const jsonData = useStore((state) => state.jsonData);
  const currentUrl = useStore((state) => state.currentUrl);
  const setJsonDataForUrl = useStore((state) => state.setJsonDataForUrl);
  const router = useRouter();

  useEffect(() => {
    if (jsonData && currentUrl) {
      setJsonDataForUrl(currentUrl, jsonData);
      router.push({ pathname: "JsonViewer", params: { currentUrl } });
    }
  }, [currentUrl]);

  return null;
};

export default HomeScreen;
