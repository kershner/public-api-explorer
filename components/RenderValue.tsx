import { View, Text, Image, TouchableOpacity, Linking, Dimensions, StyleSheet } from 'react-native';
import {isHtml, isUrl, isImageUrl} from '@/utils/utils'
import RenderHtml from 'react-native-render-html';
import { useStore } from '@/store/useStore';
import React, { useMemo } from 'react';

const { width: screenWidth } = Dimensions.get('window');

// Main function to render different types of values
const RenderValue = (value: string | number | boolean | object | null) => {
  const colors = useStore((state) => state.colors);
  
  const styles = useMemo(
    () =>
      StyleSheet.create({
        value: {
          fontSize: 16,
          textAlign: 'left',
          maxWidth: 400,
          color: colors.textPrimary,
        },
        link: {
          cursor: 'pointer',
          color: colors.linkText,
          textDecorationLine: 'underline',
        },
        image: { 
          width: 100,
          height: 100,
        },
      }),
    [colors]
  );

  if (typeof value === 'string') {
    if (isHtml(value)) {
      return (
        <View style={styles.value}>
          <RenderHtml contentWidth={screenWidth} source={{ html: value }} tagsStyles={{body: { color: colors.textPrimary }}} />
        </View>
      );
    }
    if (isImageUrl(value)) {
      return (
        <TouchableOpacity onPress={() => Linking.openURL(value)}>
          <Image
            source={{ uri: value }}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      );
    }
    if (isUrl(value)) {
      return (
        <TouchableOpacity onPress={() => Linking.openURL(value)}>
          <Text style={[styles.value, styles.link]}>{value}</Text>
        </TouchableOpacity>
      );
    }
    return <Text style={styles.value}>{value}</Text>;
  }
  
  // For numbers, booleans, and other types, convert to string
  return <Text style={styles.value}>{String(value)}</Text>;
};

export default RenderValue;
