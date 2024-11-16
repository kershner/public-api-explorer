import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { checkUrl, extractKeys, isUrl } from '@/utils/utils';
import { useStore } from '@/store/useStore';

interface ApiQueryModalProps {
  onClose: () => void;
  url: string;
  jsonData?: unknown;
}

const ApiQueryModal: React.FC<ApiQueryModalProps> = ({ onClose, url = '', jsonData }) => {
  const [query, setQuery] = useState(url);
  const colors = useStore((state) => state.colors);
  const validQuery = query !== url && isUrl(query);
  const [jsonKeys, setjsonKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [manualKeys, setManualKeys] = useState<string[]>(['page', 'limit', 'sort', 'order', 'q', 'search']);
  const [selectedManualKeys, setSelectedManualKeys] = useState<Set<string>>(new Set());

  const onSave = () => {
    if (validQuery) {
      checkUrl(query);
      onClose();
    }
  };

  // Extract keys from `jsonData` and set `jsonKeys`
  useEffect(() => {
    if (jsonData) {
      const keysSet = new Set<string>();
      extractKeys(jsonData, keysSet);
      setjsonKeys(Array.from(keysSet).sort());
    }
  }, [jsonData]);

  // Pre-select keys based on the existing query string
  useEffect(() => {
    try {
      const queryUrl = new URL(query); // Attempt to parse the URL
      const params = new Set<string>();
      queryUrl.searchParams.forEach((_value, key) => {
        params.add(key);
      });
      setSelectedKeys(params);
      setSelectedManualKeys(new Set([...params].filter((key) => manualKeys.includes(key))));
    } catch (error) {
      // If the URL is invalid, do nothing
      console.warn(`Invalid URL: ${query}`);
    }
  }, [query, manualKeys]);
  
  const toggleKey = (key: string, isManual = false) => {
    const stateToUpdate = isManual ? setSelectedManualKeys : setSelectedKeys;

    stateToUpdate((prevSelected) => {
      const newSelected = new Set(prevSelected);
      const queryUrl = new URL(query);

      if (newSelected.has(key)) {
        newSelected.delete(key);
        queryUrl.searchParams.delete(key);
      } else {
        newSelected.add(key);
        queryUrl.searchParams.append(key, '');
      }

      setQuery(queryUrl.toString());
      return newSelected;
    });
  };

  const styles = useMemo(() =>
    StyleSheet.create({
      modalContainer: { width: '90%', maxWidth: 600, padding: 20, backgroundColor: colors.background, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 8, alignSelf: 'center' },
      hr: { borderBottomWidth: 1, borderBottomColor: colors.accent, marginVertical: 10 },
      title: { fontSize: 24, fontWeight: '600', color: colors.textPrimary, marginBottom: 4, textAlign: 'center' },
      textInput: { cursor: 'auto', borderWidth: 2, borderColor: colors.textPrimary, backgroundColor: colors.background, padding: 12, borderRadius: 8, fontSize: 16, color: colors.textPrimary, marginBottom: 10 },
      labelHeader: { fontSize: 18, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
      labelDescription: { fontSize: 14, color: colors.textPrimary },
      jsonKeysContainer: { maxHeight: 150 },
      keysScrollView: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
      descriptionContainer: { width: '100%' },
      keyContainerDescription: { fontSize: 14, color: colors.textPrimary },
      keyButton: { paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderRadius: 20, alignSelf: 'flex-start', borderColor: colors.border },
      keyButtonSelected: { backgroundColor: colors.accent, borderColor: colors.accent },
      keyButtonUnselected: { backgroundColor: colors.background, borderColor: colors.border },
      keyButtonText: { fontSize: 11, fontWeight: '500', color: colors.textPrimary },
      buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
      button: { flex: 1, marginHorizontal: 5, paddingVertical: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accent },
      buttonDisabled: { opacity: 0.5 },
      buttonText: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
      closeButton: { alignSelf: 'flex-end', backgroundColor: colors.textPrimary, paddingVertical: 4, paddingHorizontal: 12, borderRadius: 4, marginRight: 8, marginBottom: 8 },
      closeButtonText: { color: colors.background, fontSize: 16, fontWeight: 'bold' },
    }), [colors]);

  return (
    <Pressable style={styles.modalContainer}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>

      <ScrollView>
        <Text style={styles.title}>Customize Your Query</Text>
        <TextInput
          style={styles.textInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Enter a public API endpoint..."
          placeholderTextColor={colors.textPrimary}
        />
        
        {validQuery && (
          <Text style={styles.labelHeader}>Add Query Parameters</Text>
        )}
        
        {/* JSON Keys */}
        {jsonKeys.length > 0 && validQuery && (
          <View style={styles.jsonKeysContainer}>
            <ScrollView contentContainerStyle={styles.keysScrollView}>
              <View style={styles.descriptionContainer}>
                <Text style={styles.keyContainerDescription}>
                  These keys are present in the response but are not guaranteed as valid parameters
                </Text>
              </View>
              {jsonKeys.map((key) => (
                <Pressable
                  key={key}
                  style={[
                    styles.keyButton,
                    selectedKeys.has(key)
                      ? styles.keyButtonSelected
                      : styles.keyButtonUnselected,
                  ]}
                  onPress={() => toggleKey(key)}
                >
                  <Text style={styles.keyButtonText}>{key}</Text>
                </Pressable>
              ))}
            </ScrollView>
            
            <View style={styles.hr} />
        </View>
        )}
      
        {/* Manual Keys Section */}
        {validQuery && (
          <View style={styles.jsonKeysContainer}>
          <ScrollView contentContainerStyle={styles.keysScrollView}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.keyContainerDescription}>
                Common API parameters
              </Text>
            </View>
            {manualKeys.map((key) => (
              <Pressable
                key={key}
                style={[
                  styles.keyButton,
                  selectedManualKeys.has(key)
                    ? styles.keyButtonSelected
                    : styles.keyButtonUnselected,
                ]}
                onPress={() => toggleKey(key, true)}
              >
                <Text style={styles.keyButtonText}>{key}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        )}
        

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, !validQuery && styles.buttonDisabled]}
            onPress={onSave}
            disabled={!validQuery}
          >
            <Text style={styles.buttonText}>Explore</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Pressable>
  );
};

export default ApiQueryModal;
