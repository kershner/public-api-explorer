import PublicApiCards from '@/components/PublicApiCards/PublicApiCards';
import { APP_TITLE } from '@/constants/constants';
import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useStore } from '@/store/useStore';
import { useRouter } from "expo-router";
import ApiQueryInput from '@/components/ApiQueryBuilder/ApiQueryInput';
import useIsRootScreen from '@/hooks/useIsRootScreen';

const HomeScreen: React.FC = () => {
  const jsonData = useStore((state) => state.jsonData);
  const url = useStore((state) => state.url);
  const setJsonDataForUrl = useStore((state) => state.setJsonDataForUrl);
  const router = useRouter();
  const colors = useStore((state) => state.colors);
  const isRoot = useIsRootScreen();

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
        },
        inputTitle: {
          textAlign: 'center',
          fontSize: 48,
          fontWeight: 'bold',
          marginVertical: 8,
          color: colors.textPrimary,
          ...(!isRoot && { display: 'none' }),
        },
    }), []
  );

  return (
    <>
      <Text style={styles.inputTitle}>Dive into some open data:</Text>
      <ApiQueryInput url='Enter a public API endpoint...' />
      <PublicApiCards />
    </>
  );
};

export default HomeScreen;
