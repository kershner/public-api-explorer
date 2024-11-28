import ToggleApiInfoButton from '@/components/JsonViewer/TopDrawer/ToggleApiInfoButton';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import MultiSelectPicker from '@/components/MultiSelectPicker';
import React, { useState, useEffect } from 'react';
import { extractKeys } from '@/utils/utils';
import { useStore } from '@/store/useStore';

interface FilterControlsProps {
  jsonData: unknown;
  onFilterUpdate: (filteredData: unknown) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ jsonData, onFilterUpdate }) => {
  const [allKeys, setAllKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>("");
  const colors = useStore((state) => state.colors);

  // Styles
  const styles = StyleSheet.create({
    filterLabel: { fontSize: 16, fontWeight: 'bold', marginBottom: 2, color: colors.textPrimary },
    filterContainer: { flexDirection: 'row', gap: 5, alignItems: 'center' },
    input: { flex: 3, height: 40, borderWidth: 2, paddingLeft: 10, borderRadius: 4, color: colors.textPrimary, borderColor: colors.textPrimary, backgroundColor: colors.background },
    activeFiltersContainer: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 3, marginVertical: 6 },
    filterChip: { backgroundColor: colors.textPrimary, paddingVertical: 4, paddingHorizontal: 14, borderRadius: 20 },
    filterChipText: { color: colors.background, fontWeight: 'bold', fontSize: 10 },
    clearButton: { backgroundColor: colors.accent, paddingVertical: 4, paddingHorizontal: 14, borderRadius: 20, alignSelf: 'flex-start' },
    clearButtonText: { color: colors.textPrimary, fontWeight: 'bold', fontSize: 10 },
  });

  // Extract unique keys from JSON data
  useEffect(() => {
    if (jsonData) {
      const keysSet = new Set<string>();
      extractKeys(jsonData, keysSet);
      setAllKeys(Array.from(keysSet).sort());
    }
  }, [jsonData, extractKeys]);

  // Debounce search text
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchText(searchText.trim()), 300);
    return () => clearTimeout(handler);
  }, [searchText]);

  // Filter JSON data based on selected keys and search text
  useEffect(() => {
    const applyFilters = (data: unknown): unknown => {
      if (Array.isArray(data)) {
        return data.map(applyFilters).filter((item) => item !== null);
      } else if (data && typeof data === 'object') {
        const filteredObject: Record<string, unknown> = {};
        let matchFound = false;

        for (const [key, value] of Object.entries(data)) {
          const valueStr = typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' ? String(value).toLowerCase() : '';
          const keyMatches = selectedKeys.size === 0 || selectedKeys.has(key);
          const textMatches = !debouncedSearchText || valueStr.includes(debouncedSearchText) || key.toLowerCase().includes(debouncedSearchText);

          if (keyMatches && textMatches) {
            matchFound = true;
            filteredObject[key] = value;
          } else if (typeof value === 'object' && value !== null) {
            const nestedMatch = applyFilters(value);
            if (nestedMatch) {
              matchFound = true;
              filteredObject[key] = nestedMatch;
            }
          }
        }
        return matchFound ? filteredObject : null;
      }
      return null;
    };

    const filteredResult = applyFilters(jsonData);
    onFilterUpdate(filteredResult);
  }, [jsonData, selectedKeys, debouncedSearchText, onFilterUpdate]);

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedKeys(new Set());
    setSearchText("");
  };

  return (
    <View>
      <View style={styles.filterContainer}>
        <ToggleApiInfoButton />

        {/* MultiSelectPicker Component */}
        <MultiSelectPicker
          options={allKeys}
          selectedOptions={selectedKeys}
          onChange={setSelectedKeys}
          label="Filter by key"
        />

        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor={colors.textPrimary}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Display selected filters with clear button */}
      {selectedKeys.size > 0 && (
        <View style={styles.activeFiltersContainer}>
          {Array.from(selectedKeys).map((key) => (
            <TouchableOpacity key={key} onPress={() => setSelectedKeys((prev) => new Set([...prev].filter((k) => k !== key)))} style={styles.filterChip}>
              <Text style={styles.filterChipText}>{key} ✕</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity onPress={clearAllFilters} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear All Filters</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default FilterControls;
