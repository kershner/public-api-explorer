
import DebouncedTextInput from '@/components/DebouncedTextInput';
import useIsRootScreen from '@/hooks/useIsRootScreen';
import PublicApiCards from '@/components/PublicApiCards';
import { View, StyleSheet } from 'react-native';
import React from 'react';

const BottomDrawer: React.FC = () => {
  const isRoot = useIsRootScreen();
  const styles = getStyles(isRoot);

  return (
    <View style={styles.container}>
      <DebouncedTextInput />
      <PublicApiCards />
    </View>
  );
};

const getStyles = (isRoot: boolean) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      paddingTop: 10,
      ...(isRoot && { 
        flex: 4,
      }),
    },
  });


export default BottomDrawer;
