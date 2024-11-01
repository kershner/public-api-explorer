import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import useIsRootScreen from '@/hooks/useIsRootScreen';
import { PublicApi } from '@/models/PublicApi';
import { useStore } from '@/store/useStore';
import React, { useMemo } from 'react';

type PublicApiCardProps = {
  api: PublicApi;
  index: number;
};

const PublicApiCard: React.FC<PublicApiCardProps> = ({ api, index }) => {
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
          marginBottom: isRoot ? 8 : 0,
          alignItems: 'flex-start',
          flexShrink: 1,
          maxWidth: isRoot ? 150 : undefined,
        },
        content: {
          paddingVertical: 8,
          paddingHorizontal: 16,
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          alignSelf: 'stretch',
        },
        title: {
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 4,
          color: colors.textPrimary,
          textAlign: 'left',
        },
        description: {
          fontSize: 14,
          color: colors.textPrimary,
          marginBottom: 6,
          flexWrap: 'wrap',
          ...(!isRoot && { display: 'none' }),
        },
        tagContainer: {
          backgroundColor: colors.background,
          borderRadius: 15,
          paddingVertical: 4,
          paddingHorizontal: 10,
          alignSelf: 'flex-start',
          marginTop: 6,
          flexWrap: 'wrap',
          ...(!isRoot && { display: 'none' }),
        },
        tag: {
          fontSize: 12,
          color: colors.textPrimary,
          fontWeight: '600',
        },
      }),
    [colors, isRoot, index]
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
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>{api.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PublicApiCard;
