import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useState, useEffect } from 'react';
import { publicApis } from '@/data/PublicApis';
import { PublicApi } from '@/models/PublicApi';
import { useStore } from '@/store/useStore';

interface ChosenApiInfoProps {
  jsonData: unknown;
  url: string;
}

const findPublicApiByUrl = (url: string | ""): PublicApi | undefined => {
  try {
    const targetOrigin = new URL(url).origin;
    return publicApis.find(api => new URL(api.url).origin === targetOrigin);
  } catch (error) {
    return undefined;
  }
};

const ChosenApiInfo: React.FC<ChosenApiInfoProps> = ({ jsonData, url }) => {
  const [chosenApi, setChosenApi] = useState<PublicApi | undefined>(undefined);
  const colors = useStore((state) => state.colors);

  useEffect(() => {
    if (url) {
      const api = findPublicApiByUrl(url);
      setChosenApi(api);
    } else {
      setChosenApi(undefined);
    }
  }, [jsonData, url]);

  if (!chosenApi) {
    return null;
  }

  const styles = StyleSheet.create({
    chosenApiContainer: { 
      paddingBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.textPrimary,
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 6,
      maxWidth: '55%',
    },
    title: { 
      color: colors.background,
      fontWeight: 'bold',
    },
    openLinkIcon: {
      color: colors.background,
      paddingLeft: 4,
    },
    textContainer: {
      paddingLeft: 8,
      flexShrink: 1,
    },
    urlLinkContainer: {
      flex: 1,
    },
    urlLink: {
      fontSize: 18,
      color: colors.linkText,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
    },
    description: { 
      color: colors.textPrimary,
      flexWrap: 'wrap',
      flexShrink: 1,
    },
  });

  return (
    <View style={styles.chosenApiContainer}>
      <TouchableOpacity style={styles.titleContainer} onPress={() => Linking.openURL(chosenApi.viewMoreUrl)}>
        <Text style={styles.title}>{chosenApi.title}</Text>
        <Icon style={styles.openLinkIcon} name="open-in-new" size={16} />
      </TouchableOpacity>
      
      <View style={styles.textContainer}>
        <TouchableOpacity style={styles.urlLinkContainer} onPress={() => Linking.openURL(url)}>
          <Text style={styles.urlLink} numberOfLines={1} ellipsizeMode="tail">
            {url}
          </Text>
        </TouchableOpacity>

        <Text style={styles.description}>{chosenApi.description}</Text>
      </View>
    </View>
  );
};

export default ChosenApiInfo;
