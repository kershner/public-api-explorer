import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { useStore } from '@/store/useStore';
import React, { useMemo, useState } from 'react';

interface ApiQueryModalProps {
  onClose: () => void;
  url: string;
}

const ApiQueryModal: React.FC<ApiQueryModalProps> = ({ onClose, url }) => {
  const [query, setQuery] = useState(url); // Initialize input with the URL
  const colors = useStore((state) => state.colors);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        modalContainer: {
          width: '90%',
          maxWidth: 400,
          padding: 20,
          backgroundColor: colors.background,
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 8,
          alignSelf: 'center',
        },
        title: {
          fontSize: 24,
          fontWeight: '600',
          color: colors.textPrimary,
          marginBottom: 20,
        },
        textInput: {
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.background,
          padding: 12,
          borderRadius: 8,
          fontSize: 16,
          color: colors.textPrimary,
          marginBottom: 20,
        },
        buttonContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        button: {
          flex: 1,
          marginHorizontal: 5,
          paddingVertical: 12,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.accent,
        },
        buttonText: {
          fontSize: 16,
          fontWeight: '600',
          color: colors.textPrimary,
        },
      }),
    [colors]
  );

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.title}>Customize Your Query</Text>
      <TextInput
        style={styles.textInput}
        value={query} // Set the initial value to the provided URL
        onChangeText={setQuery} // Update state on input change
        placeholder="Enter API query"
        placeholderTextColor={colors.textPrimary}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            // You can handle saving the query here if needed
            onClose();
          }}
        >
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ApiQueryModal;
