import ToggleApiInfoButton from '@/components/JsonViewer/TopDrawer/ToggleApiInfoButton';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
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
  const currentApiExpanded = useStore((state) => state.currentApiExpanded);

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
      flexWrap: 'wrap',
      width: '100%',
    },
    titleAndToggleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      alignItems: 'flex-end',
      width: '100%'
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.textPrimary,
      borderRadius: 35,
      paddingHorizontal: 10,
      paddingLeft: 15,
      paddingVertical: 6,
      maxWidth: '68%'
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
      flexShrink: 1,
      width: '100%'
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
      <View style={styles.titleAndToggleRow}>
        <TouchableOpacity style={styles.titleContainer} onPress={() => Linking.openURL(chosenApi.viewMoreUrl)}>
          <Text style={styles.title}>{chosenApi.title}</Text>
          <Text style={styles.openLinkIcon}>↗️</Text>
        </TouchableOpacity>

        {currentApiExpanded && (
          <ToggleApiInfoButton />
        )}
      </View>
      
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
