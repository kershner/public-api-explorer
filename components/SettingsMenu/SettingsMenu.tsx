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

  const requestTimeout = useStore((state) => state.requestTimeout);
  const setRequestTimeout = useStore((state) => state.setRequestTimeout);

  const [timeoutValue, setTimeoutValue] = useState<string>(requestTimeout.toString());
  const [validationMessage, setValidationMessage] = useState<string>('');

  const defaultRequestTimeout = defaultState.requestTimeout;
  const MIN_TIMEOUT = defaultRequestTimeout;
  const MAX_TIMEOUT = defaultRequestTimeout * 3;

  const handleTimeoutChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters

    setTimeoutValue(numericValue);

    if (numericValue === '') {
      setValidationMessage('');
      return;
    }

    const timeout = parseInt(numericValue, 10);
    if (!isNaN(timeout)) {
      if (timeout < MIN_TIMEOUT) {
        setValidationMessage(`Timeout must be at least ${MIN_TIMEOUT} ms.`);
      } else if (timeout > MAX_TIMEOUT) {
        setValidationMessage(`Timeout must be no more than ${MAX_TIMEOUT} ms.`);
      } else {
        setRequestTimeout(timeout);
        setValidationMessage('');
        return;
      }
    }
    setValidationMessage('Please enter a valid number.'); // Generic error for invalid input
  };

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
    setRequestTimeout(defaultRequestTimeout);
    setTimeoutValue(defaultRequestTimeout.toString());
    setValidationMessage('');
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
        timeoutInput: {
          height: 40,
          borderColor: colors.border,
          borderWidth: 1,
          color: colors.textPrimary,
          paddingHorizontal: 8,
        },
        validationMessage: {
          color: 'red',
          marginTop: 4,
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

          <View style={styles.optionRow}>
            <Text style={{ color: colors.textPrimary }}>Request timeout (ms)</Text>
            <TextInput
              style={styles.timeoutInput}
              keyboardType="numeric"
              value={timeoutValue}
              onChangeText={handleTimeoutChange}
              placeholder={`Min: ${MIN_TIMEOUT}, Max: ${MAX_TIMEOUT}`}
            />
            {validationMessage ? (
              <Text style={styles.validationMessage}>{validationMessage}</Text>
            ) : null}
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
