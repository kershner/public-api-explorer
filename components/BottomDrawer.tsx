
import DebouncedTextInput from '@/components/DebouncedTextInput';
import { useNavigationState } from '@react-navigation/native';
import ApiButtons from '@/components/ApiButtons';
import { View, StyleSheet } from 'react-native';
import React from 'react';

const BottomDrawer: React.FC = () => {
  const isRoot = useNavigationState((state) => state.index === 0);
  const styles = getStyles(isRoot);

  return (
    <View style={styles.container}>
      <DebouncedTextInput />
      <ApiButtons />
    </View>
  );
};

const getStyles = (isRoot: boolean) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      paddingTop: 10,
      ...(isRoot && { flex: 1 }),
    },
  });


export default BottomDrawer;
