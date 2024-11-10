import { useLocalSearchParams, useRouter } from "expo-router";
import JsonViewer from "@/components/JsonViewer/JsonViewer";
import { APP_TITLE } from "@/constants/constants";
import { useEffect, useState } from "react";
import { useStore } from '@/store/useStore';
import React from "react";

const JsonViewerScreen: React.FC = () => {
  const { url } = useLocalSearchParams<{ url?: string }>();
  const router = useRouter();
  const jsonData = useStore((state) => state.getJsonDataForUrl(url));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (isMounted && !jsonData && url) {
      useStore.setState({ inputValue: url });
      router.replace({ pathname: `${APP_TITLE}/`, params: { url } });
    }
  }, [isMounted, jsonData, url]);

  if (!jsonData) return null;

  return <JsonViewer jsonData={jsonData} url={url} />;
};

export default JsonViewerScreen;
