// src/components/ui/DesignSystem.js
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { colors, typography, spacing, borderRadius, shadows, animations, responsive, breakpoints } from '../../styles/designTokens';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
`;

// Helper for responsive props
const responsiveProp = (propName, cssProp, transformValue = v => v) => props => {
  if (!props[propName]) return '';

  if (typeof props[propName] === 'object') {
    return Object.entries(props[propName]).map(([breakpoint, value]) => {
      if (breakpoint === 'base') return `${cssProp}: ${transformValue(value)};`;
      const width = breakpoints[breakpoint];
      if (!width) return '';
      return `@media (min-width: ${width}) { ${cssProp}: ${transformValue(value)}; }`;
    }).join('\n');
  }

  return `${cssProp}: ${transformValue(props[propName])};`;
};

// Container components
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${spacing[6]};
  
  ${responsive.mobile} {
    padding: 0 ${spacing[4]};
  }
`;

export const Section = styled.section`
  margin: ${spacing[12]} 0;
  animation: ${fadeIn} ${animations.duration.normal} ${animations.easing.easeOut};
  
  ${responsiveProp('padding', 'padding', val => spacing[val] || val)}
  
  ${responsive.mobile} {
    margin: ${spacing[8]} 0;
  }
`;

// Card components
export const Card = styled.div`
  background: ${colors.background.elevated};
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius.lg};
  padding: ${props => spacing[props.padding] || spacing[6]};
  box-shadow: ${shadows.sm};
  transition: all ${animations.duration.fast} ${animations.easing.easeOut};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.md};
  }
  
  ${responsive.mobile} {
    padding: ${props => spacing[props.mobilePadding] || spacing[props.padding] || spacing[4]};
  }
`;

export const FeatureCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${spacing[7]};
  
  h3 {
    margin-bottom: ${spacing[3]};
    font-size: ${typography.fontSize.xl};
    display: flex;
    align-items: center;
    gap: ${spacing[3]};
  }
  
  p {
    margin-bottom: 0;
    flex-grow: 1;
  }
  
  svg {
    color: ${colors.primary[600]};
  }
