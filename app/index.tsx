import { SafeAreaView, StyleSheet } from 'react-native';
import BottomDrawer from '@/components/BottomDrawer';
import TopDrawer from '@/components/TopDrawer';
import JsonViewer from '@/components/JsonViewer';
import { useStore } from '@/store/useStore';
import React, { useMemo } from 'react';

const HomeScreen: React.FC = () => {
  const colors = useStore((state) => state.colors);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        globalContainer: {
          flex: 1,
          padding: 16,
          backgroundColor: colors.background,
        },
      }),
    [colors]
  );

  return (
    <SafeAreaView style={styles.globalContainer}>
      <TopDrawer />
      <JsonViewer />
      <BottomDrawer />
    </SafeAreaView>
  );
};

export default HomeScreen;
