import { StyleSheet } from 'react-native';

export const lightModeColors = {
  background: '#FFF',
  accent: '#D3D3D3',
  border: '#BFBFBF',
  textPrimary: '#121212',
  textSecondary: '#FFF',
  linkText: '#007AFF',
  error: 'red'
};

export const darkModeColors = {
  background: '#121212',
  accent: '#2E2E2E',
  border: '#FFF',
  textPrimary: '#FFF',
  textSecondary: '#121212',
  linkText: '#007AFF',
  error: 'red'
};

export const colors = darkModeColors;

export const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  error: {
    paddingVertical: 5,
    color: colors.error
  }
});