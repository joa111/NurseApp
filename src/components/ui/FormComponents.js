// src/components/ui/FormComponents.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Form Container
const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--surface-1);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
`;

// Form Title
const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text);
  text-align: center;
`;

// Form Group
const FormGroup = styled.div`
  margin-bottom: 1.25rem;
  position: relative;
`;

// Label
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text);
`;

// Input Field
const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--surface-2);
  color: var(--text);
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px var(--primary-transparent);
  }
  
  &::placeholder {
    color: var(--text-muted);
  }
  
  &:disabled {
    background-color: var(--surface-3);
    cursor: not-allowed;
  }
  
  &.error {
    border-color: var(--error);
  }
`;

// Textarea
const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--surface-2);
  color: var(--text);
  transition: all 0.2s ease;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px var(--primary-transparent);
  }
  
  &::placeholder {
    color: var(--text-muted);
  }
  
  &:disabled {
    background-color: var(--surface-3);
    cursor: not-allowed;
  }
  
  &.error {
    border-color: var(--error);
  }
`;

// Select
const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--surface-2);
  color: var(--text);
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px var(--primary-transparent);
  }
  
  &:disabled {
    background-color: var(--surface-3);
    cursor: not-allowed;
  }
  
  &.error {
    border-color: var(--error);
  }
`;

// Checkbox Container
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

// Checkbox Input (hidden)
const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

// Checkbox Label
const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-size: 0.875rem;
  color: var(--text);
`;

// Custom Checkbox
const CustomCheckbox = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 0.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background-color: var(--surface-2);
  position: relative;
  transition: all 0.2s ease;
  
  ${CheckboxInput}:checked + ${CheckboxLabel} & {
    background-color: var(--primary);
    border-color: var(--primary);
  }
  
  ${CheckboxInput}:checked + ${CheckboxLabel} &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 8px;
    height: 8px;
    background-color: white;
    border-radius: 1px;
  }
  
  ${CheckboxInput}:focus + ${CheckboxLabel} & {
    box-shadow: 0 0 0 2px var(--primary-transparent);
  }
`;

// Radio Group
const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

// Radio Container
const RadioContainer = styled.div`
  display: flex;
  align-items: center;
`;

// Radio Input (hidden)
const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

// Radio Label
const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-size: 0.875rem;
  color: var(--text);
`;

// Custom Radio
const CustomRadio = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 50%;
  background-color: var(--surface-2);
  position: relative;
  transition: all 0.2s ease;
  
  ${RadioInput}:checked + ${RadioLabel} & {
    border-color: var(--primary);
  }
  
  ${RadioInput}:checked + ${RadioLabel} &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 8px;
    height: 8px;
    background-color: var(--primary);
    border-radius: 50%;
  }
  
  ${RadioInput}:focus + ${RadioLabel} & {
    box-shadow: 0 0 0 2px var(--primary-transparent);
  }
`;

// Error Message
const ErrorMessage = styled(motion.div)`
  color: var(--error);
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &::before {
    content: '⚠️';
    font-size: 0.875rem;
  }
`;

// Helper Text
const HelperText = styled.div`
  color: var(--text-muted);
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

// Form Actions
const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    
    button {
      width: 100%;
    }
  }
`;

// Submit Button
const SubmitButton = styled.button`
  background: linear-gradient(to right, var(--primary), var(--primary-dark));
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: var(--surface-3);
    color: var(--text-muted);
    cursor: not-allowed;
    transform: none;
  }
`;

// Cancel Button
const CancelButton = styled.button`
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--surface-2);
  }
  
  &:active {
    background: var(--surface-3);
  }
`;

// Loading Spinner
const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// Form Field Component (with validation)
const FormField = ({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  helperText,
  required = false,
  disabled = false,
  ...props 
}) => {
  return (
    <FormGroup>
      {label && (
        <Label htmlFor={name}>
          {label} {required && <span style={{ color: 'var(--error)' }}>*</span>}
        </Label>
      )}
      
      {type === 'textarea' ? (
        <Textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={error ? 'error' : ''}
          disabled={disabled}
          {...props}
        />
      ) : (
        <Input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={error ? 'error' : ''}
          disabled={disabled}
          {...props}
        />
      )}
      
      {helperText && !error && <HelperText>{helperText}</HelperText>}
      
      {error && (
        <ErrorMessage
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {error}
        </ErrorMessage>
      )}
    </FormGroup>
  );
};

// Checkbox Component
const Checkbox = ({ 
  label, 
  name, 
  checked, 
  onChange, 
  disabled = false,
  ...props 
}) => {
  return (
    <CheckboxContainer>
      <CheckboxInput
        id={name}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <CheckboxLabel htmlFor={name}>
        <CustomCheckbox />
        {label}
      </CheckboxLabel>
    </CheckboxContainer>
  );
};

// Radio Button Component
const Radio = ({ 
  label, 
  name, 
  value, 
  checked, 
  onChange, 
  disabled = false,
  ...props 
}) => {
  return (
    <RadioContainer>
      <RadioInput
        id={`${name}-${value}`}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <RadioLabel htmlFor={`${name}-${value}`}>
        <CustomRadio />
        {label}
      </RadioLabel>
    </RadioContainer>
  );
};

// Select Component
const SelectField = ({ 
  label, 
  name, 
  options, 
  value, 
  onChange, 
  placeholder = 'Select an option', 
  error,
  helperText,
  required = false,
  disabled = false,
  ...props 
}) => {
  return (
    <FormGroup>
      {label && (
        <Label htmlFor={name}>
          {label} {required && <span style={{ color: 'var(--error)' }}>*</span>}
        </Label>
      )}
      
      <Select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? 'error' : ''}
        disabled={disabled}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      
      {helperText && !error && <HelperText>{helperText}</HelperText>}
      
      {error && (
        <ErrorMessage
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {error}
        </ErrorMessage>
      )}
    </FormGroup>
  );
};

// Form with validation
const Form = ({ onSubmit, children, ...props }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} noValidate {...props}>
      {children}
    </form>
  );
};

// Submit Button with loading state
const SubmitButtonWithLoading = ({ children, isLoading, ...props }) => {
  return (
    <SubmitButton disabled={isLoading} {...props}>
      {isLoading ? <Spinner /> : children}
    </SubmitButton>
  );
};

export {
  FormContainer,
  FormTitle,
  FormGroup,
  Label,
  Input,
  Textarea,
  Select,
  CheckboxContainer,
  CheckboxInput,
  CheckboxLabel,
  CustomCheckbox,
  RadioGroup,
  RadioContainer,
  RadioInput,
  RadioLabel,
  CustomRadio,
  ErrorMessage,
  HelperText,
  FormActions,
  SubmitButton,
  CancelButton,
  Spinner,
  FormField,
  Checkbox,
  Radio,
  SelectField,
  Form,
  SubmitButtonWithLoading
};