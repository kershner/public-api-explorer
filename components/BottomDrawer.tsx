
import DebouncedTextInput from '@/components/DebouncedTextInput';
import ApiButtons from '@/components/ApiButtons';
import { View, StyleSheet } from 'react-native';
import React from 'react';

const BottomDrawer: React.FC = () => {
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      paddingTop: 10
    },
  });

  return (
    <View style={styles.container}>
      <DebouncedTextInput />
      <ApiButtons />
    </View>
  );
};


export default BottomDrawer;
