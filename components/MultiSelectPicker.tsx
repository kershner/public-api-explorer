import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { useStore } from '@/store/useStore';
import React, { useState } from 'react';

interface MultiSelectPickerProps {
  options: string[];
  selectedOptions: Set<string>;
  onChange: (selected: Set<string>) => void;
  label?: string;
}

const MultiSelectPicker: React.FC<MultiSelectPickerProps> = ({
  options,
  selectedOptions,
  onChange,
  label,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const colors = useStore((state) => state.colors);
  const placeHolderText = label ? label : 'Select options';

  const toggleOption = (option: string) => {
    const updatedSelection = new Set(selectedOptions);
    updatedSelection.has(option) ? updatedSelection.delete(option) : updatedSelection.add(option);
    onChange(updatedSelection);
  };

  const styles = StyleSheet.create({
    wrapper: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    label: { color: colors.textPrimary, fontWeight: 'bold', marginBottom: 4 },
    trigger: { height: 40, borderWidth: 2, borderRadius: 4, justifyContent: 'center', paddingHorizontal: 8, backgroundColor: colors.background, borderColor: colors.textPrimary },
    triggerText: { color: colors.textPrimary },
    modalHeader: { fontSize: 18, padding: 12, backgroundColor: colors.textPrimary, color: colors.background, borderTopLeftRadius: 8, borderTopRightRadius: 8 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center' },
    modalContent: { maxHeight: '50%', width: 400, margin: 20, backgroundColor: colors.background, borderRadius: 8, alignSelf: 'center' },
    scrollView: { padding: 12 },
    optionText: { color: colors.textPrimary, fontSize: 16, paddingVertical: 8 },
    selectedOptionText: { fontWeight: 'bold' },
  });

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.trigger} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.triggerText}>
          {selectedOptions.size > 0 ? `Selected (${selectedOptions.size})` : placeHolderText}
        </Text>
      </TouchableOpacity>
      <Modal transparent visible={isModalVisible}>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>{placeHolderText}</Text>
            <ScrollView style={styles.scrollView}>
              {options.map((option) => (
                <TouchableOpacity key={option} onPress={() => toggleOption(option)}>
                  <Text style={[styles.optionText, selectedOptions.has(option) && styles.selectedOptionText]}>
                    {selectedOptions.has(option) ? '✓ ' : ''}{option}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default MultiSelectPicker;
