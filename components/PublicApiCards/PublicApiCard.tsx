import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PublicApi } from '@/models/PublicApi';
import { useStore } from '@/store/useStore';
import { checkUrl } from '@/utils/utils';
import React, { useMemo } from 'react';

type PublicApiCardProps = {
  api: PublicApi;
  index: number;
  closeModal?: () => void;
};

const PublicApiCard: React.FC<PublicApiCardProps> = ({ api, index, closeModal }) => {
  const setLoading = useStore((state) => state.setLoading);
  const colors = useStore((state) => state.colors);
  
  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          backgroundColor: colors.accent,
          borderRadius: 15,
          marginHorizontal: 4,
          marginBottom: 8,
          alignItems: 'flex-start',
          flexShrink: 1,
          maxWidth: 150,
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
        },
        tagContainer: {
          backgroundColor: colors.background,
          borderRadius: 15,
          paddingVertical: 4,
          paddingHorizontal: 10,
          alignSelf: 'flex-start',
          marginTop: 6,
          flexWrap: 'wrap',
        },
        tag: {
          fontSize: 12,
          color: colors.textPrimary,
          fontWeight: '600',
        },
      }),
    [colors, index]
  );

  const handlePress = () => {
    setTimeout(() => {
      if (closeModal) closeModal();
      setLoading(true);
      checkUrl(api.url, 5000);
    }, 100);
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
