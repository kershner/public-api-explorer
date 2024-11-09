import { Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import RenderValuePopoverMenu from '@/components/PopoverMenu/RenderValuePopoverMenu';
import { isHtml, isUrl, isImageUrl } from '@/utils/utils';
import React, { useMemo, useState, useRef } from 'react';
import RenderHtml from 'react-native-render-html';
import { useStore } from '@/store/useStore';

const { width: screenWidth } = Dimensions.get('window');

interface RenderValueProps {
  value: string | number | boolean | object | null;
  label: string;
}

const RenderValue: React.FC<RenderValueProps> = ({ value, label }) => {
  const colors = useStore((state) => state.colors);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const valueRef = useRef(null); // Reference for positioning popover

  const styles = useMemo(
    () =>
      StyleSheet.create({
        value: {
          fontSize: 16,
          textAlign: 'left',
          maxWidth: 400,
          color: colors.textPrimary,
          borderWidth: 2,
          borderColor: isPopoverVisible ? colors.textPrimary : colors.background,
          borderRadius: 3,
        },
        link: {
          cursor: 'pointer',
          color: colors.linkText,
          textDecorationLine: 'underline',
          borderWidth: 2,
          borderColor: isPopoverVisible ? colors.textPrimary : colors.background,
        },
        image: {
          width: 100,
          height: 100,
          borderWidth: 2,
          borderColor: isPopoverVisible ? colors.textPrimary : colors.background,
        },
      }),
    [colors, isPopoverVisible]
  );

  const handlePress = () => {
    setIsPopoverVisible(true);
  };

  if (typeof value === 'string') {
    if (isHtml(value)) {
      return (
        <TouchableOpacity onPress={handlePress} ref={valueRef} style={styles.value}>
          <RenderHtml contentWidth={screenWidth} source={{ html: value }} tagsStyles={{ body: { color: colors.textPrimary } }} />
          <RenderValuePopoverMenu
            isVisible={isPopoverVisible}
            fromRef={valueRef}
            onClose={() => setIsPopoverVisible(false)}
            label={label}
            value={value}
          />
        </TouchableOpacity>
      );
    }
    if (isImageUrl(value)) {
      return (
        <TouchableOpacity onPress={handlePress} ref={valueRef}>
          <Image source={{ uri: value }} style={styles.image} resizeMode="contain" />
          <RenderValuePopoverMenu
            isVisible={isPopoverVisible}
            fromRef={valueRef}
            onClose={() => setIsPopoverVisible(false)}
            label={label}
            value={value}
          />
        </TouchableOpacity>
      );
    }
    if (isUrl(value)) {
      return (
        <TouchableOpacity onPress={handlePress} ref={valueRef}>
          <Text style={[styles.value, styles.link]}>{value}</Text>
          <RenderValuePopoverMenu
            isVisible={isPopoverVisible}
            fromRef={valueRef}
            onClose={() => setIsPopoverVisible(false)}
            label={label}
            value={value}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={handlePress} ref={valueRef}>
        <Text style={styles.value}>{value}</Text>
        <RenderValuePopoverMenu
          isVisible={isPopoverVisible}
          fromRef={valueRef}
          onClose={() => setIsPopoverVisible(false)}
          label={label}
          value={value}
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={handlePress} ref={valueRef}>
      <Text style={styles.value}>{value != null ? String(value) : ''}</Text>
      <RenderValuePopoverMenu
        isVisible={isPopoverVisible}
        fromRef={valueRef}
        onClose={() => setIsPopoverVisible(false)}
        label={label}
        value={value}
      />
    </TouchableOpacity>
  );
};

export default RenderValue;
