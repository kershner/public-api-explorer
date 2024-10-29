import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useStore } from '@/store/useStore';
import React, { useMemo } from 'react';

interface PopoverMenuProps {
  isVisible: boolean;
  fromRef: React.RefObject<View>;
  onClose: () => void;
  value: string | number | boolean | object | null;
}

const PopoverMenu: React.FC<PopoverMenuProps> = ({ isVisible, fromRef, onClose, value }) => {
  const colors = useStore((state) => state.colors);

  const handleLogData = () => {
    console.log(value);
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        popoverContent: {
          padding: 8,
          backgroundColor: colors.background,
          borderColor: colors.textPrimary,
          borderWidth: 2,
          borderRadius: 8,
          alignItems: 'flex-start',
          minWidth: 145
        },
        button: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.accent,
          paddingVertical: 10,
          paddingHorizontal: 12,
          marginVertical: 6,
          borderRadius: 20,
        },
        buttonText: {
          fontSize: 16,
          color: colors.textPrimary,
          marginLeft: 8,
          flexShrink: 1,
        },
      }),
    [colors]
  );

  return (
    <Popover
      isVisible={isVisible}
      from={fromRef}
      onRequestClose={onClose}
      placement={PopoverPlacement.BOTTOM}
      popoverStyle={{ backgroundColor: colors.textPrimary }}
    >
      <View style={styles.popoverContent}>
        <TouchableOpacity onPress={handleLogData} style={styles.button}>
          <Icon name="info" size={20} color={colors.textPrimary} />
          <Text style={styles.buttonText}>Log Data</Text>
        </TouchableOpacity>
        {/* Additional menu options */}
        <TouchableOpacity onPress={() => console.log('clicked settings')} style={styles.button}>
          <Icon name="settings" size={20} color={colors.textPrimary} />
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </Popover>
  );
};

export default PopoverMenu;
