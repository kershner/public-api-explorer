import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useStore } from '@/store/useStore';
import React from 'react';

interface PopoverMenuButtonProps {
  onPress: () => void;
  icon: string;
  label: string;
}

const PopoverMenuButton: React.FC<PopoverMenuButtonProps> = ({ onPress, icon, label }) => {
  const colors = useStore((state) => state.colors);

  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    buttonText: {
      marginLeft: 8,
      color: colors.textPrimary,
    },
    icon: {
      fontSize: 20,
      color: colors.textPrimary
    }
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.icon}>{icon + '\uFE0E'}</Text>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default PopoverMenuButton;
