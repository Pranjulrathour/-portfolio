// Design System Constants

// Color Palette
export const colors = {
  // Primary Brand Colors
  primary: {
    main: "#0030C", // Primary blue (corrected from #0003OC which appears to be a typo)
    light: "#3355E8", // Lighter shade for hover states
    dark: "#00208A", // Darker shade for pressed states
  },
  // Neutral Colors
  neutral: {
    white: "#FFFFFF",
    gray100: "#F7F7F7",
    gray200: "#E9E9E9",
    gray300: "#D9D9D9",
    gray400: "#C4C4C4", // Specified gray
    gray500: "#9E9E9E",
    gray600: "#757575",
    gray700: "#616161",
    gray800: "#424242",
    gray900: "#212121",
    black: "#000000",
  },
  // Semantic Colors
  semantic: {
    success: "#4CAF50",
    warning: "#FFC107",
    error: "#F44336",
    info: "#2196F3",
  },
};

// Typography
export const typography = {
  fontFamily: {
    primary: "system-ui, -apple-system, sans-serif",
    code: "monospace",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Spacing
export const spacing = {
  0: "0",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
};

// Border Radius
export const borderRadius = {
  none: "0",
  sm: "0.125rem", // 2px
  md: "0.25rem", // 4px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  full: "9999px",
};

// Shadows
export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
};

// Theme Configuration
export const lightTheme = {
  background: colors.neutral.white,
  foreground: colors.neutral.black,
  primary: colors.primary.main,
  primaryHover: colors.primary.light,
  primaryActive: colors.primary.dark,
  border: colors.neutral.gray300,
  borderHover: colors.neutral.gray400,
  muted: colors.neutral.gray100,
  mutedForeground: colors.neutral.gray600,
  accent: colors.neutral.gray200,
  accentForeground: colors.neutral.gray800,
};

export const darkTheme = {
  background: colors.neutral.black,
  foreground: colors.neutral.white,
  primary: colors.primary.main,
  primaryHover: colors.primary.light,
  primaryActive: colors.primary.dark,
  border: colors.neutral.gray700,
  borderHover: colors.neutral.gray600,
  muted: colors.neutral.gray900,
  mutedForeground: colors.neutral.gray400,
  accent: colors.neutral.gray800,
  accentForeground: colors.neutral.gray200,
};

// Accessibility
export const accessibility = {
  focusRing: `0 0 0 2px ${colors.primary.main}`,
  minTapTarget: "44px", // Minimum tap target size for interactive elements
  minContrast: {
    normalText: 4.5, // WCAG AA for normal text
    largeText: 3, // WCAG AA for large text
    aaa: 7, // WCAG AAA
  },
};

// Component-specific styles
export const components = {
  button: {
    primary: {
      background: colors.primary.main,
      color: colors.neutral.white,
      hoverBackground: colors.primary.light,
      activeBackground: colors.primary.dark,
    },
    secondary: {
      background: colors.neutral.gray200,
      color: colors.neutral.black,
      hoverBackground: colors.neutral.gray300,
      activeBackground: colors.neutral.gray400,
    },
    outline: {
      background: "transparent",
      color: colors.primary.main,
      border: `1px solid ${colors.primary.main}`,
      hoverBackground: `rgba(0, 48, 204, 0.05)`,
      activeBackground: `rgba(0, 48, 204, 0.1)`,
    },
    ghost: {
      background: "transparent",
      color: colors.neutral.gray700,
      hoverBackground: colors.neutral.gray100,
      activeBackground: colors.neutral.gray200,
    },
  },
  card: {
    background: colors.neutral.white,
    border: `1px solid ${colors.neutral.gray200}`,
    borderRadius: borderRadius.lg,
    shadow: shadows.md,
  },
  input: {
    background: colors.neutral.white,
    border: `1px solid ${colors.neutral.gray400}`,
    focusBorder: colors.primary.main,
    placeholderColor: colors.neutral.gray500,
    borderRadius: borderRadius.md,
  },
};

// Usage guidelines
export const usageGuidelines = {
  primary: "Use for main brand elements, CTAs, and interactive components",
  gray: "Use for subtle backgrounds, borders, and secondary elements",
  black:
    "Use for main text content in light theme and backgrounds in dark theme",
  white: "Use for backgrounds in light theme and text in dark theme",
  spacing: "Maintain consistent spacing using the spacing scale",
  typography: "Use typography scale for consistent text hierarchy",
};

// Export the complete design system
const designSystem = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  lightTheme,
  darkTheme,
  accessibility,
  components,
  usageGuidelines,
};

export default designSystem;
