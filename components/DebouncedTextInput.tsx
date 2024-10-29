import { isUrl, checkUrl, setError, debounce } from '@/utils/utils';
import { TextInput, Text, View, StyleSheet, Pressable } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useStore } from '@/store/useStore';

const DebouncedTextInput: React.FC = () => {
  const inputValue = useStore((state) => state.inputValue);
  const setInputValue = useStore((state) => state.setInputValue);
  const error = useStore((state) => state.error);
  const setCurrentUrl = useStore((state) => state.setCurrentUrl);
  const setJsonData = useStore((state) => state.setJsonData);
  const debounceTime = 500; // ms
  const colors = useStore((state) => state.colors);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        inputContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: colors.textPrimary,
          borderRadius: 5,
          backgroundColor: colors.background,
        },
        input: {
          flex: 1,
          padding: 10,
          fontSize: 26,
          color: colors.textPrimary,
        },
        clearButton: {
          paddingHorizontal: 15,
          justifyContent: 'center',
          height: '100%',
          backgroundColor: colors.accent,
        },
        clearButtonText: {
          fontSize: 22,
          color: colors.textPrimary,
          fontWeight: 'bold'
        },
        error: {
          paddingVertical: 6,
          color: colors.error,
        },
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
          setError('Enter a valid HTTPS URL.');
        }
      }
    }, debounceTime),
    [setCurrentUrl]
  );

  useEffect(() => {
    debouncedOnValueChange(inputValue);
  }, [inputValue, debouncedOnValueChange]);

  const handleChangeText = (text: string) => {
    setInputValue(text);
    debouncedOnValueChange(text);
  };

  const handleClearInput = () => {
    setInputValue('');
    setCurrentUrl('');
    setError('');
    setJsonData(null);
  };

  return (
    <View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a public API endpoint..."
          keyboardType="url"
          value={inputValue}
          onChangeText={handleChangeText}
          placeholderTextColor={colors.textPrimary}
        />
        {inputValue ? (
          <Pressable onPress={handleClearInput} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>X</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

export default DebouncedTextInput;
