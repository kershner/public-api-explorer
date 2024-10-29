import JsonViewer from '@/components/JsonViewer';
import { useStore } from '@/store/useStore';
import React, { useEffect } from 'react';
import { useRouter } from "expo-router";

const HomeScreen: React.FC = () => {
  const jsonData = useStore((state) => state.jsonData);
  const currentUrl = useStore((state) => state.currentUrl);
  const router = useRouter();

  useEffect(() => {
    if (jsonData && currentUrl) {
      router.push({
        pathname: "JsonViewerScreen",
        params: { 
          jsonData: JSON.stringify(jsonData), 
          currentUrl
        },
      });
    }
  }, [currentUrl]);

  return <JsonViewer />;
};

export default HomeScreen;
