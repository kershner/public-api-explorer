import { Dimensions, StyleSheet, Animated, Easing } from 'react-native';
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { S3_BASE_URL } from '@/constants/constants';
import { useStore } from '@/store/useStore';
import * as Font from 'expo-font';

const S3_FONTS_URL = `${S3_BASE_URL}/fonts`;

// Define icon sets and append each file name to the base URL
const iconSets = [
  { name: 'Ionicons', url: `${S3_FONTS_URL}/Ionicons.ttf`, component: require('react-native-vector-icons/Ionicons').default },
  { name: 'FontAwesome', url: `${S3_FONTS_URL}/FontAwesome.ttf`, component: require('react-native-vector-icons/FontAwesome').default },
  { name: 'Entypo', url: `${S3_FONTS_URL}/Entypo.ttf`, component: require('react-native-vector-icons/Entypo').default },
  { name: 'Feather', url: `${S3_FONTS_URL}/Feather.ttf`, component: require('react-native-vector-icons/Feather').default },
  { name: 'Foundation', url: `${S3_FONTS_URL}/Foundation.ttf`, component: require('react-native-vector-icons/Foundation').default },
  { name: 'Fontisto', url: `${S3_FONTS_URL}/Fontisto.ttf`, component: require('react-native-vector-icons/Fontisto').default },
  { name: 'EvilIcons', url: `${S3_FONTS_URL}/EvilIcons.ttf`, component: require('react-native-vector-icons/EvilIcons').default },
  { name: 'Octicons', url: `${S3_FONTS_URL}/Octicons.ttf`, component: require('react-native-vector-icons/Octicons').default },
];

const FloatingIconGrid: React.FC<{ iconSize?: number }> = ({ iconSize = 48 }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [readyToRender, setReadyToRender] = useState(false);
  const [selectedIconSet, setSelectedIconSet] = useState(iconSets[0]);
  const colors = useStore((state) => state.colors);
  const { width, height } = Dimensions.get('window');
  const numColumns = Math.floor(width / iconSize);
  const numRows = Math.floor(height / iconSize) + 2;
  const totalIcons = numColumns * numRows;
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const animDuration = 80000;

  // Choose a random icon set on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * iconSets.length);
    const chosenIconSet = iconSets[randomIndex];
    setSelectedIconSet(chosenIconSet);
  }, []);

  // Load the selected font dynamically
  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({ [selectedIconSet.name]: selectedIconSet.url });
      setFontLoaded(true);
    };
    loadFont();
  }, [selectedIconSet]);

  useEffect(() => {
    if (fontLoaded) setReadyToRender(true);
  }, [fontLoaded]);

  const iconDataArray = useMemo(() => {
    if (!fontLoaded || !selectedIconSet.component.glyphMap) return [];
    const iconNames = Object.keys(selectedIconSet.component.glyphMap);
    return Array.from({ length: totalIcons }).map(() => {
      const randomIconName = iconNames[Math.floor(Math.random() * iconNames.length)];
      return { name: randomIconName };
    });
  }, [fontLoaded, selectedIconSet, totalIcons]);

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
          backgroundColor: colors.background
        },
        icon: {
          color: colors.accent,
          margin: iconSize * 0.45,
          fontFamily: selectedIconSet.name,
        },
        loadingContainer: {
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        },
      }),
    [colors, width, iconSize, selectedIconSet]
  );

  useEffect(() => {
    if (readyToRender) {
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
    }
  }, [readyToRender, height]);

  if (!fontLoaded) { return null; }

  const Icon = ({ name, size, style }) => {
    const IconComponent = selectedIconSet.component;
    return <IconComponent name={name} size={size} style={style} />;
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: scrollAnim }] }]}>
      {iconDataArray.map(({ name }, index) => (
        <Icon key={index} name={name as any} size={iconSize} style={styles.icon} />
      ))}
    </Animated.View>
  );
};

export default FloatingIconGrid;
