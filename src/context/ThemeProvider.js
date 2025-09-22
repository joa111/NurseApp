// src/context/ThemeProvider.js
import React from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  animations,
} from '../styles/designTokens';

// Define theme object with design tokens
const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  animations,
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  transitions: {
    default: '0.2s ease',
    fast: '0.1s ease',
    slow: '0.3s ease',
  },
};

// Global styles
const GlobalStyle = createGlobalStyle`
  :root {
    --bg: ${colors.background.primary};
    --surface: ${colors.background.secondary};
    --surface-2: ${colors.background.tertiary};
    --elev-1: ${colors.background.elevated};
    --text: ${colors.text.primary};
    --text-muted: ${colors.text.secondary};
    --primary: ${colors.primary[500]};
    --primary-600: ${colors.primary[600]};
    --primary-700: ${colors.primary[700]};
    --accent: ${colors.secondary[500]};
    --success: ${colors.success[500]};
    --warning: ${colors.warning[500]};
    --danger: ${colors.error[500]};
    --ring: ${colors.primary[200]};
    --border: ${colors.border.medium};
    --radius: ${borderRadius.md};
    --shadow-sm: ${shadows.sm};
    --shadow-md: ${shadows.md};
    --shadow-lg: ${shadows.lg};
  }

  * { 
    box-sizing: border-box; 
    margin: 0;
    padding: 0;
  }

  html, body, #root { 
    height: 100%; 
  }

  body {
    margin: 0;
    background: radial-gradient(1200px 800px at 20% -10%, rgba(167, 139, 250, 0.12), transparent 60%),
                radial-gradient(900px 700px at 120% 10%, rgba(34, 211, 238, 0.10), transparent 55%),
                linear-gradient(0deg, var(--bg), var(--bg));
    color: var(--text);
    font-family: ${typography.fontFamily.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 { 
    color: var(--text); 
    margin: 0 0 0.6rem 0; 
    line-height: 1.2;
  }

  h1 { font-size: ${typography.fontSize['4xl']}; }
  h2 { font-size: ${typography.fontSize['3xl']}; }
  h3 { font-size: ${typography.fontSize['2xl']}; }
  h4 { font-size: ${typography.fontSize.xl}; }
  h5 { font-size: ${typography.fontSize.lg}; }
  h6 { font-size: ${typography.fontSize.md}; }

  p { 
    color: var(--text-muted); 
    line-height: 1.7; 
    margin: 0.5rem 0 1rem; 
  }

  a { 
    color: var(--primary); 
    text-decoration: none; 
    transition: color ${animations.duration.fast} ${animations.easing.easeOut};
  }
  
  a:hover { 
    color: var(--primary-600); 
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    font: inherit;
    cursor: pointer;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.1);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.5);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.7);
  }

  /* Focus styles */
  :focus-visible {
    outline: 2px solid var(--primary-600);
    outline-offset: 2px;
  }

  /* Selection styles */
  ::selection {
    background-color: rgba(110, 231, 255, 0.3);
    color: var(--text);
  }
`;

// Theme Provider Component
const ThemeProvider = ({ children }) => {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;