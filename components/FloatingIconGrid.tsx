import { Dimensions, StyleSheet, Animated, Easing } from 'react-native';
import React, { useEffect, useRef, useMemo } from 'react';
import { useStore } from '@/store/useStore';

// Import different icon sets
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesomeNames from 'react-native-vector-icons/glyphmaps/FontAwesome.json';
import MaterialNames from 'react-native-vector-icons/glyphmaps/MaterialIcons.json';
import IoniconNames from 'react-native-vector-icons/glyphmaps/Ionicons.json';

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

  const iconSets = [
    { component: FontAwesomeIcon, names: Object.keys(FontAwesomeNames) },
    { component: MaterialIcon, names: Object.keys(MaterialNames) },
    { component: Ionicon, names: Object.keys(IoniconNames) },
  ];

  const iconDataArray = useMemo(() => {
    return Array.from({ length: totalIcons }).map(() => {
      const randomSet = iconSets[Math.floor(Math.random() * iconSets.length)];
      const randomIconName = randomSet.names[Math.floor(Math.random() * randomSet.names.length)];
      return { component: randomSet.component, name: randomIconName };
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
          margin: iconSize * 0.45, // Adjust the margin to construct the grid
        },
      }),
    [colors, width, iconSize]
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
      {iconDataArray.map(({ component: IconComponent, name }, index) => (
        <IconComponent
          key={index}
          name={name}
          size={iconSize}
          style={styles.icon}
        />
      ))}
    </Animated.View>
  );
};

export default FloatingIconGrid;
