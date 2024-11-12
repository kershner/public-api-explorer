import { ThemeColors } from "@/store/useStore";

export const APP_TITLE = 'public-api-explorer';

export const S3_BASE_URL = 'https://djfdm802jwooz.cloudfront.net/static/react-apps/public-api-explorer';

export const lightModeColors: ThemeColors = {
  background: '#FFFFFF',
  accent: '#D3D3D3',
  border: '#BFBFBF',
  textPrimary: '#121212',
  textSecondary: '#FFFFFF',
  linkText: '#007AFF',
  error: 'red',
};

export  const darkModeColors: ThemeColors = {
  background: '#121212',
  accent: '#2E2E2E',
  border: '#FFFFFF',
  textPrimary: '#FFFFFF',
  textSecondary: '#121212',
  linkText: '#007AFF',
  error: 'red',
};