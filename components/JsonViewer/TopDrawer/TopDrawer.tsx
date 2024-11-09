import FilterControls from '@/components/JsonViewer/TopDrawer/FilterControls';
import ChosenApiInfo from '@/components/JsonViewer/TopDrawer/ChosenApiInfo';
import { View, StyleSheet } from 'react-native';
import React from 'react';

interface TopDrawerProps {
  jsonData: unknown;
  onFilterUpdate: (filteredData: unknown) => void;
  colors: {
    textPrimary: string;
    background: string;
  };
}

const TopDrawer: React.FC<TopDrawerProps> = ({ jsonData, onFilterUpdate, colors }) => {
  const styles = StyleSheet.create({
    drawerContainer: { paddingBottom: 16 },
    header: { marginBottom: 16 },
    headerText: { fontSize: 18, fontWeight: 'bold', color: colors.textPrimary },
  });

  return (
    <View style={styles.drawerContainer}>
      <ChosenApiInfo />

      <FilterControls
        jsonData={jsonData}
        onFilterUpdate={onFilterUpdate}
        colors={colors}
      />
    </View>
  );
};

export default TopDrawer;
