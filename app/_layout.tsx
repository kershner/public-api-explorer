import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text, ActivityIndicator, StatusBar, Platform } from 'react-native';
import { useNavigation, CommonActions, useNavigationState, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useLocalSearchParams, usePathname } from 'expo-router';
import SettingsMenu from '@/components/SettingsMenu/SettingsMenu';
import FloatingIconGrid from '@/components/FloatingIconGrid';
import React, { useEffect, useRef, useMemo } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { APP_TITLE } from '@/constants/constants';
import ErrorFlash from '@/components/ErrorFlash';
import RemoteSvg from '@/components/RemoteSvg';
import { useStore } from '@/store/useStore';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { checkUrl } from '@/utils/utils';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const colors = useStore((state) => state.colors);
  const darkMode = useStore((state) => state.darkMode);
  const initialLoad = useStore((state) => state.initialLoad);
  const navigation = useNavigation();
  const searchParams = useLocalSearchParams<{ url?: string }>();
  const initialUrlHandledRef = useRef(new Set());
  const hookShouldRunRef = useRef(true);
  const backgroundAnimation = useStore((state) => state.backgroundAnimation);
  const navigationState = useNavigationState(state => state);
  const prevStackLength = useRef(navigationState.routes.length);
  const jsonData = useStore((state) => state.jsonData);
  const jsonDataMap = useStore((state) => state.jsonDataMap);
  const pathname = usePathname();
  const initialRoute = 'public-api-explorer';

  // Update StatusBar based on `darkMode`
  useEffect(() => {
    const barStyle = darkMode ? 'light-content' : 'dark-content';
    const backgroundColor = colors.background;

    StatusBar.setBarStyle(barStyle, true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(backgroundColor, true);
    }
  }, [darkMode]);

  useEffect(() => {
    const currentStackLength = navigationState.routes.length;
    if (Platform.OS !== 'ios' && currentStackLength < prevStackLength.current) {
      const currentScreen = navigationState.routes[currentStackLength - 1]?.name || "Unknown";
      if (currentScreen === `${APP_TITLE}/index`) {
        goHomeAndClearStack();
      }
    }
    prevStackLength.current = currentStackLength;
  }, [navigationState]);

  useEffect(() => {
    if (pathname === '/') router.replace(initialRoute);

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
        checkUrl(url);
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

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent'
    }
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        globalContainer: { flex: 1, backgroundColor: colors.background, overflow: 'hidden' },
        stackWrapper: { flex: 1, position: 'relative', zIndex: 1, borderWidth: 1, borderColor: colors.background },
        stackContainer: { backgroundColor: colors.background },
        headerContainer: { backgroundColor: colors.background },
        headerTitleText: { fontSize: 18, fontWeight: "bold", color: colors.textPrimary },
        headerLogo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
        headerBack: { fontSize: 16, color: colors.textPrimary },
        menuButtonWrapper: { paddingRight: Platform.OS === 'ios' ? 0 : 16 },
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
    if (jsonData && jsonDataMap) {
      useStore.setState({ inputValue: '', url: '', error: '', jsonData: {}, jsonDataMap: {} });
      navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: `${APP_TITLE}/index` }] }));
    }
  };

  return (
    <SafeAreaView style={styles.globalContainer}>
      <View style={styles.stackWrapper}>
        <ThemeProvider value={navTheme}>
          <Stack
            screenOptions={{
              contentStyle: styles.stackContainer,
              headerStyle: styles.headerContainer,
              headerTitleStyle: styles.headerTitleText,
              headerBackTitleStyle: styles.headerBack,
              headerTintColor: colors.textPrimary,
              headerTitle: () => (
                <TouchableOpacity onPress={goHomeAndClearStack}>
                  <View style={styles.headerLogo}>
                    <RemoteSvg fileName='svg/api_explorer_logo_2.svg' width={35} height={35} />
                    <Text style={styles.headerTitleText}>{APP_TITLE}</Text>
                  </View>
                </TouchableOpacity>
              ),
              headerRight: () => (
                <View style={styles.menuButtonWrapper}>
                  <TouchableOpacity onPress={() => useStore.setState({ modalOpen: true })}>
                    <Text style={{ fontSize: 32, color: colors.textPrimary, fontWeight: 'bold' }}>☰</Text>
                  </TouchableOpacity>
                </View>
              ),
            }}
          >
            <Stack.Screen name={`${initialRoute}/index`} options={{ title: APP_TITLE }} />
            <Stack.Screen name={`${initialRoute}/view`} options={{ title: "JSON Viewer", headerTitle: '' }} />
          </Stack>
        </ThemeProvider>
      </View>

      {/* {backgroundAnimation && <FloatingIconGrid />} */}
      
      <SettingsMenu />
      <ErrorFlash />

      {initialLoad && (
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.textPrimary} />
          <Text>Loading...</Text>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}
