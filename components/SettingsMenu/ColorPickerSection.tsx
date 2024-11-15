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

    throttledSetColorValue(newColor);
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
        colorPicker: {
          marginTop: 10,
          flex: 1,
        },
        sliderWrapper: {
          marginBottom: 10
        },
        sliderLabel: {
          color: colors.textPrimary,
          marginBottom: 4
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

      <View style={styles.row}>
        <ReanimatedColorPicker value={localColor} onChange={handleColorChange} style={styles.colorPicker}>
          <View style={styles.sliderWrapper}>
            <Text style={styles.sliderLabel}>Hue:</Text>
            <HueSlider />
          </View>
          
          <View style={styles.sliderWrapper}>
            <Text style={styles.sliderLabel}>Brightness:</Text>
            <BrightnessSlider />
          </View>
        </ReanimatedColorPicker>
      </View>
    </View>
  );
};

export default ColorPickerSection;
