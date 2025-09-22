import styled, { createGlobalStyle } from 'styled-components';
import { colors, typography, spacing, borderRadius, shadows, animations, responsive } from './designTokens';

export const GlobalStyles = createGlobalStyle`
  /* Reset and base styles */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${typography.fontFamily.primary};
    font-size: ${typography.fontSize.base};
    line-height: ${typography.lineHeight.normal};
    color: ${colors.text.primary};
    background-color: ${colors.background.primary};
    overflow-x: hidden;
  }

  /* Typography scale with mobile-first approach */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${typography.fontWeight.semibold};
    line-height: ${typography.lineHeight.tight};
    color: ${colors.text.primary};
    margin-bottom: ${spacing[4]};
  }

  h1 {
    font-size: ${typography.fontSize['3xl']};
    font-weight: ${typography.fontWeight.bold};
    
    ${responsive.mobile} {
      font-size: ${typography.fontSize['2xl']};
    }
  }

  h2 {
    font-size: ${typography.fontSize['2xl']};
    
    ${responsive.mobile} {
      font-size: ${typography.fontSize.xl};
    }
  }

  h3 {
    font-size: ${typography.fontSize.xl};
    
    ${responsive.mobile} {
      font-size: ${typography.fontSize.lg};
    }
  }

  h4 {
    font-size: ${typography.fontSize.lg};
    
    ${responsive.mobile} {
      font-size: ${typography.fontSize.base};
    }
  }

  h5 {
    font-size: ${typography.fontSize.base};
  }

  h6 {
    font-size: ${typography.fontSize.sm};
  }

  p {
    color: ${colors.text.secondary};
    line-height: ${typography.lineHeight.relaxed};
    margin-bottom: ${spacing[4]};
  }

  a {
    color: ${colors.text.link};
    text-decoration: none;
    transition: color ${animations.duration.fast} ${animations.easing.easeOut};
    
    &:hover {
      color: ${colors.primary[600]};
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all ${animations.duration.fast} ${animations.easing.easeOut};
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: 1px solid ${colors.border.medium};
    border-radius: ${borderRadius.md};
    padding: ${spacing[3]} ${spacing[4]};
    transition: border-color ${animations.duration.fast} ${animations.easing.easeOut};
    
    &:focus {
      border-color: ${colors.primary[500]};
      box-shadow: 0 0 0 3px ${colors.primary[100]};
    }
    
    &::placeholder {
      color: ${colors.text.tertiary};
    }
  }

  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${spacing[4]};
    
    ${responsive.mobile} {
      padding: 0 ${spacing[3]};
    }
  }

  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }
  
  .mb-0 { margin-bottom: 0; }
  .mb-1 { margin-bottom: ${spacing[1]}; }
  .mb-2 { margin-bottom: ${spacing[2]}; }
  .mb-3 { margin-bottom: ${spacing[3]}; }
  .mb-4 { margin-bottom: ${spacing[4]}; }
  .mb-6 { margin-bottom: ${spacing[6]}; }
  .mb-8 { margin-bottom: ${spacing[8]}; }
  
  .mt-0 { margin-top: 0; }
  .mt-1 { margin-top: ${spacing[1]}; }
  .mt-2 { margin-top: ${spacing[2]}; }
  .mt-3 { margin-top: ${spacing[3]}; }
  .mt-4 { margin-top: ${spacing[4]}; }
  .mt-6 { margin-top: ${spacing[6]}; }
  .mt-8 { margin-top: ${spacing[8]}; }
`;

// Layout components
export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => spacing[props.gap] || spacing[0]};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  
  ${responsive.mobile} {
    flex-direction: ${props => props.mobileDirection || props.direction || 'row'};
    gap: ${props => spacing[props.mobileGap] || spacing[props.gap] || spacing[0]};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || '1fr'};
  gap: ${props => spacing[props.gap] || spacing[4]};
  
  ${responsive.mobile} {
    grid-template-columns: ${props => props.mobileColumns || '1fr'};
    gap: ${props => spacing[props.mobileGap] || spacing[props.gap] || spacing[3]};
  }
`;

export const Card = styled.div`
  background: ${colors.background.elevated};
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius.lg};
  padding: ${props => spacing[props.padding] || spacing[6]};
  box-shadow: ${props => props.elevation ? shadows[props.elevation] : shadows.sm};
  transition: all ${animations.duration.fast} ${animations.easing.easeOut};
  
  &:hover {
    box-shadow: ${props => props.hoverable ? shadows.md : shadows[props.elevation] || shadows.sm};
    transform: ${props => props.hoverable ? 'translateY(-1px)' : 'none'};
  }
  
  ${responsive.mobile} {
    padding: ${props => spacing[props.mobilePadding] || spacing[props.padding] || spacing[4]};
  }
`;

export const Section = styled.section`
  padding: ${props => spacing[props.padding] || spacing[16]} 0;
  
  ${responsive.mobile} {
    padding: ${props => spacing[props.mobilePadding] || spacing[12]} 0;
  }
`;

// Spacer component for consistent spacing
export const Spacer = styled.div`
  height: ${props => spacing[props.size] || spacing[4]};
  
  ${responsive.mobile} {
    height: ${props => spacing[props.mobileSize] || spacing[props.size] || spacing[4]};
  }
`;