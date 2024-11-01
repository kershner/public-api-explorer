import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FloatingIconGrid from '@/components/FloatingIconGrid';
import React, { useMemo, useEffect, useState } from 'react';
import { CommonActions } from "@react-navigation/native";
import BottomDrawer from '@/components/BottomDrawer';
import SettingsMenu from '@/components/SettingsMenu';
import { Stack, useNavigation } from 'expo-router';
import { APP_TITLE } from '@/constants/constants';
import { useStore } from '@/store/useStore';
import * as Linking from 'expo-linking';
import { Platform } from 'react-native';

export default function RootLayout() {
  const colors = useStore((state) => state.colors);
  const setModalOpen = useStore((state) => state.setModalOpen);
  const setInputValue = useStore((state) => state.setInputValue);
  const setUrl = useStore((state) => state.setUrl);
  const setJsonDataForUrl = useStore((state) => state.setJsonDataForUrl);
  const setError = useStore((state) => state.setError);
  const navigation = useNavigation();
  const [initialRoute] = useState<'index' | 'JsonViewer'>('index');

  useEffect(() => {
    const handleInitialUrl = async () => {
      let url = '';

      if (Platform.OS === 'web') {
        const queryParams = new URLSearchParams(window.location.search);
        url = queryParams.get('url') || '';
      } else {
        const initialUrl = await Linking.getInitialURL();
        if (initialUrl) {
          const { queryParams } = Linking.parse(initialUrl) as { queryParams: Record<string, string> };
          url = queryParams.url || '';
        }
      }

      if (url) {
        console.log('url passed in: ', url);
      }
    };

    handleInitialUrl();

    const subscription = Linking.addEventListener('url', ({ url }) => {
      const { queryParams } = Linking.parse(url) as { queryParams: Record<string, string> };
      const queryUrl = queryParams.url || '';
      if (queryUrl) {
        console.log('url passed in: ', queryUrl);
      }
    });

    return () => subscription.remove();
  }, []);

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
    setUrl('');
    setError('');
    setJsonDataForUrl('', null);

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "index" }],
      })
    );
  };

  return (
    <SafeAreaView style={styles.globalContainer}>
      {/* <FloatingIconGrid /> */}
      
      <Stack initialRouteName={initialRoute}
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
        <Stack.Screen
          name="json"
          options={{
            title: "JSON Viewer",
          }}
        />
      </Stack>
      
      <BottomDrawer />
      <SettingsMenu />
    </SafeAreaView>
  );
}
