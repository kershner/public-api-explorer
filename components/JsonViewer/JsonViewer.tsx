import { FlatList, ScrollView, Platform, StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import JsonItem from '@/components/JsonViewer/JsonItem';
import { Picker } from '@react-native-picker/picker';
import { useStore } from '@/store/useStore';

interface JsonViewerProps {
  jsonData?: Record<string, unknown>;
  url?: string;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ jsonData, url = "" }) => {
  const loading = useStore((state) => state.loading);
  const colors = useStore((state) => state.colors);
  const [allKeys, setAllKeys] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [shouldExpandAll, setShouldExpandAll] = useState<boolean>(false);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flexGrow: 1, paddingHorizontal: 8, paddingBottom: 16 },
        spinnerWrapper: { flexGrow: 1, flexDirection: 'row', alignSelf: 'center' },
        spinner: { marginVertical: 16 },
        picker: { margin: 8 },
      }),
    [colors]
  );

  const extractKeys = useCallback((data: unknown, keys: Set<string>) => {
    if (typeof data === 'object' && data !== null) {
      Object.keys(data).forEach((key) => {
        if (isNaN(Number(key))) {
          keys.add(key);
        }
        extractKeys((data as Record<string, unknown>)[key], keys);
      });
    }
  }, []);

  useEffect(() => {
    if (jsonData) {
      const keysSet = new Set<string>();
      extractKeys(jsonData, keysSet);
      setAllKeys(Array.from(keysSet));
    }
  }, [jsonData, extractKeys]);

  const handleFilterChange = useCallback((itemValue: string) => {
    setSelectedKey(itemValue);
    setShouldExpandAll(true);
  }, []);

  const filteredContent = useMemo(() => {
    if (!jsonData || !selectedKey) return [{ key: url, value: jsonData }];

    const filterData = (data: unknown): unknown => {
      if (typeof data !== 'object' || data === null) return null;
      if (selectedKey in (data as Record<string, unknown>)) {
        return { [selectedKey]: (data as Record<string, unknown>)[selectedKey] };
      }
      return Object.entries(data as Record<string, unknown>).reduce((acc, [key, value]) => {
        const filtered = filterData(value);
        if (filtered) (acc as Record<string, unknown>)[key] = filtered;
        return acc;
      }, {} as Record<string, unknown>);
    };

    return [{ key: url, value: filterData(jsonData) }];
  }, [jsonData, selectedKey, url]);

  if (loading) {
    return (
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator style={styles.spinner} size={100} color={colors.textPrimary} />
      </View>
    );
  }

  const renderJsonItems = (item: { key: string; value: unknown }, index: number) => (
    <JsonItem
      key={index.toString()}
      label={item.key as string}
      value={item.value as string | number | boolean | object | null}
      level={0}
      expandAll={shouldExpandAll}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <Picker selectedValue={selectedKey} onValueChange={handleFilterChange} style={styles.picker}>
        <Picker.Item label="All Keys" value="" />
        {allKeys.map((key) => (
          <Picker.Item key={key} label={key} value={key} />
        ))}
      </Picker>
      
      {Platform.select({
        web: (
          <ScrollView style={styles.container}>
            {filteredContent.map(renderJsonItems)}
          </ScrollView>
        ),
        default: (
          <FlatList
            style={styles.container}
            data={filteredContent}
            renderItem={({ item, index }) => renderJsonItems(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
        ),
      })}
    </View>
  );
};

export default JsonViewer;
