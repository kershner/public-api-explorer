import JsonItemPopoverMenu from '@/components/PopoverMenu/JsonItemPopoverMenu';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NestedJsonItems from '@/components/JsonViewer/NestedJsonItems';
import React, { useMemo, useState, useRef, useEffect } from 'react';
import RenderValue from '@/components/JsonViewer/RenderValue';
import { useStore } from '@/store/useStore';

interface JsonItemProps {
  label: string;
  value: string | number | boolean | object | null;
  level?: number;
  expandAll?: boolean;
}

const JsonItem: React.FC<JsonItemProps> = ({ label, value, level = 0, expandAll = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const colors = useStore((state) => state.colors);
  const hasNestedData = typeof value === 'object' && value !== null;
  const buttonRef = useRef(null);

  useEffect(() => {
    setIsOpen(expandAll);
  }, [expandAll]);

  const styles = useMemo(() => 
    StyleSheet.create({
      itemContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: colors.background,
      },
      levelIndicator: {
        borderLeftWidth: 1,
        borderColor: colors.textPrimary,
      },
      row: {
        flexDirection: 'row',
        padding: 4,
        width: '100%',
        backgroundColor: colors.background,
        borderBottomWidth: hasNestedData ? 0 : 1,
        borderBottomColor: colors.accent,
        borderStyle: 'dotted',
        alignItems: 'center'
      },
      nestedRow: {
        backgroundColor: colors.accent,
        borderRadius: 6,
        paddingHorizontal: 8,
        marginTop: 4,
      },
      key: {
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'left',
        width: hasNestedData ? '100%' : 135,
        color: colors.textPrimary,
      },
      valueContainer: {
        marginLeft: 8,
        flexShrink: 1,
      },
      menuButton: {
        marginLeft: 'auto',
      },
      rowOptionsIcon: { 
        fontSize: 20, 
        color: colors.textPrimary, 
        fontWeight: 'bold' 
      },
    }), [colors]
  );

  return (
    <View style={styles.itemContainer}>
      <View style={styles.levelIndicator} />
      <TouchableOpacity
        onPress={() => hasNestedData && setIsOpen(!isOpen)}
        disabled={!hasNestedData}
        style={[styles.row, hasNestedData && styles.nestedRow]}
      >
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.key}>
          {hasNestedData ? (isOpen ? '▼ ' : '▶ ') : ''}{label}:
        </Text>
        {!hasNestedData && (
          <View style={styles.valueContainer}>
            <RenderValue value={value} label={label} />
          </View>
        )}
        {hasNestedData && (
          <TouchableOpacity ref={buttonRef} onPress={() => setIsPopoverVisible(true)} style={styles.menuButton}>
            <Text style={styles.rowOptionsIcon}>⋮</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {hasNestedData && isOpen && <NestedJsonItems data={value} level={level + 1} expandAll={expandAll} />}
      <JsonItemPopoverMenu
        isVisible={isPopoverVisible}
        fromRef={buttonRef}
        onClose={() => setIsPopoverVisible(false)}
        value={value}
        label={label}
      />
    </View>
  );
};

export default JsonItem;
