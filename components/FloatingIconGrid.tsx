import iconNames from 'react-native-vector-icons/glyphmaps/FontAwesome.json';
import { Dimensions, StyleSheet, Animated, Easing } from 'react-native';
import React, { useEffect, useRef, useMemo } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
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
  const iconList = Object.keys(iconNames);
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const animDuration = 80000;
  
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          pointerEvents: 'none',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
        },
        icon: {
          margin: 18,
          color: colors.accent,
          opacity: 0.5,
          
        },
      }),
    [colors]
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
      {Array.from({ length: totalIcons }).map((_, index) => (
        <Icon
          key={index}
          name={iconList[Math.floor(Math.random() * iconList.length)]}
          size={iconSize}
          style={styles.icon}
        />
      ))}
      {Array.from({ length: totalIcons }).map((_, index) => (
        <Icon
          key={`duplicate-${index}`}
          name={iconList[Math.floor(Math.random() * iconList.length)]}
          size={iconSize}
          style={styles.icon}
        />
      ))}
    </Animated.View>
  );
};

export default FloatingIconGrid;
