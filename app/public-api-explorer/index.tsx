import ApiQueryInput from '@/components/JsonViewer/BottomDrawer/ApiQueryBuilder/ApiQueryInput';
import PublicApiCards from '@/components/PublicApiCards/PublicApiCards';
import useIsRootScreen from '@/hooks/useIsRootScreen';
import { View, Text, StyleSheet } from 'react-native';
import { APP_TITLE } from '@/constants/constants';
import React, { useEffect, useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { useRouter } from "expo-router";

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
        inputWrapper: {
          paddingHorizontal: 8
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
      <View style={styles.inputWrapper}>
        <Text style={styles.inputTitle}>Dive into some open data:</Text>
        <ApiQueryInput url='Enter a public API endpoint...' />
      </View>
      <PublicApiCards />
    </>
  );
};

export default HomeScreen;
