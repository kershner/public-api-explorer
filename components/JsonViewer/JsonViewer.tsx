import { FlatList, Platform, StyleSheet, View, ActivityIndicator, TextInput, Text, TouchableOpacity } from 'react-native';
import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
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
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const scrollViewRef = useRef(null);

  const styles = useMemo(() => 
    StyleSheet.create({
      wrapper: { flex: 1, padding: 16 },
      container: { flexGrow: 1, paddingBottom: 80 },
      spinnerWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
      spinner: { marginVertical: 16 },
      filterLabel: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: colors.textPrimary },
      filterContainer: { flexDirection: 'row', alignItems: 'center', paddingBottom: 16 },
      picker: {
        flex: 1,
        height: 40,
        marginRight: 8,
        borderColor: colors.textPrimary,
        borderWidth: 2,
        borderRadius: 4,
        backgroundColor: colors.background,
        color: colors.textPrimary,
      },
      input: {
        flex: 3,
        height: 40,
        borderColor: colors.textPrimary,
        borderWidth: 2,
        paddingHorizontal: 10,
        borderRadius: 4,
        color: colors.textPrimary,
        backgroundColor: colors.background,
      },
      backToTopButton: {
        position: 'absolute',
        bottom: 20,
        right: 70,
        backgroundColor: colors.background,
        borderWidth: 2,
        borderColor: colors.textPrimary,
        borderRadius: 6,
        padding: 10,
      },
      backToTopButtonText: {
        color: colors.textPrimary,
      },
    }), [colors]
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
    return () => clearTimeout(handler);
  }, [searchText]);

  useEffect(() => {
    if (!jsonData) {
      setFilteredJson(jsonData);
      return;
    }

    const searchLower = debouncedSearchText.toLowerCase();

    const applyFilters = (data: unknown): unknown => {
      if (Array.isArray(data)) {
        const matchedItems = data
          .map((item) => applyFilters(item))
          .filter((item) => item !== null);
        return matchedItems.length > 0 ? matchedItems : null;
      } else if (typeof data === 'object' && data !== null) {
        const originalObject: Record<string, unknown> = { ...data };
        let matchFound = false;
    
        for (const [key, value] of Object.entries(data)) {
          const keyLower = key.toLowerCase();
          const valueString = typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' 
            ? String(value).toLowerCase() 
            : "";
    
          const valueMatches = searchLower 
            ? keyLower.includes(searchLower) || valueString.includes(searchLower) 
            : true;
    
          if (valueMatches) {
            matchFound = true;
          } else if (typeof value === 'object' && value !== null) {
            const nestedMatch = applyFilters(value);
            if (nestedMatch) {
              matchFound = true;
              originalObject[key] = nestedMatch;
            }
          }
        }
    
        return matchFound ? originalObject : null;
      }
      return null;
    };

    const filteredResult = applyFilters(jsonData);

    if (filteredResult) {
      if (selectedKey) {
        const filteredByKey = (data: unknown): unknown => {
          if (typeof data === 'object' && data !== null) {
            const result: Record<string, unknown> = {};
            let keyExists = false;

            for (const [key, value] of Object.entries(data)) {
              if (key === selectedKey) {
                result[key] = value;
                keyExists = true;
              } else if (typeof value === 'object') {
                const nestedResult = filteredByKey(value);
                if (nestedResult) {
                  result[key] = nestedResult;
                }
              }
            }
            return keyExists || Object.keys(result).length > 0 ? result : null;
          }
          return null;
        };
        setFilteredJson(filteredByKey(filteredResult) || filteredResult);
      } else {
        setFilteredJson(filteredResult);
      }
    } else {
      setFilteredJson(filteredResult);
    }
    setExpandedKeys(new Set(expandedKeys));
  }, [jsonData, selectedKey, debouncedSearchText]);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowBackToTop(offsetY > 200); // Show button after scrolling 200 pixels
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const rootData = useMemo(() => {
    return Array.isArray(filteredJson)
      ? filteredJson.map((item, index) => ({ key: index.toString(), value: item }))
      : Object.entries(filteredJson).map(([key, value]) => ({ key, value }));
  }, [filteredJson]);

  const renderContent = () => (
    <FlatList
      data={rootData}
      renderItem={({ item, index }) => (
        <JsonItem
          key={index.toString()}
          label={item.key}
          value={item.value as string | number | boolean | object | null}
          level={0}
          expandAll={expandedKeys.has(item.key)}
        />
      )}
      keyExtractor={(item, index) => `root-${index}`}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      ref={scrollViewRef}
      contentContainerStyle={styles.container}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  );

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
      {renderContent()}
      {showBackToTop && (
        <TouchableOpacity style={styles.backToTopButton} onPress={scrollToTop}>
          <Text style={styles.backToTopButtonText}>↑ Top</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default JsonViewer;
