import ReanimatedColorPicker, { HueSlider, BrightnessSlider } from 'reanimated-color-picker';
import React, { useMemo, useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ToggleThumb from '@/components/ToggleThumb';
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
  const colors = useStore((state) => state.colors);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [localColor, setLocalColor] = useState(colorValue);

  const throttledSetColorValue = (color: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setColorValue(color), 100);
  };

  const handleColorChange = (color) => {
    const newColor = color.hex.toUpperCase();
    setLocalColor(newColor);

    if (customColorOn) {
      throttledSetColorValue(newColor);
    }
  };

  useEffect(() => {
    setLocalColor(colorValue);
  }, [colorValue]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
        labelText: {
          fontWeight: 'bold',
          color: colors.textPrimary,
          marginBottom: 8,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        disabledRow: {
          pointerEvents: 'none',
          opacity: 0.2,
        },
        colorPicker: {
          marginTop: 10,
          flex: 1,
        },
        hueSlider: {
          height: 40,
          marginBottom: 8,
        },
        brightnessSlider: {
          height: 40,
        },
      }),
    [colors, customColorOn]
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.labelText}>{label}</Text>
        <ToggleThumb onPress={toggleCustomColorOn} isOn={customColorOn} />
      </View>

      <View style={[styles.row, !customColorOn && styles.disabledRow]}>
        <ReanimatedColorPicker value={localColor} onChange={handleColorChange} style={styles.colorPicker}>
          <HueSlider style={styles.hueSlider} />
          <BrightnessSlider style={styles.brightnessSlider} />
        </ReanimatedColorPicker>
      </View>
    </View>
  );
};

export default ColorPickerSection;
