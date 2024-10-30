import { FlatList, StyleSheet } from 'react-native';
import JsonItem from '@/components/JsonItem';
import React, { useMemo } from 'react';

interface NestedItemsProps {
  data: object;
  level: number;
}

const NestedJsonItems: React.FC<NestedItemsProps> = ({ data, level }) => {
  const nestedData = Object.entries(data).map(([key, value]) => ({ key, value }));

  const styles = useMemo(
    () =>
      StyleSheet.create({
        nestedList: { 
          paddingLeft: 8,
          width: '100%' 
        },
      }),
    []
  );

  return (
    <FlatList
      data={nestedData}
      renderItem={({ item }) => <JsonItem label={item.key} value={item.value} level={level + 1} />}
      keyExtractor={(item, index) => `${level}-${index}`}
      style={styles.nestedList}
      initialNumToRender={10}
      removeClippedSubviews={false}
    />
  );
};

export default NestedJsonItems;
