import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { checkUrl, isUrl } from '@/utils/utils';
import { useStore } from '@/store/useStore';

interface ApiQueryModalProps {
  onClose: () => void;
  url: string;
}

const ApiQueryModal: React.FC<ApiQueryModalProps> = ({ onClose, url }) => {
  const [query, setQuery] = useState(url);
  const colors = useStore((state) => state.colors);
  const validQuery = query !== url && isUrl(query);

  const onSave = () => {
    if (validQuery) {
      checkUrl(query);
      onClose();
    }
  };

  const styles = useMemo(() =>
    StyleSheet.create({
      modalContainer: { width: '90%', maxWidth: 600, padding: 20, backgroundColor: colors.background, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 8, alignSelf: 'center' },
      title: { fontSize: 24, fontWeight: '600', color: colors.textPrimary, marginBottom: 20, textAlign: 'center' },
      textInput: { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.background, padding: 12, borderRadius: 8, fontSize: 16, color: colors.textPrimary, marginBottom: 20 },
      buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
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
