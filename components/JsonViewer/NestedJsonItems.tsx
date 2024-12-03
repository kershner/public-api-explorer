import { FlatList, StyleSheet, Platform  } from 'react-native';
import JsonItem from '@/components/JsonViewer/JsonItem';
import React, { useMemo } from 'react';

interface NestedItemsProps {
  data: object;
  level: number;
  expandAll: boolean;
}

const NestedJsonItems: React.FC<NestedItemsProps> = ({ data, level, expandAll }) => {
  const nestedData = Object.entries(data).map(([key, value]) => ({ key, value }));

  const styles = useMemo(() => 
    StyleSheet.create({
      nestedList: {
        paddingLeft: 8,
        width: '100%'
      },
    }), []
  );

  return (
    <FlatList
      data={nestedData}
      renderItem={({ item }) => (
        <JsonItem label={item.key} value={item.value} level={level} expandAll={expandAll} />
      )}
      keyExtractor={(item, index) => `${level}-${index}`}
      style={styles.nestedList}
      initialNumToRender={expandAll ? 15 : 25}
      maxToRenderPerBatch={expandAll ? 15 : 25}
      disableVirtualization={Platform.OS === 'web'}
      removeClippedSubviews={true}
    />
  );
};

export default NestedJsonItems;
