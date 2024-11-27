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
  const [popoverWidth, setPopoverWidth] = useState(0);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const styles = useMemo(
    () =>
      StyleSheet.create({
        modalOverlay: {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
        popoverStyle: {
          position: 'absolute',
          top: position.top,
          left: position.left,
          overflow: 'hidden',
        },
        popoverContent: {
          padding: 8,
          backgroundColor: colors.background,
          borderColor: colors.textPrimary,
          borderWidth: 2,
          borderRadius: 8,
          alignItems: 'flex-start',
          alignSelf: 'flex-start',
        },
      }),
    [colors, position]
  );

  useEffect(() => {
    if (isVisible && fromRef.current) {
      fromRef.current.measure((x, y, width, height, pageX, pageY) => {
        const calculatedLeft = Math.max(
          0,
          Math.min(pageX + width / 2 - popoverWidth / 2, screenWidth - popoverWidth)
        );
        const calculatedTop = Math.max(0, pageY + height);

        setPosition({ top: calculatedTop, left: calculatedLeft });
      });
    }
  }, [isVisible, fromRef, screenWidth, screenHeight, popoverWidth]);

  const handleContentLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setPopoverWidth(width);
  };

  return (
    <Modal transparent visible={isVisible} onRequestClose={onClose} animationType="none">
      <Pressable style={styles.modalOverlay} onPress={onClose} />
      <View style={styles.popoverStyle}>
        <View style={styles.popoverContent} onLayout={handleContentLayout}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default PopoverMenu;
