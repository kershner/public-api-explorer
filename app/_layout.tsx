import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import FloatingIconGrid from '@/components/FloatingIconGrid';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CommonActions } from "@react-navigation/native";
import BottomDrawer from '@/components/BottomDrawer';
import SettingsMenu from '@/components/SettingsMenu';
import { Stack, useNavigation  } from 'expo-router';
import { APP_TITLE } from '@/constants/constants';
import { useStore } from '@/store/useStore';
import React, { useMemo } from 'react';

export default function RootLayout() {
  const colors = useStore((state) => state.colors);
  const setModalOpen = useStore((state) => state.setModalOpen);
  const setInputValue = useStore((state) => state.setInputValue);
  const setCurrentUrl = useStore((state) => state.setCurrentUrl);
  const setJsonData = useStore((state) => state.setJsonData);
  const setError = useStore((state) => state.setError);
  const navigation = useNavigation();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        globalContainer: {
          flex: 1,
          padding: 16,
          backgroundColor: colors.background,
        },
        stackContainer: {
          backgroundColor: colors.background,
        },
        headerContainer: {
          backgroundColor: colors.background,
        },
        headerTitleText: {
          fontSize: 20,
          fontWeight: "bold",
          color: colors.textPrimary,
        },
        headerBack: {
          fontSize: 16,
          color: colors.textPrimary,
        },
        menuButtonWrapper: {
          paddingRight: 16,
        },
      }),
    [colors]
  );

  const goHomeAndClearStack = () => {
    setInputValue('');
    setCurrentUrl('');
    setError('');
    setJsonData(null);
    
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "index" }],
      })
    );
  };

  return (
    <SafeAreaView style={styles.globalContainer}>
      <FloatingIconGrid />
      
      <Stack initialRouteName="index"
          screenOptions={{
            contentStyle: styles.stackContainer,
            headerStyle: styles.headerContainer,
            headerTitleStyle: styles.headerTitleText,
            headerBackTitleStyle: styles.headerBack,
            headerTintColor: colors.textPrimary,
            headerTitle: () => (
              <TouchableOpacity onPress={goHomeAndClearStack}>
                <Text style={styles.headerTitleText}>{APP_TITLE}</Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={styles.menuButtonWrapper}>
                <TouchableOpacity onPress={() => setModalOpen(true)}>
                  <FontAwesome name="bars" size={28} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>
            ),
          }}
        >
        <Stack.Screen
          name="index"
          options={{
            title: APP_TITLE,
          }}
        />
      </Stack>
      <BottomDrawer />
      <SettingsMenu />
    </SafeAreaView>
  );
}
