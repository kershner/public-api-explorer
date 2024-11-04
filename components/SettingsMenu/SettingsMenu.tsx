import { View, Modal, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import ColorPickerSection from '@/components/SettingsMenu/ColorPickerSection';
import React, { useMemo, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '@/store/useStore';

const SettingsMenu: React.FC = () => {
  const modalOpen = useStore((state) => state.modalOpen);
  const setModalOpen = useStore((state) => state.setModalOpen);
  const toggleModal = useCallback(() => setModalOpen(!modalOpen), [modalOpen, setModalOpen]);

  const colors = useStore((state) => state.colors);
  const darkMode = useStore((state) => state.darkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);

  // Zustand store properties for color settings
  const customBackgroundColor = useStore((state) => state.customBackgroundColor);
  const setCustomBackgroundColor = useStore((state) => state.setCustomBackgroundColor);
  const customBackgroundColorOn = useStore((state) => state.customBackgroundColorOn);
  const toggleCustomBackgroundColorOn = useStore((state) => state.toggleCustomBackgroundColorOn);

  const customAccentColor = useStore((state) => state.customAccentColor);
  const setCustomAccentColor = useStore((state) => state.setCustomAccentColor);
  const customAccentColorOn = useStore((state) => state.customAccentColorOn);
  const toggleCustomAccentColorOn = useStore((state) => state.toggleCustomAccentColorOn);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        modalOverlay: {
          flex: 1,
          backgroundColor: colors.background,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomColor: colors.textPrimary,
          borderBottomWidth: 1,
        },
        title: {
          fontSize: 20,
          fontWeight: 'bold',
          color: colors.textPrimary,
        },
        optionRowsContainer: {
          padding: 16,
          width: 400,
          alignSelf: 'center',
        },
        optionRow: {
          marginBottom: 16,
        }
      }),
    [colors]
  );

  return (
    <Modal visible={modalOpen} onRequestClose={toggleModal}>
      <View style={styles.modalOverlay}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Ionicons name="close" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.optionRowsContainer}>
          <View style={styles.optionRow}>
            <Text style={{ color: colors.textPrimary }}>Dark mode</Text>
            <Switch value={darkMode} onValueChange={toggleDarkMode} />
          </View>

          {/* Color Picker Sections */}
          <ColorPickerSection
            label="Custom background color"
            colorValue={customBackgroundColor}
            setColorValue={setCustomBackgroundColor}
            customColorOn={customBackgroundColorOn}
            toggleCustomColorOn={toggleCustomBackgroundColorOn}
          />

          <ColorPickerSection
            label="Custom accent color"
            colorValue={customAccentColor}
            setColorValue={setCustomAccentColor}
            customColorOn={customAccentColorOn}
            toggleCustomColorOn={toggleCustomAccentColorOn}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SettingsMenu;
