import { useLocalSearchParams } from "expo-router";
import JsonViewer from "@/components/JsonViewer/JsonViewer";
import { useStore } from '@/store/useStore';
import React from "react";

const JsonViewerScreen: React.FC = () => {
  const { url } = useLocalSearchParams();
  const jsonData = useStore((state) => state.getJsonDataForUrl(url));

  return <JsonViewer jsonData={jsonData} url={url} />;
};

export default JsonViewerScreen;
