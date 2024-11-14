import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useStore } from '@/store/useStore';
import React, { useMemo } from 'react';

const ToggleApiInfoButton: React.FC = () => {
  const currentApiExpanded = useStore((state) => state.currentApiExpanded);
  const setCurrentApiExpanded = useStore((state) => state.setCurrentApiExpanded);
  const colors = useStore((state) => state.colors);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        toggleButton: {
          paddingVertical: 6,
          paddingHorizontal: 16,
          backgroundColor: colors.accent,
          borderRadius: 35,
          marginBottom: 8,
        },
        toggleButtonText: {
          color: colors.textPrimary,
          fontWeight: '600',
        },
      }),
    [colors]
  );

  return (
    <TouchableOpacity style={styles.toggleButton} onPress={() => setCurrentApiExpanded(!currentApiExpanded)}>
      <Text style={styles.toggleButtonText}>
        {currentApiExpanded ? '▼' : '▶'} API Info
      </Text>
    </TouchableOpacity>
  );
};

export default ToggleApiInfoButton;
