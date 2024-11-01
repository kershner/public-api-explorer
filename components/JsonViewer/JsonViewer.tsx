import { FlatList, ScrollView, Platform, StyleSheet, View, ActivityIndicator } from 'react-native';
import JsonItem from '@/components/JsonViewer/JsonItem';
import { useStore } from '@/store/useStore';
import React, { useMemo } from 'react';

interface JsonViewerProps {
  jsonData?: unknown;
  url?: string;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ jsonData, url }) => {
  const loading = useStore((state) => state.loading);
  const colors = useStore((state) => state.colors);
  const content = jsonData ? [{ key: url, value: jsonData }] : [];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexGrow: 1,
          paddingHorizontal: 8,
          paddingBottom: 16,
        },
        spinnerWrapper: {
          flexGrow: 1,
          flexDirection: 'row',
          alignSelf: 'center',
        },
        spinner: {
          marginVertical: 16,
        }
      }),
    [colors]
  );

  if (loading) {
    return (
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator style={styles.spinner} size={100} color={colors.textPrimary} />
      </View>
    );
  }

  return Platform.select({
    web: (
      <ScrollView style={styles.container}>
        {content.map((item, index) => (
          <JsonItem key={index.toString()} label={item.key as string} value={item.value} />
        ))}
      </ScrollView>
    ),
    default: (
      <FlatList
        style={styles.container}
        data={content}
        renderItem={({ item }) => <JsonItem label={item.key as string} value={item.value} />}
        keyExtractor={(item, index) => index.toString()}
      />
    ),
  });
};

export default JsonViewer;
