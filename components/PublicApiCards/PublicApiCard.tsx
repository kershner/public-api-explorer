import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import useIsRootScreen from '@/hooks/useIsRootScreen';
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
  const isRoot = useIsRootScreen();
  
  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          backgroundColor: colors.accent,
          borderRadius: 15,
          alignItems: 'flex-start',
          width: isRoot ? (Platform.OS === 'web' ? 150 : '31%') : 250,
        },
        content: {
          paddingVertical: 8,
          paddingHorizontal: 8,
          alignItems: 'flex-start',
          flexDirection: Platform.OS == 'ios' ? 'row' : 'column',
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
          paddingHorizontal: 8,
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
        <View>
          <Text style={styles.title}>{api.title}</Text>
          <Text style={styles.description}>{api.description}</Text>
        </View>
        <View style={styles.tagContainer}>
          <Text style={styles.tag} numberOfLines={1}>{api.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PublicApiCard;
