import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import useIsRootScreen from '@/hooks/useIsRootScreen';
import { PublicApi } from '@/models/PublicApi';
import { useStore } from '@/store/useStore';
import React, { useMemo } from 'react';

type PublicApiCardProps = {
  api: PublicApi;
};

const PublicApiCard: React.FC<PublicApiCardProps> = ({ api }) => {
  const inputValue = useStore((state) => state.inputValue);
  const setInputValue = useStore((state) => state.setInputValue);
  const setLoading = useStore((state) => state.setLoading);
  const colors = useStore((state) => state.colors);
  const isRoot = useIsRootScreen();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          backgroundColor: colors.accent,
          borderRadius: 8,
          marginHorizontal: 4,
          marginBottom: 8
        },
        content: {
          paddingVertical: 8,
          paddingHorizontal: 16,
        },
        title: {
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 4,
          color: colors.textPrimary,
        },
        description: {
          fontSize: 14,
          color: colors.textPrimary,
          marginBottom: 6,
        },
        category: {
          fontSize: 12,
          color: colors.textPrimary,
        },
      }),
    [colors, isRoot]
  );

  const handlePress = () => {
    if (inputValue !== api.url) {
      setLoading(true);
      setInputValue(api.url);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.content}>
        <Text style={styles.title}>{api.title}</Text>
        <Text style={styles.description}>{api.description}</Text>
        <Text style={styles.category}>{api.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PublicApiCard;
