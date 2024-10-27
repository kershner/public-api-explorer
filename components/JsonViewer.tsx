import { FlatList, ScrollView, Platform, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import JsonItem from '@/components/JsonItem';
import { useStore } from '@/store/useStore';
import React, { useMemo } from 'react';

const JsonViewer: React.FC = () => {
  const currentUrl = useStore((state) => state.currentUrl);
  const loading = useStore((state) => state.loading);
  const jsonData = useStore((state) => state.jsonData);
  const content = jsonData ? [{ key: currentUrl, value: jsonData }] : [];
  const colors = useStore((state) => state.colors);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          padding: 16,
        },
        noData: {
          fontSize: 16,
          textAlign: 'center',
          marginTop: 20,
        },
      }),
    [colors]
  );
  
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.textPrimary} />
      </View>
    );
  }

  return Platform.select({
    web: (
      <ScrollView style={styles.container}>
        {content.map((item, index) => (
          <JsonItem key={index.toString()} label={item.key} value={item.value} />
        ))}
      </ScrollView>
    ),
    default: (
      <FlatList
        style={styles.container}
        data={content}
        renderItem={({ item }) => <JsonItem label={item.key} value={item.value} />}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.noData}>No data available</Text>}
      />
    ),
  });
};

export default JsonViewer;
