import { View, StyleSheet, Modal, Pressable, Dimensions } from 'react-native';
import React, { useEffect, useState, useMemo, ReactNode } from 'react';
import { useStore } from '@/store/useStore';

interface PopoverMenuProps {
  isVisible: boolean;
  fromRef: React.RefObject<View>;
  onClose: () => void;
  children: ReactNode;
}

const PopoverMenu: React.FC<PopoverMenuProps> = ({ isVisible, fromRef, onClose, children }) => {
  const colors = useStore((state) => state.colors);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const popoverWidth = 200;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        modalOverlay: {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
        popoverStyle: {
          position: 'absolute',
          backgroundColor: colors.textPrimary,
          borderColor: colors.textPrimary,
          borderWidth: 2,
          borderRadius: 8,
          top: position.top,
          left: position.left,
        },
        popoverContent: {
          borderRadius: 6,
          padding: 8,
          backgroundColor: colors.background,
          alignItems: 'flex-start',
        },
      }),
    [colors, position]
  );

  useEffect(() => {
    if (isVisible && fromRef.current) {
      fromRef.current.measure((x, y, width, height, pageX, pageY) => {
        let left = pageX + width / 2 - popoverWidth / 2;
        let top = pageY + height;

        // Clamp to keep within screen bounds
        left = Math.max(0, Math.min(left, screenWidth - popoverWidth));
        top = Math.max(0, Math.min(top, screenHeight - popoverWidth) + 5);

        setPosition({ top, left });
      });
    }
  }, [isVisible, fromRef, screenWidth, screenHeight]);

  return (
    <Modal transparent visible={isVisible} onRequestClose={onClose} animationType="none">
      <Pressable style={styles.modalOverlay} onPress={onClose} />
      <View style={styles.popoverStyle}>
        <View style={styles.popoverContent}>{children}</View>
      </View>
    </Modal>
  );
};

export default PopoverMenu;
