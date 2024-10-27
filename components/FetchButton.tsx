import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useStore } from '@/store/useStore';
import React, { useMemo } from 'react';

interface FetchButtonProps {
  url: string;
  title: string;
}

const FetchButton: React.FC<FetchButtonProps> = ({ url, title }) => {
  const inputValue = useStore((state) => state.inputValue);
  const setInputValue = useStore((state) => state.setInputValue);
  const setLoading = useStore((state) => state.setLoading);
  const colors = useStore((state) => state.colors);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        button: {
          backgroundColor: colors.accent,
          paddingVertical: 10,
          paddingHorizontal: 15,
          marginHorizontal: 5,
          borderRadius: 5,
        },
        text: {
          color: colors.textPrimary,
        },
      }),
    [colors]
  );

  const handlePress = () => {
    if (inputValue !== url) {
      setLoading(true);
      setInputValue(url);
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FetchButton;
