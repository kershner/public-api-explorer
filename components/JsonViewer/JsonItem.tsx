import JsonItemPopoverMenu from '@/components/PopoverMenu/JsonItemPopoverMenu';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NestedJsonItems from '@/components/JsonViewer/NestedJsonItems';
import React, { useMemo, useState, useRef, useEffect } from 'react';
import RenderValue from '@/components/JsonViewer/RenderValue';
import Tooltip from '@/components/JsonViewer/Tooltip';
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
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

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
      nestedRowWrapper: {
        borderLeftWidth: 3,
        borderLeftColor: colors.accent,
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
        cursor: hasNestedData ? undefined : 'pointer'
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

  const handleTextPress = (event) => {
    const { pageX, pageY } = event.nativeEvent;
    setTooltipPosition({ top: pageY - 40, left: pageX });
    setTooltipVisible(true);
  };

  return (
    <View style={[
      styles.itemContainer, 
      !hasNestedData && level !== 0 && styles.nestedRowWrapper
    ]}>
      <View style={styles.levelIndicator} />
      <TouchableOpacity
        onPress={() => hasNestedData && setIsOpen(!isOpen)}
        disabled={!hasNestedData}
        style={[styles.row, hasNestedData && styles.nestedRow]}
      >
        {!hasNestedData ? (
          <Text numberOfLines={1} ellipsizeMode="tail" onPress={handleTextPress} style={styles.key}>
            {label}:
          </Text>
        ) : (
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.key}>
            {isOpen ? '▼ ' : '▶ '}{label}:
          </Text>
        )}

        <Tooltip isVisible={tooltipVisible} position={tooltipPosition} onClose={() => setTooltipVisible(false)} label={label} />
          
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
