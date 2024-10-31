import { useLocalSearchParams } from "expo-router";
import JsonViewer from "@/components/JsonViewer/JsonViewer";
import React from "react";

const JsonViewerScreen: React.FC = () => {
  const { jsonData, currentUrl } = useLocalSearchParams();

  // Ensure each parameter is a string
  const jsonDataString = Array.isArray(jsonData) ? jsonData[0] : jsonData;
  const currentUrlString = Array.isArray(currentUrl) ? currentUrl[0] : currentUrl;
  const parsedJsonData = jsonDataString ? JSON.parse(jsonDataString) : null;

  return <JsonViewer jsonData={parsedJsonData} currentUrl={currentUrlString} />;
};

export default JsonViewerScreen;
