import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import JsonSchemaModal from '@/components/JsonViewer/TopDrawer/JsonSchemaModal';
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
  const [modalVisible, setModalVisible] = useState(false);

  const showSchema = () => {
    setModalVisible(true);
  }

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
    },
    titleAndToggleRow: {
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      width: '100%',
      gap: 3
    },
    titleLinks: {
      flexDirection: 'row',
      gap: 5
    },
    titleContainer: {
      backgroundColor: colors.textPrimary,
      borderRadius: 35,
      paddingHorizontal: 10,
      paddingVertical: 2,
    },
    title: { 
      color: colors.textPrimary,
      fontSize: 24,
      fontWeight: 'bold'
    },
    openLinkIcon: {
      color: colors.background,
      paddingHorizontal: 4,
      fontWeight: 'bold',
    },
    textContainer: {
      flexShrink: 1,
      width: '100%'
    },
    description: { 
      color: colors.textPrimary,
      fontSize: 16,
      flexWrap: 'wrap',
      flexShrink: 1,
      marginTop: 5,
      paddingLeft: 2
    },
  });

  return (
    <View style={styles.chosenApiContainer}>
      <View style={styles.titleAndToggleRow}>
        <Text style={styles.title}>{chosenApi.title}</Text>

        <View style={styles.titleLinks}>
          <TouchableOpacity style={styles.titleContainer} onPress={() => Linking.openURL(chosenApi.viewMoreUrl)}>  
            <Text style={styles.openLinkIcon}>Docs</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.titleContainer} onPress={showSchema}>  
            <Text style={styles.openLinkIcon}>Schema</Text>
          </TouchableOpacity>

          <JsonSchemaModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            json={jsonData}
            url={url}
          />
        </View>
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.description}>{chosenApi.description}</Text>
      </View>
    </View>
  );
};

export default ChosenApiInfo;
