import { FlatList, ScrollView, Platform, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import JsonItem from '@/components/JsonItem';
import { useStore } from '@/store/useStore';
import { colors } from '@/constants/styles';
import React from 'react';

const JsonViewer: React.FC = () => {
  const currentUrl = useStore((state) => state.currentUrl);
  const loading = useStore((state) => state.loading);
  const jsonData = useStore((state) => state.jsonData);
  const content = jsonData ? [{ key: currentUrl, value: jsonData }] : [];
  
  if (loading) {
    return (
      <View style={jsonViewerStyles.container}>
        <ActivityIndicator size="large" color={colors.textPrimary} />
      </View>
    );
  }

  return Platform.select({
    web: (
      <ScrollView style={jsonViewerStyles.container}>
        {content.map((item, index) => (
          <JsonItem key={index.toString()} label={item.key} value={item.value} />
        ))}
      </ScrollView>
    ),
    default: (
      <FlatList
        style={jsonViewerStyles.container}
        data={content}
        renderItem={({ item }) => <JsonItem label={item.key} value={item.value} />}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={jsonViewerStyles.noData}>No data available</Text>}
      />
    ),
  });
};

const jsonViewerStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noData: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default JsonViewer;
