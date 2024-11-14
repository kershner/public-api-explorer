import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useStore } from '@/store/useStore';
import React from 'react';

interface PopoverMenuButtonProps {
  onPress: () => void;
  icon: string;
  label: string;
  isHighlighted?: boolean;
}

const PopoverMenuButton: React.FC<PopoverMenuButtonProps> = ({ onPress, icon, label, isHighlighted=false }) => {
  const colors = useStore((state) => state.colors);

  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 6,
      paddingHorizontal: 0,
      width: '100%'
    },
    buttonText: {
      marginLeft: 8,
      color: colors.textPrimary,
    },
    icon: {
      fontSize: 20,
      color: colors.textPrimary,
      maxWidth: 20,
      width: '100%',
      textAlign: 'center',
    },
    highlighted: {
      backgroundColor: colors.textPrimary,
      paddingHorizontal: 16,
      borderRadius: 6
    },
    highlightedText: {
      color: colors.background
    }
  });

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, isHighlighted && styles.highlighted]}>
      <Text style={[styles.icon, isHighlighted && styles.highlightedText]}>{icon + '\uFE0E'}</Text>
      <Text style={[styles.buttonText, isHighlighted && styles.highlightedText]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default PopoverMenuButton;
