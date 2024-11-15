import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import ToggleApiInfoButton from '@/components/JsonViewer/TopDrawer/ToggleApiInfoButton';
import React, { useState, useEffect, useCallback } from 'react';
import { ThemeColors, useStore } from '@/store/useStore';

interface FilterControlsProps {
  jsonData: unknown;
  onFilterUpdate: (filteredData: unknown) => void;
  colors: ThemeColors;
}

const FilterControls: React.FC<FilterControlsProps> = ({ jsonData, onFilterUpdate, colors }) => {
  const [allKeys, setAllKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>("");
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const currentApiExpanded = useStore((state) => state.currentApiExpanded);

  // Styles, with repeated color properties removed for brevity
  const styles = StyleSheet.create({
    rowAboveFilter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
    filterLabel: { fontSize: 16, fontWeight: 'bold', marginBottom: 2, color: colors.textPrimary },
    filterContainer: { flexDirection: 'row', gap: 10, alignItems: 'center' },
    multiSelectContainer: { flex: 1, height: 40, borderWidth: 2, borderRadius: 4, padding: 8, justifyContent: 'center', backgroundColor: colors.background, borderColor: colors.textPrimary },
    keyFilterLabel: {fontWeight: 'bold', fontSize: 16, paddingBottom: 4, color: colors.textPrimary },
    input: { flex: 3, height: 40, borderWidth: 2, paddingLeft: 10, borderRadius: 4, color: colors.textPrimary, borderColor: colors.textPrimary, backgroundColor: colors.background },
    activeFiltersContainer: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: 3, marginVertical: 4 },
    filterChip: { backgroundColor: colors.textPrimary, paddingVertical: 4, paddingHorizontal: 14, borderRadius: 20 },
    filterChipText: { color: colors.background, fontWeight: 'bold', fontSize: 10 },
    clearButton: { backgroundColor: colors.accent, paddingVertical: 4, paddingHorizontal: 14, borderRadius: 20, alignSelf: 'flex-start' },
    clearButtonText: { color: colors.textPrimary, fontWeight: 'bold', fontSize: 10 },
    popoverOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
    popoverContent: { maxWidth: 300, width: '100%', maxHeight: '50%', backgroundColor: colors.background, borderRadius: 8, padding: 16 },
    closeButton: { backgroundColor: colors.textPrimary, padding: 8, borderRadius: 4, alignItems: 'center', marginTop: 16 },
    closeButtonText: { color: colors.background },
    optionText: { fontSize: 16 },
    selectedOptionText: { fontWeight: 'bold' }
  });

  // Extract unique keys from JSON data
  const extractKeys = useCallback((data: unknown, keys: Set<string>) => {
    if (Array.isArray(data)) {
      data.forEach((item) => extractKeys(item, keys));
    } else if (data && typeof data === 'object') {
      Object.keys(data).forEach((key) => {
        if (isNaN(Number(key))) keys.add(key);
        extractKeys((data as Record<string, unknown>)[key], keys);
      });
    }
  }, []);

  // Set allKeys by extracting unique keys when jsonData changes
  useEffect(() => {
    if (jsonData) {
      const keysSet = new Set<string>();
      extractKeys(jsonData, keysSet);
      setAllKeys(Array.from(keysSet).sort());
    }
  }, [jsonData, extractKeys]);

  // Debounce searchText to avoid excessive re-renders
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

  // Toggle selection of a key in selectedKeys
  const toggleKeySelection = (key: string) => {
    setSelectedKeys((prevKeys) => {
      const updatedKeys = new Set(prevKeys);
      updatedKeys.has(key) ? updatedKeys.delete(key) : updatedKeys.add(key);
      return updatedKeys;
    });
  };

  // Clear all selected keys and reset search text
  const clearAllFilters = () => {
    setSelectedKeys(new Set());
    setSearchText("");
  };

  return (
    <View>
      <View style={styles.rowAboveFilter}>
        <Text style={styles.filterLabel}>Filter by:</Text>
        {!currentApiExpanded && <ToggleApiInfoButton />}
      </View>
      <View style={styles.filterContainer}>
        {/* Multi-select trigger */}
        <TouchableOpacity style={styles.multiSelectContainer} onPress={() => setIsPopoverVisible(true)}>
          <Text style={{ color: colors.textPrimary }}>
            {selectedKeys.size > 0 ? `Selected (${selectedKeys.size})` : "Select Keys"}
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Display selected filters with clear button */}
      <View style={styles.activeFiltersContainer}>
        {Array.from(selectedKeys).map((key) => (
          <TouchableOpacity key={key} onPress={() => toggleKeySelection(key)} style={styles.filterChip}>
            <Text style={styles.filterChipText}>{key} ✕</Text>
          </TouchableOpacity>
        ))}
        
        {selectedKeys.size > 0 && (
          <TouchableOpacity onPress={clearAllFilters} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear All Filters</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Popover Modal */}
      <Modal transparent visible={isPopoverVisible} animationType="none">
        <TouchableOpacity style={styles.popoverOverlay} onPress={() => setIsPopoverVisible(false)}>
          <View style={styles.popoverContent}>
            <Text style={styles.keyFilterLabel}>Filter by key:</Text>
            <ScrollView>
              {allKeys.map((key) => (
                <TouchableOpacity key={key} onPress={() => toggleKeySelection(key)}>
                  <Text
                    style={[
                      styles.optionText,
                      selectedKeys.has(key) ? styles.selectedOptionText : styles.unselectedOptionText,
                    ]}
                  >
                    {selectedKeys.has(key) ? '✓ ' : ''}{key}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setIsPopoverVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default FilterControls;
