import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Icon name={icon} size={20} color={colors.textPrimary} />
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default PopoverMenuButton;
