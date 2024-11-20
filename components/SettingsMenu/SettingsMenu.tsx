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

  const expandAll = useStore((state) => state.expandAll);
  const toggleExpandAll = useStore((state) => state.toggleExpandAll);

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
    if (expandAll) {
      toggleExpandAll();
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
          gap: 20
        },
        title: {
          fontSize: 20,
          fontWeight: 'bold',
          color: colors.textPrimary,
        },
        optionRowsContainer: {
          padding: 20,
          paddingTop: 40,
          maxWidth: 400,
          width: '100%',
          alignSelf: 'center',
        },
        optionRow: {
          marginBottom: 20,
        },
        toggleThumbWrapper: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%'
        },
        optionRowLabel: {
          color: colors.textPrimary,
          fontWeight: 'bold',
        },
        optionHelpText: {
          width: '100%',
          flex: 1,
          color: colors.textPrimary
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
        closeButton: { alignSelf: 'flex-end', backgroundColor: colors.textPrimary, paddingVertical: 4, paddingHorizontal: 12, borderRadius: 4, marginRight: 8, marginBottom: 8 },
        closeButtonText: { color: colors.background, fontSize: 16, fontWeight: 'bold' },
        hr: { borderBottomWidth: 2, borderBottomColor: colors.accent, marginVertical: 18 },
      }),
    [colors, darkMode]
  );

  return (
    <Modal visible={modalOpen} onRequestClose={toggleModal}>
      <View style={styles.modalOverlay}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.optionRowsContainer}>
          <View style={styles.optionRow}>
            <View style={styles.toggleThumbWrapper}>
              <Text style={styles.optionRowLabel}>Dark mode</Text>
              <ToggleThumb onPress={toggleDarkMode} isOn={darkMode} />
            </View>
          </View>

          <View style={styles.hr} />

          <View style={styles.optionRow}>
            <ColorPickerSection
              label="Custom background color"
              colorValue={customBackgroundColor}
              setColorValue={setCustomBackgroundColor}
              customColorOn={customBackgroundColorOn}
              toggleCustomColorOn={toggleCustomBackgroundColorOn}
            />
          </View>

          <View style={styles.hr} />

          <View style={styles.optionRow}>
            <ColorPickerSection
              label="Custom accent color"
              colorValue={customAccentColor}
              setColorValue={setCustomAccentColor}
              customColorOn={customAccentColorOn}
              toggleCustomColorOn={toggleCustomAccentColorOn}
            />
          </View>

          <View style={styles.hr} />

          <View style={styles.optionRow}>
            <View style={styles.toggleThumbWrapper}>
              <Text style={styles.optionRowLabel}>Background animation</Text>
              <ToggleThumb onPress={() => setBackgroundAnimation(!backgroundAnimation)} isOn={backgroundAnimation} />
            </View>
            <Text style={styles.optionHelpText}>
              Turn the background animation on or off.
            </Text>
          </View>

          <View style={styles.hr} />

          <View style={styles.optionRow}>
            <View style={styles.toggleThumbWrapper}>
              <Text style={styles.optionRowLabel}>Hide empty rows</Text>
              <ToggleThumb onPress={toggleHideEmptyRows} isOn={hideEmptyRows} />
            </View>
            <Text style={styles.optionHelpText}>
              Hide rows in the JSON with empty values.
            </Text>
          </View>

          <View style={styles.hr} />

          <View style={styles.optionRow}>
            <View style={styles.toggleThumbWrapper}>
              <Text style={styles.optionRowLabel}>Expand nested rows</Text>
              <ToggleThumb onPress={toggleExpandAll} isOn={expandAll} />
            </View>
            <Text style={styles.optionHelpText}>
              Expand nested JSON rows by default.
            </Text>
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
