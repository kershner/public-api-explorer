import { Dimensions, StyleSheet, Animated, Easing, Text } from 'react-native';
import React, { useEffect, useRef, useMemo } from 'react';
import { useStore } from '@/store/useStore';

interface IconGridProps {
  iconSize?: number;
}

const FloatingIconGrid: React.FC<IconGridProps> = ({ iconSize = 48 }) => {
  const colors = useStore((state) => state.colors);
  const { width, height } = Dimensions.get('window');
  const numColumns = Math.floor(width / iconSize);
  const numRows = Math.floor(height / iconSize) + 2;
  const totalIcons = numColumns * numRows;
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const animDuration = 80000;

  // List of known colored emojis to exclude
  const knownColoredEmojis = new Set([
    'U+1F6F7', 'U+1F6F8', 'U+1F6F9', 'U+1F6FA', // Transport and vehicle emojis
    'U+1F6D5',                                  // Hindu temple
    'U+1F63B', 'U+1F63C', 'U+1F63D', 'U+1F63E', 'U+1F63F', // Cat faces
    'U+1F640', 'U+1F641', 'U+1F642', 'U+1F643', 'U+1F644', // Faces with various expressions
    'U+1F645', 'U+1F646', 'U+1F647',            // Gesture emojis
    'U+1F648', 'U+1F649', 'U+1F64A',            // See/hear/speak-no-evil monkeys
    'U+1F64B', 'U+1F64C', 'U+1F64D', 'U+1F64E', 'U+1F64F'  // Additional gestures and prayer
  ]);

  // Function to convert emoji to a Unicode code point string
  const toUnicodeCodePoints = (emoji: string) => {
    return Array.from(emoji)
      .map(char => `U+${char.codePointAt(0)?.toString(16).toUpperCase()}`)
      .join(' ');
  };

  // Function to generate a random emoji with forced text presentation
  const getRandomTextEmoji = () => {
    const emojiRanges = [
      [0x1F600, 0x1F64F], // Emoticons
      [0x1F300, 0x1F5FF], // Misc Symbols & Pictographs
      [0x1F680, 0x1F6FF], // Transport & Map Symbols
      [0x1F700, 0x1F77F], // Alchemical Symbols
    ];

    let emoji;
    do {
      const [start, end] = emojiRanges[Math.floor(Math.random() * emojiRanges.length)];
      emoji = String.fromCodePoint(Math.floor(Math.random() * (end - start + 1)) + start) + '\uFE0E';
    } while (knownColoredEmojis.has(toUnicodeCodePoints(emoji).replace(' U+FE0E', ''))); // Exclude known colored emojis

    return emoji;
  };

  const iconDataArray = useMemo(() => {
    return Array.from({ length: totalIcons }).map(() => {
      return { emoji: getRandomTextEmoji() };
    });
  }, [totalIcons]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          position: 'absolute',
          top: 0,
          left: 0,
          flexDirection: 'row',
          flexWrap: 'wrap',
          width,
        },
        icon: {
          color: colors.accent,
          fontSize: iconSize,
          margin: iconSize * 0.45, // Adjust the margin to construct the grid
        },
      }),
    [colors.accent, width, iconSize]
  );

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scrollAnim, {
          toValue: -height,
          duration: animDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scrollAnim, {
          toValue: 0,
          duration: animDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [height]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: scrollAnim }] }]}>
      {iconDataArray.map(({ emoji }, index) => (
        <Text key={index} style={styles.icon}>
          {emoji}
        </Text>
      ))}
    </Animated.View>
  );
};

export default FloatingIconGrid;
