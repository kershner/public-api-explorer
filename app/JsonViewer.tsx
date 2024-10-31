import { useLocalSearchParams } from "expo-router";
import JsonViewer from "@/components/JsonViewer/JsonViewer";
import { useStore } from '@/store/useStore';
import React from "react";

const JsonViewerScreen: React.FC = () => {
  const { currentUrl } = useLocalSearchParams();
  const jsonData = useStore((state) => state.getJsonDataForUrl(currentUrl));

  return <JsonViewer jsonData={jsonData} currentUrl={currentUrl} />;
};

export default JsonViewerScreen;
