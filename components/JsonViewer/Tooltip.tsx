import { View, Modal, Pressable, Text, StyleSheet } from 'react-native';
import { useStore } from '@/store/useStore';
import React, { useMemo } from 'react';

interface TooltipProps {
  isVisible: boolean;
  position: { top: number, left: number };
  onClose: () => void;
  label: string;
}

const Tooltip: React.FC<TooltipProps> = ({ isVisible, position, onClose, label }) => {
  const colors = useStore((state) => state.colors);
  
  const styles = useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
        tooltip: {
          position: 'absolute',
          paddingVertical: 6,
          paddingHorizontal: 10,
          backgroundColor: colors.accent,
          borderRadius: 5,
          top: position.top,
          left: position.left,
        },
        tooltipText: {
          color: colors.textPrimary,
        },
      }),
    [position]
  );

  return (
    <Modal transparent visible={isVisible} onRequestClose={onClose} animationType="none">
      <Pressable style={styles.overlay} onPress={onClose} />
      <View style={styles.tooltip}>
        <Text style={styles.tooltipText}>{label}</Text>
      </View>
    </Modal>
  );
};

export default Tooltip;
