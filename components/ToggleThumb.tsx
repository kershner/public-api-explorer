import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useStore } from '@/store/useStore';
import React from 'react';

interface ToggleThumbProps {
  onPress: () => void;
  isOn: boolean;
}

const ToggleThumb: React.FC<ToggleThumbProps> = ({ onPress, isOn }) => {
  const colors = useStore((state) => state.colors);

  const styles = StyleSheet.create({
    toggleButton: {
      width: 40,
      height: 20,
      borderRadius: 10,
      backgroundColor: isOn ? colors.textPrimary : colors.accent,
      justifyContent: 'center',
      padding: 2,
    },
    toggleThumb: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.background,
      alignSelf: isOn ? 'flex-end' : 'flex-start',
    },
  });

  return (
    <TouchableOpacity style={styles.toggleButton} onPress={onPress}>
      <View style={styles.toggleThumb} />
    </TouchableOpacity>
  );
};

export default ToggleThumb;
