import { View, Modal, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ColorPickerSection from '@/components/SettingsMenu/ColorPickerSection';
import React, { useMemo, useCallback } from 'react';
import ToggleThumb from '@/components/ToggleThumb';
import { useStore } from '@/store/useStore';

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

  const hideEmptyRows = useStore((state) => state.hideEmptyRows);
  const toggleHideEmptyRows = useStore((state) => state.toggleHideEmptyRows);

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
    if (hideEmptyRows) {
      toggleHideEmptyRows();
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
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomColor: colors.textPrimary,
          borderBottomWidth: 1,
          gap: 20
        },
        title: {
          fontSize: 20,
          fontWeight: 'bold',
          color: colors.textPrimary,
        },
        optionRowsContainer: {
          padding: 20,
          maxWidth: 400,
          width: '100%',
          alignSelf: 'center',
        },
        optionRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
          paddingBottom: 20,
          borderBottomWidth: 2,
          borderColor: colors.accent,
        },
        optionRowLabel: {
          color: colors.textPrimary,
          fontWeight: 'bold',
        },
        resetButton: {
          marginTop: 20,
          padding: 10,
          backgroundColor: colors.textPrimary,
          borderRadius: 5,
          alignItems: 'center',
        },
        resetButtonText: {
          color: colors.background,
          fontWeight: 'bold',
        },
      }),
    [colors, darkMode]
  );

  return (
    <Modal visible={modalOpen} onRequestClose={toggleModal}>
      <View style={styles.modalOverlay}>
        <View style={styles.header}>
        <TouchableOpacity onPress={toggleModal}>
          <Text style={{ fontSize: 32,color: colors.textPrimary }}>←</Text>
        </TouchableOpacity>

          <Text style={styles.title}>Settings</Text>
        </View>

        <ScrollView contentContainerStyle={styles.optionRowsContainer}>
          <View style={styles.optionRow}>
            <Text style={styles.optionRowLabel}>Dark mode</Text>
            <ToggleThumb onPress={toggleDarkMode} isOn={darkMode} />
          </View>

          <View style={styles.optionRow}>
            <ColorPickerSection
              label="Custom background color"
              colorValue={customBackgroundColor}
              setColorValue={setCustomBackgroundColor}
              customColorOn={customBackgroundColorOn}
              toggleCustomColorOn={toggleCustomBackgroundColorOn}
            />
          </View>

          <View style={styles.optionRow}>
            <ColorPickerSection
              label="Custom accent color"
              colorValue={customAccentColor}
              setColorValue={setCustomAccentColor}
              customColorOn={customAccentColorOn}
              toggleCustomColorOn={toggleCustomAccentColorOn}
            />
          </View>

          <View style={styles.optionRow}>
            <Text style={styles.optionRowLabel}>Background animation</Text>
            <ToggleThumb onPress={() => setBackgroundAnimation(!backgroundAnimation)} isOn={backgroundAnimation} />
          </View>

          <View style={styles.optionRow}>
            <Text style={styles.optionRowLabel}>Hide Empty Rows</Text>
            <ToggleThumb onPress={toggleHideEmptyRows} isOn={hideEmptyRows} />
          </View>

          <TouchableOpacity style={styles.resetButton} onPress={resetSettings}>
            <Text style={styles.resetButtonText}>Back to Default</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SettingsMenu;
