import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { publicApis } from '@/data/PublicApis';
import { PublicApi } from '@/models/PublicApi';
import { useStore } from '@/store/useStore';

interface ChosenApiInfoProps {
  jsonData: unknown;
  url: string;
}

const findPublicApiByUrl = (url: string| ""): PublicApi | undefined => {
  return publicApis.find(api => api.url === url);
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
    chosenApiContainer: { paddingBottom: 16 },
    title: { color: colors.textPrimary },
    description: { color: colors.textPrimary },
    category: { color: colors.textPrimary },
  });

  return (
    <View style={styles.chosenApiContainer}>
      <Text style={styles.title}>{chosenApi.title}</Text>
      <Text style={styles.description}>{chosenApi.description}</Text>
      <Text style={styles.category}>{chosenApi.category}</Text>
    </View>
  );
};

export default ChosenApiInfo;
