import { TextInput, Text, View, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { isUrl, checkUrl, debounce } from '@/utils/utils';
import useIsRootScreen from '@/hooks/useIsRootScreen';
import { useStore } from '@/store/useStore';

const DebouncedTextInput: React.FC = () => {
  const inputValue = useStore((state) => state.inputValue);
  const error = useStore((state) => state.error);
  const setUrl = useStore((state) => state.setUrl);
  const debounceTime = 500; // ms
  const colors = useStore((state) => state.colors);
  const loading = useStore((state) => state.loading);
  const requestTimeout = 5000 // ms
  const isRoot = useIsRootScreen();

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
        inputTitle: {
          textAlign: 'center',
          fontSize: 48,
          fontWeight: 'bold',
          marginVertical: 8,
          color: colors.textPrimary,
          ...(!isRoot && { display: 'none' }),
        }
      }),
    [colors, isRoot]
  );

  const debouncedOnValueChange = useCallback(
    debounce((value: string) => {
      if (isUrl(value)) {
        checkUrl(value, requestTimeout);
      } else {
        if (!value) {
          useStore.setState({ url: value, jsonData: null });
        } else {
          useStore.setState({ error: 'Enter a valid HTTPS URL.' });
        }
      }
    }, debounceTime),
    [setUrl]
  );

  useEffect(() => {
    debouncedOnValueChange(inputValue);
  }, [inputValue, debouncedOnValueChange]);

  const handleChangeText = (text: string) => {
    useStore.setState({ inputValue: text });
    debouncedOnValueChange(text);
  };

  const handleClearInput = () => {
    useStore.setState({ inputValue: '', url: '', error: '', jsonData: null })
  };

  return (
    <View>
      <Text style={styles.inputTitle}>Dive into some open data:</Text>
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
        {inputValue && !loading ? (
          <Pressable onPress={handleClearInput} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>X</Text>
          </Pressable>
        ) : null}
        {loading ? (
          <ActivityIndicator size={50} color={colors.textPrimary} />
        ) : null}
      </View>
    </View>
  );
};

export default DebouncedTextInput;
