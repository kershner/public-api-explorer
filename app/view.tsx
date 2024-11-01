import { useLocalSearchParams, useRouter } from "expo-router";
import JsonViewer from "@/components/JsonViewer/JsonViewer";
import { useEffect, useState } from "react";
import { useStore } from '@/store/useStore';
import React from "react";

const JsonViewerScreen: React.FC = () => {
  const { url } = useLocalSearchParams<{ url?: string }>();
  const jsonData = useStore((state) => state.getJsonDataForUrl(url));
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (isMounted && !jsonData && url) {
      useStore.setState({ inputValue: url, url });
      router.replace({ pathname: "/", params: { url } });
    }
  }, [isMounted, jsonData, url]);

  if (!jsonData) return null;

  return <JsonViewer jsonData={jsonData} url={url} />;
};

export default JsonViewerScreen;
