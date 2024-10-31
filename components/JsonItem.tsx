import JsonItemPopoverMenu from '@/components/PopoverMenu/JsonItemPopoverMenu';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NestedJsonItems from '@/components/NestedJsonItems';
import React, { useMemo, useState, useRef } from 'react';
import RenderValue from '@/components/RenderValue';
import { useStore } from '@/store/useStore';

interface JsonItemProps {
  label: string;
  value: string | number | boolean | object | null;
  level?: number;
}

const JsonItem: React.FC<JsonItemProps> = ({ label, value, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(level === 0);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const colors = useStore((state) => state.colors);
  const hasNestedData = typeof value === 'object' && value !== null;
  const buttonRef = useRef(null);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        itemContainer: { 
          flexDirection: 'column', 
          alignItems: 'flex-start' 
        },
        levelIndicator: { 
          borderLeftWidth: 1, 
          borderColor: colors.border 
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 4,
          width: '100%',
          borderBottomWidth: hasNestedData ? 0 : 1,
          borderBottomColor: colors.border,
          borderStyle: 'dotted',
        },
        key: { 
          fontWeight: '600', 
          fontSize: 16, 
          textAlign: 'left', 
          width: 150, 
          color: colors.textPrimary 
        },
        nestedRow: { 
          backgroundColor: colors.accent, 
          borderRadius: 6, 
          padding: 8, 
          marginVertical: 4 
        },
        keyInClickableRow: { 
          width: '100%' 
        },
        valueContainer: { 
          marginLeft: 8, 
          flexShrink: 1 
        },
        menuButton: { 
          marginLeft: 
          'auto' 
        },
      }),
    [colors]
  );

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
        {!hasNestedData && (
          <View style={styles.valueContainer}>
            <RenderValue value={value} label={label} />
          </View>
        )}
        {hasNestedData && (
          <TouchableOpacity
            ref={buttonRef}
            onPress={() => setIsPopoverVisible(true)}
            style={styles.menuButton}
          >
            <Icon name="more-vert" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      
      {hasNestedData && isOpen && <NestedJsonItems data={value} level={level} />}

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
