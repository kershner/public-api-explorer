
import DebouncedTextInput from '@/components/DebouncedTextInput';
import SettingsMenu from '@/components/SettingsMenu';
import ApiButtons from '@/components/ApiButtons';
import { View, StyleSheet } from 'react-native';
import React from 'react';

const BottomDrawer: React.FC = () => {
  return (
    <View style={bottomDrawerStyles.container}>
      <SettingsMenu />
      <DebouncedTextInput />
      <ApiButtons />
    </View>
  );
};

const bottomDrawerStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
});

export default BottomDrawer;
