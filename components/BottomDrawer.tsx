
import DebouncedTextInput from '@/components/DebouncedTextInput';
import PublicApiCards from '@/components/PublicApiCards';
import useIsRootScreen from '@/hooks/useIsRootScreen';
import { View, StyleSheet } from 'react-native';
import { useStore } from '@/store/useStore';
import React, { useMemo } from 'react';

const BottomDrawer: React.FC = () => {
  const isRoot = useIsRootScreen();
  const colors = useStore((state) => state.colors);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingHorizontal: 10,
          paddingTop: 10,
          ...(isRoot && { 
            flex: 4,
          }),
        },
      }),
    [colors, isRoot]
  );

  return (
    <View style={styles.container}>
      <DebouncedTextInput />
      <PublicApiCards />
    </View>
  );
};

export default BottomDrawer;
