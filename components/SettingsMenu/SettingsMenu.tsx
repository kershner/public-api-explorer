import { View, Modal, Text, Switch, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import ColorPickerSection from '@/components/SettingsMenu/ColorPickerSection';
import React, { useMemo, useCallback, useState } from 'react';
import { defaultState, useStore } from '@/store/useStore';
import { Ionicons } from '@expo/vector-icons';

const SettingsMenu: React.FC = () => {
  const modalOpen = useStore((state) => state.modalOpen);
  const setModalOpen = useStore((state) => state.setModalOpen);
  const toggleModal = useCallback(() => setModalOpen(!modalOpen), [modalOpen, setModalOpen]);

  const colors = useStore((state) => state.colors);
  const darkMode = useStore((state) => state.darkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);

  const customBackgroundColor = useStore((state) => state.customBackgroundColor);
  const setCustomBackgroundColor = useStore((state) => state.setCustomBackgroundColor);
  const customBackgroundColorOn = useStore((state) => state.customBackgroundColorOn);
  const toggleCustomBackgroundColorOn = useStore((state) => state.toggleCustomBackgroundColorOn);

  const customAccentColor = useStore((state) => state.customAccentColor);
  const setCustomAccentColor = useStore((state) => state.setCustomAccentColor);
  const customAccentColorOn = useStore((state) => state.customAccentColorOn);
  const toggleCustomAccentColorOn = useStore((state) => state.toggleCustomAccentColorOn);

  const backgroundAnimation = useStore((state) => state.backgroundAnimation);
  const setBackgroundAnimation = useStore((state) => state.setBackgroundAnimation);

  const resetSettings = () => {
    setCustomBackgroundColor(useStore.getState().customBackgroundColor);
    setCustomAccentColor(useStore.getState().customAccentColor);
    if (customBackgroundColorOn) {
      toggleCustomBackgroundColorOn();
    }
    if (customAccentColorOn) {
      toggleCustomAccentColorOn();
    }
    if (!darkMode) {
      toggleDarkMode();
    }
  };

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
        },
        resetButton: {
          marginTop: 20,
          padding: 10,
          backgroundColor: colors.accent,
          borderRadius: 5,
          alignItems: 'center',
        },
        resetButtonText: {
          color: colors.textPrimary,
          fontWeight: 'bold',
        },
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

          <View style={styles.optionRow}>
            <Text style={{ color: colors.textPrimary }}>Background animation</Text>
            <Switch value={backgroundAnimation} onValueChange={setBackgroundAnimation} />
          </View>

          <TouchableOpacity style={styles.resetButton} onPress={resetSettings}>
            <Text style={styles.resetButtonText}>Back to Default</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SettingsMenu;
