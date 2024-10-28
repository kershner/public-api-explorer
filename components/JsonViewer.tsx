import { FlatList, ScrollView, Platform, StyleSheet, View, ActivityIndicator } from 'react-native';
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
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingBottom: 16,
        },
        noData: {
          flexGrow: 0,
          height: '30%'
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
      <ScrollView style={[styles.container, currentUrl ? null : styles.noData]}>
        {content.map((item, index) => (
          <JsonItem key={index.toString()} label={item.key} value={item.value} />
        ))}
      </ScrollView>
    ),
    default: (
      <FlatList
        style={[styles.container, currentUrl ? null : styles.noData]}
        data={content}
        renderItem={({ item }) => <JsonItem label={item.key} value={item.value} />}
        keyExtractor={(item, index) => index.toString()}
      />
    ),
  });
};

export default JsonViewer;
