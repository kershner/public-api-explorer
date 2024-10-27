import { View, Text, TouchableOpacity, FlatList, Platform, StyleSheet } from 'react-native';
import React, { useMemo, useState } from 'react';
import RenderValue from '@/components/RenderValue';
import { useStore } from '@/store/useStore';

interface JsonItemProps {
  label: string;
  value: string | number | boolean | object | null;
  level?: number;
}

const JsonItem: React.FC<JsonItemProps> = ({ label, value, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(level === 0);
  const hasNestedData = typeof value === 'object' && value !== null;
  const colors = useStore((state) => state.colors);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        itemContainer: {
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
        levelIndicator: {
          borderLeftWidth: 1,
          borderColor: colors.border,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 4,
          width: '100%',
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          borderStyle: 'dotted',
        },
        key: {
          fontWeight: '600',
          fontSize: 16,
          textAlign: 'left',
          width: 150,
          color: colors.textPrimary,
        },
        nestedRow: {
          backgroundColor: colors.accent,
          borderRadius: 6,
          padding: 8,
          marginVertical: 4,
          borderBottomWidth: 0
        },
        keyInClickableRow: {
          width: '100%',
        },
        valueContainer: {
          marginLeft: 8,
          flexShrink: 1,
        },
        nested: {
          paddingLeft: 24,
          width: '100%',
        },
      }),
    [colors]
  );

  const renderNestedItems = () => {
    if (!hasNestedData || !isOpen) return null;
    
    const nestedData = Object.entries(value).map(([key, nestedValue]) => ({ key, value: nestedValue }));

    return Platform.select({
      web: (
        <View style={styles.nested}>
          {nestedData.map((item, index) => (
            <JsonItem key={`${level}-${index}`} label={item.key} value={item.value} level={level + 1} />
          ))}
        </View>
      ),
      default: (
        <FlatList
          data={nestedData}
          renderItem={({ item }) => <JsonItem label={item.key} value={item.value} level={level + 1} />}
          keyExtractor={(item, index) => `${level}-${index}`}
          style={styles.nested}
          initialNumToRender={10}
          removeClippedSubviews={false}
        />
      ),
    });
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.levelIndicator} />
      <TouchableOpacity
        onPress={() => hasNestedData && setIsOpen(!isOpen)}
        disabled={!hasNestedData}
        style={[styles.row, hasNestedData && styles.nestedRow]}>

        <Text style={[styles.key, hasNestedData && styles.keyInClickableRow]}>
          {hasNestedData ? (isOpen ? '▼ ' : '▶ ') : ''}{label}:
        </Text>
        {!hasNestedData && <View style={styles.valueContainer}>{RenderValue(value)}</View>}
      </TouchableOpacity>
      {renderNestedItems()}
    </View>
  );
};

export default JsonItem;
