import { isUrl, checkUrl, setError, debounce } from '@/utils/utils';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useStore } from '@/store/useStore';

const DebouncedTextInput: React.FC = () => {
  const inputValue = useStore((state) => state.inputValue);
  const setInputValue = useStore((state) => state.setInputValue);
  const error = useStore((state) => state.error);
  const setCurrentUrl = useStore((state) => state.setCurrentUrl);
  const setJsonData = useStore((state) => state.setJsonData);
  const debounceTime = 500  // ms
  const colors = useStore((state) => state.colors);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        input: {
          borderWidth: 2,
          borderColor: colors.textPrimary,
          borderRadius: 5,
          padding: 10,
          fontSize: 26,
          color: colors.textPrimary,
          backgroundColor: colors.background,
        },
        error: {
          paddingVertical: 6,
          color: colors.error
        }
      }),
    [colors]
  );

  const debouncedOnValueChange = useCallback(
    debounce((value: string) => {
      if (isUrl(value)) {
        checkUrl(value).then((isValid) => {
          if (isValid) {
            setCurrentUrl(value);
          }
        });
      } else {
        if (!value) {
          setCurrentUrl('');
          setJsonData(null);
        } else {
          setError('Enter a valid HTTPS URL.')
        }
      }
    }, debounceTime),
    [setCurrentUrl]
  );

  // Call debouncedOnValueChange whenever inputValue changes
  useEffect(() => {
    debouncedOnValueChange(inputValue);
  }, [inputValue, debouncedOnValueChange]);

  const handleChangeText = (text: string) => {
    setInputValue(text);
    debouncedOnValueChange(text); // Trigger immediately while typing
  };

  return (
    <View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Enter a public API endpoint..."
        keyboardType="url"
        value={inputValue}
        onChangeText={handleChangeText}
        placeholderTextColor={colors.textPrimary}
      />
    </View>
  );
};

export default DebouncedTextInput;
