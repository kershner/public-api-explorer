import BottomDrawer from '@/components/BottomDrawer';
import JsonViewer from '@/components/JsonViewer';
import { SafeAreaView } from 'react-native';
import { styles } from '@/constants/styles';
import React from 'react';

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.globalContainer}>
      <JsonViewer />
      <BottomDrawer />
    </SafeAreaView>
  );
};

export default HomeScreen;
