import { View, Modal, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import ReanimatedColorPicker, { HueSlider } from 'reanimated-color-picker';
import React, { useMemo, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '@/store/useStore';

interface OptionRowProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

interface ColorPickerRowProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

const SettingsMenu: React.FC = () => {
  const modalOpen = useStore((state) => state.modalOpen);
  const setModalOpen = useStore((state) => state.setModalOpen);
  const toggleModal = useCallback(() => setModalOpen(!modalOpen), [modalOpen, setModalOpen]);

  const colors = useStore((state) => state.colors);
  const darkMode = useStore((state) => state.darkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);

  const customTheme = useStore((state) => state.customTheme);
  const toggleCustomTheme = useStore((state) => state.toggleCustomTheme);

  const customBackgroundColor = useStore((state) => state.customBackgroundColor);
  const setCustomBackgroundColor = useStore((state) => state.setCustomBackgroundColor);
  const customAccentColor = useStore((state) => state.customAccentColor);
  const setCustomAccentColor = useStore((state) => state.setCustomAccentColor);
  const customBorderColor = useStore((state) => state.customBorderColor);
  const setCustomBorderColor = useStore((state) => state.setCustomBorderColor);

  const colorSettings = useMemo(
    () => [
      { label: 'Background Color', value: customBackgroundColor, onChange: setCustomBackgroundColor },
      { label: 'Accent Color', value: customAccentColor, onChange: setCustomAccentColor },
      { label: 'Border Color', value: customBorderColor, onChange: setCustomBorderColor },
    ],
    [customBackgroundColor, setCustomBackgroundColor, customAccentColor, setCustomAccentColor, customBorderColor, setCustomBorderColor]
  );

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
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
        },
        title: {
          fontSize: 20,
          fontWeight: 'bold',
          color: colors.textPrimary,
        },
        optionRowsContainer: {
          padding: 16,
          width: '20%',
          alignSelf: 'center',
        },
        optionRow: {
          marginBottom: 16,
        },
        colorPicker: {
          marginTop: 10,
        },
        disabledOption: {
          pointerEvents: 'none',
          opacity: 0.5,
        },
      }),
    [colors]
  );

  const OptionRow: React.FC<OptionRowProps> = useCallback(
    ({ label, value, onValueChange, disabled = false }) => (
      <View style={[styles.optionRow, disabled ? styles.disabledOption : null]}>
        <Text style={{ color: colors.textPrimary }}>{label}</Text>
        <Switch value={value} onValueChange={onValueChange} />
      </View>
    ),
    [styles, colors.textPrimary]
  );

  const ColorPickerRow: React.FC<ColorPickerRowProps> = useCallback(
    ({ label, value, onChange }) => (
      <View style={styles.optionRow}>
        <Text style={{ color: colors.textPrimary }}>{label}</Text>
        <ReanimatedColorPicker value={value} onChange={(color) => onChange(color.hex)} style={styles.colorPicker}>
          <HueSlider />
        </ReanimatedColorPicker>
      </View>
    ),
    [styles, colors.textPrimary]
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
          <OptionRow label="Dark mode" value={darkMode} onValueChange={toggleDarkMode} disabled={customTheme} />
          <OptionRow label="Custom theme" value={customTheme} onValueChange={toggleCustomTheme} />

          {colorSettings.map((setting, index) => (
            <ColorPickerRow key={index} label={setting.label} value={setting.value} onChange={setting.onChange} />
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default SettingsMenu;
