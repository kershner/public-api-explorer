import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, Dimensions } from 'react-native';
import React, { useMemo, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useStore } from '@/store/useStore';

interface PopoverMenuProps {
  isVisible: boolean;
  fromRef: React.RefObject<View>;
  onClose: () => void;
  value: string | number | boolean | object | null;
}

const PopoverMenu: React.FC<PopoverMenuProps> = ({ isVisible, fromRef, onClose, value }) => {
  const colors = useStore((state) => state.colors);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    // Measure position of fromRef element if popover is visible
    if (isVisible && fromRef.current) {
      fromRef.current.measure((x, y, width, height, pageX, pageY) => {
        const popoverWidth = 200;
        // Adjust left position to keep popover within screen bounds
        const adjustedLeft = pageX + width / 2 + popoverWidth > screenWidth 
          ? screenWidth - popoverWidth
          : pageX + width / 2;
  
        // Set popover position based on measurement
        setPosition({ top: pageY + height, left: adjustedLeft });
      });
    }
  }, [isVisible, fromRef, screenWidth]);
  

  const handleLogData = () => {
    console.log(value);
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        modalOverlay: {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        popoverStyle: {
          position: 'absolute',
          top: position.top,
          left: position.left,
          backgroundColor: colors.textPrimary,
          borderColor: colors.textPrimary,
          borderWidth: 2,
          borderRadius: 8,
          overflow: 'hidden',
        },
        popoverContent: {
          borderRadius: 6,
          padding: 8,
          backgroundColor: colors.background,
          alignItems: 'flex-start',
          minWidth: 145,
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
    [colors, position]
  );

  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={onClose}
      animationType="none"
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        {/* Empty Pressable overlay to close the modal */}
      </Pressable>

      <View style={styles.popoverStyle}>
        <View style={styles.popoverContent}>
          <TouchableOpacity onPress={handleLogData} style={styles.button}>
            <Icon name="info" size={20} color={colors.textPrimary} />
            <Text style={styles.buttonText}>Log Data</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('clicked settings')} style={styles.button}>
            <Icon name="settings" size={20} color={colors.textPrimary} />
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PopoverMenu;
