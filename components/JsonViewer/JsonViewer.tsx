import { FlatList, ScrollView, Platform, StyleSheet, View, ActivityIndicator, TextInput, Text } from 'react-native';
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import JsonItem from '@/components/JsonViewer/JsonItem';
import { Picker } from '@react-native-picker/picker';
import { useStore } from '@/store/useStore';

interface JsonViewerProps {
  jsonData?: unknown;
  url?: string;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ jsonData, url = "" }) => {
  const loading = useStore((state) => state.loading);
  const colors = useStore((state) => state.colors);
  const [allKeys, setAllKeys] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>("");
  const [filteredJson, setFilteredJson] = useState<unknown>(jsonData);
  const [shouldExpand, setShouldExpand] = useState<{ [key: string]: boolean }>({});

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: { flex: 1, padding: 16 },
        container: { flexGrow: 1 },
        spinnerWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
        spinner: { marginVertical: 16 },
        filterLabel: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: colors.textPrimary },
        filterContainer: { flexDirection: 'row', alignItems: 'center', paddingBottom: 16 },
        picker: {
          flex: 1,
          height: 40,
          marginRight: 8,
          borderColor: colors.accent,
          borderWidth: 2,
          borderRadius: 4,
          backgroundColor: colors.background,
          color: colors.textPrimary,
        },
        input: {
          flex: 3,
          height: 40,
          borderColor: colors.accent,
          borderWidth: 2,
          paddingHorizontal: 10,
          borderRadius: 4,
          color: colors.textPrimary,
          backgroundColor: colors.background,
        },
      }),
    [colors]
  );

  const extractKeys = useCallback((data: unknown, keys: Set<string>) => {
    if (Array.isArray(data)) {
      data.forEach((item) => extractKeys(item, keys));
    } else if (typeof data === 'object' && data !== null) {
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
      const sortedKeys = Array.from(keysSet).sort();
      setAllKeys(sortedKeys);
    }
  }, [jsonData, extractKeys]);

  const handleFilterChange = useCallback((itemValue: string) => {
    setSelectedKey(itemValue);
    setShouldExpand({});
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText.trim());
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  useEffect(() => {
    if (!jsonData) {
      setFilteredJson(jsonData);
      setShouldExpand({});
      return;
    }

    const searchLower = debouncedSearchText.toLowerCase();
    const expandKeys: { [key: string]: boolean } = {};

    const applyFilters = (data: unknown): unknown => {
      if (Array.isArray(data)) {
        const filteredArray = data
          .map((item, index) => {
            const filteredItem = applyFilters(item);
            if (filteredItem) {
              expandKeys[index.toString()] = true;
              return filteredItem;
            }
            return null;
          })
          .filter((item) => item !== null);

        return filteredArray.length > 0 ? filteredArray : null;
      } else if (typeof data === 'object' && data !== null) {
        let matchFound = false;

        const filtered = Object.entries(data as Record<string, unknown>).reduce((acc, [key, value]) => {
          const keyLower = key.toLowerCase();
          let valueString = "";

          if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            valueString = String(value).toLowerCase();
          }

          const keyMatches = selectedKey ? key === selectedKey : true;
          const valueMatches = searchLower
            ? keyLower.includes(searchLower) || valueString.includes(searchLower)
            : true;

          if (keyMatches && valueMatches) {
            matchFound = true;
            expandKeys[key] = true;
            acc[key] = value;
          } else {
            const nested = applyFilters(value);
            if (nested) {
              matchFound = true;
              acc[key] = nested;
              expandKeys[key] = true;
            }
          }
          return acc;
        }, {} as Record<string, unknown>);

        return matchFound ? filtered : null;
      }

      return null;
    };

    setFilteredJson(applyFilters(jsonData));
    setShouldExpand(expandKeys);
  }, [jsonData, selectedKey, debouncedSearchText]);

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
      label={item.key}
      value={item.value as string | number | boolean | object | null}
      level={0}
      expandAll={false}
    />
  );

  const renderContent = () => {
    if (Array.isArray(filteredJson)) {
      return filteredJson.map((item, index) =>
        renderJsonItems({ key: index.toString(), value: item }, index)
      );
    } else if (filteredJson && typeof filteredJson === 'object') {
      return Object.entries(filteredJson).map(([key, value], index) =>
        renderJsonItems({ key, value }, index)
      );
    }
    return null;
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.filterLabel}>Filter by:</Text>
      <View style={styles.filterContainer}>
        <Picker selectedValue={selectedKey} onValueChange={handleFilterChange} style={styles.picker}>
          <Picker.Item label="All Keys" value="" />
          {allKeys.map((key) => (
            <Picker.Item key={key} label={key} value={key} />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {Platform.select({
        web: <ScrollView style={styles.container}>{renderContent()}</ScrollView>,
        default: (
          <FlatList
            style={styles.container}
            data={
              Array.isArray(filteredJson)
                ? filteredJson.map((item, index) => ({ key: index.toString(), value: item }))
                : []
            }
            renderItem={({ item, index }) => renderJsonItems(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
        ),
      })}
    </View>
  );
};

export default JsonViewer;
