
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Premium color palette with depth
export const colors = {
  // Backgrounds with depth
  background: '#0a0e27',
  backgroundSecondary: '#151932',
  backgroundTertiary: '#1e2442',
  
  // Text colors
  text: '#e8eaf6',
  textSecondary: '#9fa8da',
  textTertiary: '#5c6bc0',
  
  // Primary brand colors with gradients
  primary: '#667eea',
  primaryLight: '#764ba2',
  primaryDark: '#4c63d2',
  
  // Accent colors
  accent: '#f093fb',
  accentSecondary: '#4facfe',
  
  // Secondary colors
  secondary: '#43e97b',
  secondaryLight: '#38f9d7',
  
  // Card and surface colors
  card: 'rgba(30, 36, 66, 0.8)',
  cardLight: 'rgba(47, 54, 88, 0.6)',
  
  // Highlight and interactive
  highlight: 'rgba(102, 126, 234, 0.15)',
  highlightStrong: 'rgba(102, 126, 234, 0.3)',
  
  // Borders and dividers
  border: 'rgba(159, 168, 218, 0.2)',
  borderLight: 'rgba(159, 168, 218, 0.1)',
  
  // Status colors
  success: '#43e97b',
  warning: '#ffd93d',
  error: '#ff6b9d',
  info: '#4facfe',
};

export const gradients = {
  primary: ['#667eea', '#764ba2'],
  secondary: ['#7ec395ff', '#38f9d7'],
  accent: ['#ecadf3ff', '#ff96a4ff'],
  blue: ['#4facfe', '#00f2fe'],
  purple: ['#78d8d4ff', '#ecafc2ff'],
  sunset: ['#ff9a56', '#ff6a88'],
};

export const shadows = {
  small: {
    boxShadow: '0px 2px 8px rgba(102, 126, 234, 0.15)',
    elevation: 2,
  },
  medium: {
    boxShadow: '0px 4px 16px rgba(102, 126, 234, 0.2)',
    elevation: 4,
  },
  large: {
    boxShadow: '0px 8px 32px rgba(102, 126, 234, 0.25)',
    elevation: 8,
  },
  glow: {
    boxShadow: '0px 0px 24px rgba(102, 126, 234, 0.4)',
    elevation: 12,
  },
};

export const buttonStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    ...shadows.medium,
  },
  icon: {
    width: 60,
    height: 60,
  },
});
