import { TextInput, StyleSheet, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useStore } from '@/store/useStore';

interface SearchFilterProps<T> {
  data: T[];
  onFilter: (filteredData: T[]) => void;
}

const SearchFilter = <T,>({ data, onFilter }: SearchFilterProps<T>) => {
  const [searchText, setSearchText] = useState<string>('');
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>('');
  const colors = useStore((state) => state.colors);

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      marginVertical: 8,
    },
    input: {
      height: 40,
      borderWidth: 2,
      paddingLeft: 10,
      borderRadius: 4,
      color: colors.textPrimary,
      borderColor: colors.textPrimary,
      backgroundColor: colors.background,
    },
  });

  // Debounce the search text
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [searchText]);

  // Filter the data based on the debounced search text
  const handleFilter = useCallback(() => {
    const filteredData =
      debouncedSearchText === ''
        ? data // Pass original data if search text is empty
        : data.filter((item) => {
            const itemString = JSON.stringify(item).toLowerCase();
            return itemString.includes(debouncedSearchText.toLowerCase());
          });
    onFilter(filteredData);
  }, [debouncedSearchText, data, onFilter]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor={colors.textPrimary}
        value={searchText}
        autoCapitalize="none"
        onChangeText={setSearchText}
      />
    </View>
  );
};

export default SearchFilter;
