import React, { useMemo, useState, useRef, useEffect, lazy, Suspense } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import JsonItemPopoverMenu from '@/components/PopoverMenu/JsonItemPopoverMenu';
import NestedJsonItems from '@/components/JsonViewer/NestedJsonItems';
import RenderValue from '@/components/JsonViewer/RenderValue';
import Tooltip from '@/components/JsonViewer/Tooltip';
import { useStore } from '@/store/useStore';
import { isEmpty } from '@/utils/utils';

// Lazy-load NestedJsonItems to avoid circular dependency
// const NestedJsonItems = lazy(() => import('@/components/JsonViewer/NestedJsonItems'));

interface JsonItemProps {
  label: string;
  value: string | number | boolean | object | null;
  level?: number;
  expandAll?: boolean;
}

const JsonItem: React.FC<JsonItemProps> = ({ label, value, level = 0, expandAll = false }) => {
  const [isOpen, setIsOpen] = useState(expandAll);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const colors = useStore((state) => state.colors);
  const buttonRef = useRef(null);
  const hasNestedData = typeof value === 'object' && value !== null;
  const hideEmptyRows = useStore((state) => state.hideEmptyRows);
  const noValue = isEmpty(value);

  useEffect(() => {
    setIsOpen(expandAll);
  }, [expandAll]);

  const styles = useMemo(
    () =>
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
          borderStyle: Platform.OS == 'ios' ? 'solid' : 'dotted',
          alignItems: 'center',
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
          ...(Platform.OS !== 'ios' && {
            cursor: hasNestedData ? undefined : 'pointer',
          }),
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
          fontWeight: 'bold',
        },
      }),
    [colors, hasNestedData]
  );

  const handleTextPress = (event) => {
    const { pageX, pageY } = event.nativeEvent;
    setTooltipPosition({ top: pageY - 40, left: pageX });
    setTooltipVisible(true);
  };

  if (hideEmptyRows && noValue) {
    return null;
  }

  return (
    <View
      style={[
        styles.itemContainer,
        !hasNestedData && level !== 0 && styles.nestedRowWrapper,
      ]}
    >
      <View style={styles.levelIndicator} />
      <TouchableOpacity
        onPress={() => hasNestedData && setIsOpen(!isOpen)}
        disabled={!hasNestedData}
        style={[styles.row, hasNestedData && styles.nestedRow]}
      >
        {!hasNestedData ? (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            onPress={handleTextPress}
            style={styles.key}
          >
            {label}:
          </Text>
        ) : (
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.key}>
            {isOpen ? '▼ ' : '▶ '}
            {label}:
          </Text>
        )}

        {/* Tooltip */}
        <Tooltip
          isVisible={tooltipVisible}
          position={tooltipPosition}
          onClose={() => setTooltipVisible(false)}
          label={label}
        />

        {/* Render value */}
        {!hasNestedData && (
          <View style={styles.valueContainer}>
            <RenderValue value={value} label={label} />
          </View>
        )}

        {/* Popover Menu */}
        {hasNestedData && (
          <TouchableOpacity
            ref={buttonRef}
            onPress={() => setIsPopoverVisible(true)}
            style={styles.menuButton}
          >
            <Text style={styles.rowOptionsIcon}>⋮</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {/* Nested Items */}
      {hasNestedData && isOpen && (
        <Suspense fallback={<Text>Loading...</Text>}>
          <NestedJsonItems data={value} level={level + 1} expandAll={expandAll} />
        </Suspense>
      )}

      {/* Popover Menu Component */}
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
