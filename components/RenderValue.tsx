import { View, Text, Image, TouchableOpacity, Linking, Dimensions, StyleSheet } from 'react-native';
import {isHtml, isUrl, isImageUrl} from '@/utils/utils'
import RenderHtml from 'react-native-render-html';
import { colors } from '@/constants/styles';
import React from 'react';

const { width: screenWidth } = Dimensions.get('window');

// Main function to render different types of values
const RenderValue = (value: string | number | boolean | object | null) => {
  if (typeof value === 'string') {
    if (isHtml(value)) {
      return (
        <View style={renderValueStyles.value}>
          <RenderHtml contentWidth={screenWidth} source={{ html: value }} tagsStyles={{body: { color: colors.textPrimary }}} />
        </View>
      );
    }
    if (isImageUrl(value)) {
      return (
        <TouchableOpacity onPress={() => Linking.openURL(value)}>
          <Image
            source={{ uri: value }}
            style={renderValueStyles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      );
    }
    if (isUrl(value)) {
      return (
        <TouchableOpacity onPress={() => Linking.openURL(value)}>
          <Text style={[renderValueStyles.value, renderValueStyles.link]}>{value}</Text>
        </TouchableOpacity>
      );
    }
    return <Text style={renderValueStyles.value}>{value}</Text>;
  }
  
  // For numbers, booleans, and other types, convert to string
  return <Text style={renderValueStyles.value}>{String(value)}</Text>;
};

const renderValueStyles = StyleSheet.create({
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
});

export default RenderValue;
