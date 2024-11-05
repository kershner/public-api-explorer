import ReanimatedColorPicker, { HueSlider } from 'reanimated-color-picker';
import { View, Text, Switch, StyleSheet } from 'react-native';
import React, { useMemo, useEffect, useState, useRef } from 'react';
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
  const [localColor, setLocalColor] = useState(
    colorValue === '#FFFFFF' ? '#FF0000' : colorValue
  );
  const colors = useStore((state) => state.colors);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Custom throttled function to update the global state
  const throttledSetColorValue = (color: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setColorValue(color);
    }, 100); // Throttle every 100ms
  };

  useEffect(() => {
    if (colorValue !== localColor && colorValue !== '#FFFFFF') {
      setLocalColor(colorValue);
    }
  }, [colorValue]);

  useEffect(() => {
    if (customColorOn && localColor !== colorValue) {
      throttledSetColorValue(localColor);
    }
  }, [localColor, customColorOn, colorValue]);

  const updateColor = (newColor: string) => {
    setLocalColor(newColor);
    if (customColorOn) {
      throttledSetColorValue(newColor);
    }
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { marginBottom: 16 },
        labelText: { color: colors.textPrimary, marginBottom: 8 },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        switch: { marginRight: 16 },
        colorPicker: { flex: 1 },
        slider: { width: '100%', height: 40 },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{label}</Text>
      <View style={styles.row}>
        <Switch
          value={customColorOn}
          onValueChange={toggleCustomColorOn}
          style={styles.switch}
        />
        <ReanimatedColorPicker
          value={localColor}
          onChange={(color) => updateColor(color.hex.toUpperCase())}
          style={styles.colorPicker}
        >
          <HueSlider style={styles.slider} />
        </ReanimatedColorPicker>
      </View>
    </View>
  );
};

export default ColorPickerSection;
