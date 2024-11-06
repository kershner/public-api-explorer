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
      return;
    }

    const searchLower = debouncedSearchText.toLowerCase();

    const applyFilters = (data: unknown): unknown => {
      if (Array.isArray(data)) {
        return data.map((item) => applyFilters(item)).filter((item) => item !== null);
      } else if (typeof data === 'object' && data !== null) {
        const fullObject: Record<string, unknown> = { ...data };
        let matchFound = false;

        for (const [key, value] of Object.entries(data)) {
          const keyLower = key.toLowerCase();
          const valueString =
            typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
              ? String(value).toLowerCase()
              : "";

          const valueMatches = !searchLower || keyLower.includes(searchLower) || valueString.includes(searchLower);

          if (valueMatches) {
            matchFound = true;
          } else if (typeof value === 'object' && value !== null) {
            const nestedMatch = applyFilters(value);
            if (nestedMatch) {
              matchFound = true;
              fullObject[key] = nestedMatch;
            }
          }
        }

        if (matchFound) {
          if (selectedKey && selectedKey in fullObject) {
            return { [selectedKey]: fullObject[selectedKey] };
          }
          return fullObject;
        }

        return null;
      }
      return null;
    };

    const filteredData = applyFilters(jsonData);
    if (filteredJson !== filteredData) {
      setFilteredJson(filteredData);
    }
  }, [jsonData, selectedKey, debouncedSearchText, filteredJson]);

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
      return filteredJson.map((item, index) => renderJsonItems({ key: index.toString(), value: item }, index));
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
            data={Array.isArray(filteredJson) ? filteredJson.map((item, index) => ({ key: index.toString(), value: item })) : []}
            renderItem={({ item, index }) => renderJsonItems(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
        ),
      })}
    </View>
  );
};

export default JsonViewer;
