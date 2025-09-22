// src/components/ui/DesignSystem.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

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

// Container components
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const Section = styled.section`
  margin: 3rem 0;
  animation: ${fadeIn} 0.5s ease-out;
`;

// Card components
export const Card = styled.div`
  background: linear-gradient(180deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9));
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  padding: ${props => props.padding || '1.5rem'};
  box-shadow: 0 1px 3px rgba(148, 163, 184, 0.1), 0 1px 2px rgba(148, 163, 184, 0.06);
  backdrop-filter: blur(6px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15), 0 2px 4px rgba(59, 130, 246, 0.08);
  }
`;

export const FeatureCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.75rem;
  
  h3 {
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  p {
    margin-bottom: 0;
    flex-grow: 1;
  }
  
  svg {
    color: #059669;
  }
`;

// Button components
export const Button = styled.button`
  appearance: none;
  border: 0;
  border-radius: 12px;
  padding: 0.85rem 1.25rem;
  font-weight: 600;
  font-size: ${props => props.size === 'large' ? '1.125rem' : '1rem'};
  color: ${props => props.variant === 'secondary' ? '#334155' : '#ffffff'};
  background: ${props => props.variant === 'secondary' 
    ? 'linear-gradient(180deg, #f8fafc, #e2e8f0)'
    : 'linear-gradient(180deg, #059669, #047857)'};
  box-shadow: ${props => props.variant === 'secondary'
    ? '0 2px 8px rgba(148, 163, 184, 0.25)'
    : '0 4px 12px rgba(5, 150, 105, 0.3)'};
  cursor: pointer;
  transition: transform 0.04s ease, filter 0.2s ease, box-shadow 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    filter: brightness(1.05);
    box-shadow: ${props => props.variant === 'secondary'
      ? '0 4px 12px rgba(148, 163, 184, 0.3)'
      : '0 6px 16px rgba(5, 150, 105, 0.4)'};
  }
  
  &:active {
    transform: translateY(1px);
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
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: linear-gradient(180deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9));
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: linear-gradient(180deg, rgba(240, 253, 250, 0.95), rgba(236, 253, 245, 0.9));
    color: #059669;
    transform: translateY(-1px);
    border-color: #a7f3d0;
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
  margin-bottom: 1.25rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
`;

export const Input = styled.input`
  width: 100%;
  background: #ffffff;
  border: 1px solid #d1d5db;
  color: #374151;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  font-size: 1rem;
  
  &::placeholder {
    color: #9ca3af;
  }
  
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    background: #fefefe;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #f9fafb;
  }
`;

export const Select = styled.select`
  width: 100%;
  background: #ffffff;
  border: 1px solid #d1d5db;
  color: #374151;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  font-size: 1rem;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%239ca3af' viewBox='0 0 16 16'%3E%3Cpath d='M8 11.5l-5-5 1.5-1.5L8 8.5 11.5 5 13 6.5l-5 5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const Checkbox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  
  input {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    margin-right: 0.75rem;
    background: #ffffff;
    position: relative;
    cursor: pointer;
    
    &:checked {
      background: #059669;
      border-color: #059669;
      
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
      box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
    }
  }
  
  label {
    cursor: pointer;
    user-select: none;
    color: #374151;
  }
`;

export const ErrorMessage = styled.p`
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
  animation: ${slideUp} 0.2s ease-out;
`;

// Navigation components
export const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95));
  border-bottom: 1px solid #e2e8f0;
  backdrop-filter: blur(8px);
  position: sticky;
  top: 0;
  z-index: 50;
  transition: padding 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

export const NavLogo = styled(Link)`
  font-weight: 800;
  font-size: 1.25rem;
  color: #1f2937;
  text-decoration: none;
  letter-spacing: 0.2px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #059669;
  }
  
  svg {
    color: #059669;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  
  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #64748b;
  font-weight: 600;
  position: relative;
  padding: 0.25rem 0;
  transition: color 0.2s ease;
  
  &:hover {
    color: #059669;
  }
  
  &.active {
    color: #059669;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: #059669;
      border-radius: 2px;
      animation: ${slideUp} 0.2s ease-out;
    }
  }
`;

// Status indicators
export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${props => {
    switch(props.status) {
      case 'online': return 'rgba(34, 197, 94, 0.15)';
      case 'offline': return 'rgba(156, 163, 175, 0.15)';
      case 'pending': return 'rgba(251, 191, 36, 0.15)';
      case 'confirmed': return 'rgba(59, 130, 246, 0.15)';
      case 'completed': return 'rgba(139, 92, 246, 0.15)';
      default: return 'rgba(156, 163, 175, 0.15)';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'online': return '#059669';
      case 'offline': return '#6b7280';
      case 'pending': return '#d97706';
      case 'confirmed': return '#2563eb';
      case 'completed': return '#7c3aed';
      default: return '#6b7280';
    }
  }};
  
  &:before {
    content: '';
    display: ${props => props.status === 'online' ? 'block' : 'none'};
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    margin-right: 0.5rem;
    animation: ${pulse} 2s infinite;
  }
`;

// Layout components
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 3}, 1fr);
  gap: ${props => props.gap || '1.5rem'};
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(${props => Math.min(props.columns || 3, 2)}, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.gap || '1rem'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
`;

// Typography components
export const Title = styled.h1`
  font-size: ${props => {
    switch(props.size) {
      case 'xl': return '3rem';
      case 'lg': return '2.25rem';
      case 'md': return '1.75rem';
      case 'sm': return '1.5rem';
      default: return '2.25rem';
    }
  }};
  line-height: 1.2;
  font-weight: 800;
  margin-bottom: ${props => props.mb || '1rem'};
  color: #1f2937;
  
  @media (max-width: 768px) {
    font-size: ${props => {
      switch(props.size) {
        case 'xl': return '2.5rem';
        case 'lg': return '2rem';
        case 'md': return '1.5rem';
        case 'sm': return '1.25rem';
        default: return '2rem';
      }
    }};
  }
`;

export const Subtitle = styled.h2`
  font-size: ${props => props.size === 'lg' ? '1.5rem' : '1.25rem'};
  line-height: 1.4;
  font-weight: 600;
  margin-bottom: ${props => props.mb || '0.75rem'};
  color: #374151;
`;

export const Text = styled.p`
  font-size: ${props => props.size === 'sm' ? '0.875rem' : '1rem'};
  line-height: 1.7;
  color: ${props => props.muted ? '#6b7280' : '#374151'};
  margin-bottom: ${props => props.mb || '1rem'};
`;

// Divider
export const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: #e5e7eb;
  margin: ${props => props.my || '1.5rem'} 0;
  width: 100%;
`;

// Loader
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Loader = styled.div`
  width: ${props => props.size || '24px'};
  height: ${props => props.size || '24px'};
  border: 2px solid rgba(5, 150, 105, 0.2);
  border-radius: 50%;
  border-top-color: #059669;
  animation: ${spin} 0.8s linear infinite;
  margin: ${props => props.center ? '0 auto' : '0'};
`;

export default {
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