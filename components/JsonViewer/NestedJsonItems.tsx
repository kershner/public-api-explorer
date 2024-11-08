import JsonItem from '@/components/JsonViewer/JsonItem';
import { FlatList, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';

interface NestedItemsProps {
  data: object;
  level: number;
}

const NestedJsonItems: React.FC<NestedItemsProps> = ({ data, level }) => {
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
        <JsonItem label={item.key} value={item.value} level={level} expandAll={false} />
      )}
      keyExtractor={(item, index) => `${level}-${index}`}
      style={styles.nestedList}
      initialNumToRender={50}
      maxToRenderPerBatch={50}
      disableVirtualization={true}
      removeClippedSubviews={true}
    />
  );
};

export default NestedJsonItems;
