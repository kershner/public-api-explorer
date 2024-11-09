import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Picker } from '@react-native-picker/picker';

interface FilterControlsProps {
  jsonData: unknown;
  onFilterUpdate: (filteredData: unknown) => void;
  colors: {
    textPrimary: string;
    background: string;
  };
}

const FilterControls: React.FC<FilterControlsProps> = ({ jsonData, onFilterUpdate, colors }) => {
  const [allKeys, setAllKeys] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>("");

  const styles = StyleSheet.create({
    filterLabel: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: colors.textPrimary },
    filterContainer: { flexDirection: 'row', alignItems: 'center' },
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
  });

  // Extract keys from JSON data for filtering
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
      setAllKeys(Array.from(keysSet).sort());
    }
  }, [jsonData, extractKeys]);

  // Debounce the search text
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [searchText]);

  // Filter logic based on search and selected key
  useEffect(() => {
    const searchLower = debouncedSearchText.toLowerCase();

    const applyFilters = (data: unknown): unknown => {
      if (Array.isArray(data)) {
        return data.map((item) => applyFilters(item)).filter((item) => item !== null) || null;
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

      onFilterUpdate(selectedKey ? filteredByKey(filteredResult) || filteredResult : filteredResult);
    } else {
      onFilterUpdate(filteredResult);
    }
  }, [jsonData, selectedKey, debouncedSearchText, onFilterUpdate]);

  return (
    <View>
      <Text style={styles.filterLabel}>Filter by:</Text>
      <View style={styles.filterContainer}>
        <Picker selectedValue={selectedKey} onValueChange={setSelectedKey} style={styles.picker}>
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
    </View>
  );
};

export default FilterControls;
