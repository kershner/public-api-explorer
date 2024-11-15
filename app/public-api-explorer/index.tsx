import PublicApiCards from '@/components/PublicApiCards/PublicApiCards';
import DebouncedTextInput from '@/components/DebouncedTextInput';
import { APP_TITLE } from '@/constants/constants';
import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useStore } from '@/store/useStore';
import { useRouter } from "expo-router";

const HomeScreen: React.FC = () => {
  const jsonData = useStore((state) => state.jsonData);
  const url = useStore((state) => state.url);
  const setJsonDataForUrl = useStore((state) => state.setJsonDataForUrl);
  const router = useRouter();

  useEffect(() => {
    if (jsonData && url) {
      setJsonDataForUrl(url, jsonData);
      router.push({ pathname: `${APP_TITLE}/view`, params: { url } });
    }
  }, [jsonData, url]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        bottomDrawer: {
          paddingHorizontal: 16
        }
    }), []
  );

  return (
    <>
      <DebouncedTextInput />
      <PublicApiCards />
    </>
  );
};

export default HomeScreen;
