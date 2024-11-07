import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import SettingsMenu from '@/components/SettingsMenu/SettingsMenu';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FloatingIconGrid from '@/components/FloatingIconGrid';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useEffect, useRef } from 'react';
import BottomDrawer from '@/components/BottomDrawer';
import * as SplashScreen from 'expo-splash-screen';
import { APP_TITLE } from '@/constants/constants';
import { useStore } from '@/store/useStore';
import { Platform } from 'react-native';
import * as Linking from 'expo-linking';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colors = useStore((state) => state.colors);
  const initialLoad = useStore((state) => state.initialLoad);
  const navigation = useNavigation();
  const searchParams = useLocalSearchParams<{ url?: string }>();
  const initialUrlHandledRef = useRef(new Set());
  const hookShouldRunRef = useRef(true);
  const backgroundAnimation = useStore((state) => state.backgroundAnimation);

  useEffect(() => {
    const loadState = async () => {
      await useStore.getState().loadPersistedState();
      SplashScreen.hideAsync();
    };
    loadState();
  }, []);

  useEffect(() => {
    if (initialLoad || !hookShouldRunRef.current) return;

    const handleUrlNavigation = (url: string) => {
      if (!initialUrlHandledRef.current.has(url)) {
        initialUrlHandledRef.current.add(url);
        useStore.setState({ inputValue: url, url });
        hookShouldRunRef.current = false;
      }
    };

    const handleInitialUrl = async () => {
      let url = searchParams.url || '';

      if (!url && Platform.OS === 'web') {
        const queryParams = new URLSearchParams(window.location.search);
        url = queryParams.get('url') || '';
      } else if (!url) {
        const initialUrl = await Linking.getInitialURL();
        if (initialUrl) {
          const { queryParams } = Linking.parse(initialUrl) as { queryParams: Record<string, string> };
          url = queryParams.url || '';
        }
      }

      if (url) handleUrlNavigation(url);
      else hookShouldRunRef.current = false;
    };

    handleInitialUrl();
  }, [searchParams, initialLoad]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        globalContainer: { flex: 1, backgroundColor: colors.background },
        stackWrapper: { flex: 1, position: 'relative', zIndex: 1 },
        stackContainer: { backgroundColor: colors.background },
        headerContainer: { backgroundColor: colors.background },
        headerTitleText: { fontSize: 20, fontWeight: "bold", color: colors.textPrimary },
        headerBack: { fontSize: 16, color: colors.textPrimary },
        menuButtonWrapper: { paddingRight: 16 },
        loadingContainer: { 
          ...StyleSheet.absoluteFillObject, 
          justifyContent: 'center', 
          alignItems: 'center', 
          backgroundColor: colors.background, 
          zIndex: 2 
        },
      }),
    [colors]
  );

  const goHomeAndClearStack = () => {
    useStore.setState({ inputValue: '', url: '', error: '', jsonDataMap: {} });
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "index" }] }));
  };

  return (
    <SafeAreaView style={styles.globalContainer}>
      <View style={styles.stackWrapper}>
        <Stack
          initialRouteName="view"
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
                <TouchableOpacity onPress={() => useStore.setState({ modalOpen: true })}>
                  <FontAwesome name="bars" size={28} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>
            ),
          }}
        >
          <Stack.Screen name="index" options={{ title: APP_TITLE }} />
          <Stack.Screen name="view" options={{ title: "JSON Viewer" }} />
        </Stack>
      </View>

      { backgroundAnimation && <FloatingIconGrid /> }

      <BottomDrawer />
      <SettingsMenu />

      {initialLoad && (
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.textPrimary} />
          <Text>Loading...</Text>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}