`;

// Button components
export const Button = styled.button`
  appearance: none;
  border: 0;
  border-radius: ${borderRadius.xl};
  padding: 0.85rem 1.25rem;
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${props => props.size === 'large' ? typography.fontSize.lg : typography.fontSize.base};
  color: ${props => props.variant === 'secondary' ? colors.text.secondary : colors.text.inverse};
  background: ${props => props.variant === 'secondary'
    ? colors.background.tertiary
    : `linear-gradient(180deg, ${colors.primary[600]}, ${colors.primary[700]})`};
  box-shadow: ${props => props.variant === 'secondary'
    ? shadows.sm
    : '0 4px 12px rgba(5, 150, 105, 0.3)'};
  cursor: pointer;
  transition: all ${animations.duration.fast} ${animations.easing.easeOut};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[2]};
  
  &:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
    box-shadow: ${props => props.variant === 'secondary'
    ? shadows.md
    : '0 6px 16px rgba(5, 150, 105, 0.4)'};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  border-radius: ${borderRadius.full};
  border: 1px solid ${colors.border.light};
  background: ${colors.background.secondary};
  color: ${colors.text.secondary};
  cursor: pointer;
  transition: all ${animations.duration.fast} ${animations.easing.easeOut};
  
  &:hover {
    background: ${colors.primary[50]};
    color: ${colors.primary[600]};
    transform: translateY(-1px);
    border-color: ${colors.primary[200]};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

// Form components
export const FormGroup = styled.div`
  margin-bottom: ${spacing[5]};
`;

export const Label = styled.label`
  display: block;
  margin-bottom: ${spacing[2]};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.text.primary};
`;

export const Input = styled.input`
  width: 100%;
  background: ${colors.background.primary};
  border: 1px solid ${colors.border.medium};
  color: ${colors.text.primary};
  padding: 0.85rem ${spacing[4]};
  border-radius: ${borderRadius.lg};
  outline: none;
  transition: all ${animations.duration.fast} ${animations.easing.easeOut};
  font-size: ${typography.fontSize.base};
  
  &::placeholder {
    color: ${colors.text.tertiary};
  }
  
  &:focus {
    border-color: ${colors.primary[500]};
    box-shadow: 0 0 0 3px ${colors.primary[100]};
    background: ${colors.background.primary};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: ${colors.background.secondary};
  }
`;

export const Select = styled.select`
  width: 100%;
  background: ${colors.background.primary};
  border: 1px solid ${colors.border.medium};
  color: ${colors.text.primary};
  padding: 0.85rem ${spacing[4]};
  border-radius: ${borderRadius.lg};
  outline: none;
  transition: all ${animations.duration.fast} ${animations.easing.easeOut};
  font-size: ${typography.fontSize.base};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%239ca3af' viewBox='0 0 16 16'%3E%3Cpath d='M8 11.5l-5-5 1.5-1.5L8 8.5 11.5 5 13 6.5l-5 5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  
  &:focus {
    border-color: ${colors.primary[500]};
    box-shadow: 0 0 0 3px ${colors.primary[100]};
  }
`;

export const Checkbox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${spacing[3]};
  
  input {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 1px solid ${colors.border.medium};
    border-radius: ${borderRadius.md};
    margin-right: ${spacing[3]};
    background: ${colors.background.primary};
    position: relative;
    cursor: pointer;
    
    &:checked {
      background: ${colors.primary[600]};
      border-color: ${colors.primary[600]};
      
      &:after {
        content: '';
        position: absolute;
        left: 6px;
        top: 2px;
        width: 6px;
        height: 12px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }
    
    &:focus {
      box-shadow: 0 0 0 3px ${colors.primary[100]};
    }
  }
  
  label {
    cursor: pointer;
    user-select: none;
    color: ${colors.text.primary};
  }
`;

export const ErrorMessage = styled.p`
  color: ${colors.error[600]};
  font-size: ${typography.fontSize.sm};
  margin-top: ${spacing[2]};
  margin-bottom: 0;
  animation: ${slideUp} 0.2s ease-out;
`;

// Navigation components
export const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing[4]} ${spacing[6]};
  background: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid ${colors.border.light};
  backdrop-filter: blur(8px);
  position: sticky;
  top: 0;
  z-index: 50;
  transition: padding 0.3s ease;
  
  ${responsive.mobile} {
    padding: ${spacing[3]} ${spacing[4]};
  }
`;

export const NavLogo = styled(Link)`
  font-weight: ${typography.fontWeight.extrabold};
  font-size: ${typography.fontSize.xl};
  color: ${colors.text.primary};
  text-decoration: none;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  
  &:hover {
    color: ${colors.primary[600]};
  }
  
  svg {
    color: ${colors.primary[600]};
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[5]};
  
  ${responsive.mobile} {
    gap: ${spacing[3]};
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: ${colors.text.secondary};
  font-weight: ${typography.fontWeight.semibold};
  position: relative;
  padding: ${spacing[1]} 0;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${colors.primary[600]};
  }
  
  &.active {
    color: ${colors.primary[600]};
    
    &:after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: ${colors.primary[600]};
      border-radius: 2px;
      animation: ${slideUp} 0.2s ease-out;
    }
  }
`;

// Status indicators
export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${spacing[1]} ${spacing[3]};
  border-radius: ${borderRadius.full};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  background: ${props => {
    switch (props.status) {
      case 'online': return colors.primary[50];
      case 'offline': return colors.neutral[100];
      case 'pending': return colors.warning[50];
      default: return colors.neutral[100];
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'online': return colors.primary[600];
      case 'offline': return colors.text.secondary;
      case 'pending': return colors.warning[600];
      default: return colors.text.secondary;
    }
  }};
  
  &:before {
    content: '';
    display: ${props => props.status === 'online' ? 'block' : 'none'};
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${colors.primary[500]};
    margin-right: ${spacing[2]};
    animation: ${pulse} 2s infinite;
  }
`;

// Layout components
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 3}, 1fr);
  gap: ${props => spacing[props.gap] || spacing[6]};
  
  ${responsive.tablet} {
    grid-template-columns: repeat(${props => Math.min(props.columns || 3, 2)}, 1fr);
  }
  
  ${responsive.mobile} {
    grid-template-columns: 1fr;
    gap: ${props => spacing[props.mobileGap] || spacing[props.gap] || spacing[4]};
  }
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => spacing[props.gap] || spacing[4]};
  flex-wrap: ${props => props.wrap || 'nowrap'};
`;

// Typography components
export const Title = styled.h1`
  font-size: ${props => {
    switch (props.size) {
      case 'xl': return typography.fontSize['5xl'];
      case 'lg': return typography.fontSize['4xl'];
      case 'md': return typography.fontSize['3xl'];
      case 'sm': return typography.fontSize['2xl'];
      default: return typography.fontSize['4xl'];
    }
  }};
  line-height: ${typography.lineHeight.tight};
  font-weight: ${typography.fontWeight.extrabold};
  margin-bottom: ${props => props.mb || spacing[4]};
  color: ${colors.text.primary};
  letter-spacing: ${typography.letterSpacing.tight};
  
  ${responsive.mobile} {
    font-size: ${props => {
    switch (props.size) {
      case 'xl': return typography.fontSize['4xl'];
      case 'lg': return typography.fontSize['3xl'];
      case 'md': return typography.fontSize['2xl'];
      case 'sm': return typography.fontSize['xl'];
      default: return typography.fontSize['3xl'];
    }
  }};
  }
`;

export const Subtitle = styled.h2`
  font-size: ${props => props.size === 'lg' ? typography.fontSize['2xl'] : typography.fontSize.xl};
  line-height: ${typography.lineHeight.snug};
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: ${props => props.mb || spacing[3]};
  color: ${colors.text.primary};
`;

export const Text = styled.p`
  font-size: ${props => props.size === 'sm' ? typography.fontSize.sm : typography.fontSize.base};
  line-height: ${typography.lineHeight.relaxed};
  color: ${props => props.muted ? colors.text.secondary : colors.text.primary};
  margin-bottom: ${props => props.mb || spacing[4]};
`;

// Divider
export const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: ${colors.border.light};
  margin: ${props => props.my || spacing[6]} 0;
  width: 100%;
`;

// Loader
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Loader = styled.div`
  width: ${props => props.size || '24px'};
  height: ${props => props.size || '24px'};
  border: 2px solid ${colors.primary[100]};
  border-radius: 50%;
  border-top-color: ${colors.primary[600]};
  animation: ${spin} 0.8s linear infinite;
  margin: ${props => props.center ? '0 auto' : '0'};
`;

const DesignSystem = {
  Container,
  Section,
  Card,
  FeatureCard,
  Button,
  IconButton,
  FormGroup,
  Label,
  Input,
  Select,
  Checkbox,
  ErrorMessage,
  NavBar,
  NavLogo,
  NavLinks,
  NavLink,
  StatusBadge,
  Grid,
  Flex,
  Title,
  Subtitle,
  Text,
  Divider,
  Loader
};

export default DesignSystem;