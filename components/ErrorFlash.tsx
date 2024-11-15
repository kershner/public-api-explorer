import React, { useState, useEffect, useMemo } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import { useStore } from '@/store/useStore';

const ErrorFlash = () => {
  const error = useStore((state) => state.error);
  const colors = useStore((state) => state.colors);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          position: 'absolute',
          top: 75,
          right: 10,
          padding: 10,
          maxWidth: 300,
          backgroundColor: colors.error,
          borderRadius: 5,
          alignItems: 'center',
          zIndex: 1,
        },
        text: {
          color: '#FFF',
          fontWeight: 'bold',
        },
      }),
    [colors]
  );

  useEffect(() => {
    if (error) {
      fadeAnim.setValue(0);
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.delay(3000),
        Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    }
  }, [error, fadeAnim]);

  if (!error) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.text}>{error}</Text>
    </Animated.View>
  );
};

export default ErrorFlash;
