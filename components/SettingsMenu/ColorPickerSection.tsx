import ReanimatedColorPicker, { HueSlider, SaturationSlider, BrightnessSlider } from 'reanimated-color-picker';
import { View, Text, Switch, StyleSheet, TextInput } from 'react-native';
import React, { useMemo, useCallback, useState } from 'react';
import { useStore } from '@/store/useStore';

interface ColorPickerSectionProps {
  label: string;
  colorValue: string;
  setColorValue: (color: string) => void;
  customColorOn: boolean;
  toggleCustomColorOn: () => void;
}

const ColorPickerSection: React.FC<ColorPickerSectionProps> = ({
  label,
  colorValue,
  setColorValue,
  customColorOn,
  toggleCustomColorOn,
}) => {
  const [localColor, setLocalColor] = useState(colorValue);
  const colors = useStore((state) => state.colors);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        optionRow: {
          marginBottom: 16,
        },
        colorPicker: {
          marginTop: 10,
        },
        hexInput: {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 4,
          padding: 8,
          color: colors.textPrimary,
          marginTop: 8,
        },
      }),
    [colors]
  );

  const handleColorChange = useCallback(
    (color: string) => {
      setLocalColor(color);
      if (customColorOn) setColorValue(color);
    },
    [customColorOn, setColorValue]
  );

  const handleHexInputChange = (color: string) => {
    setLocalColor(color);
    if (customColorOn) setColorValue(color);
  };

  return (
    <View style={styles.optionRow}>
      <Text style={{ color: colors.textPrimary }}>{label}</Text>
      <Switch value={customColorOn} onValueChange={toggleCustomColorOn} />
      <ReanimatedColorPicker
        value={localColor}
        onChange={(color) => handleColorChange(color.hex)}
        style={styles.colorPicker}
      >
        <HueSlider />
        <SaturationSlider />
        <BrightnessSlider />
      </ReanimatedColorPicker>
      <TextInput
        style={styles.hexInput}
        value={localColor}
        onChangeText={handleHexInputChange}
        placeholder="#RRGGBB"
        maxLength={7}
      />
    </View>
  );
};

export default ColorPickerSection;