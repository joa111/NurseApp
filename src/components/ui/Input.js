import React, { forwardRef } from 'react';

const Input = forwardRef((
  { 
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    disabled,
    required,
    size = 'md',
    type = 'text',
    className = '',
    ...props 
  }, 
  ref
) => {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  // Build CSS classes
  const formGroupClasses = 'form-group';
  const labelClasses = [
    'form-label',
    required ? 'form-label--required' : '',
    className
  ].filter(Boolean).join(' ');
  
  const inputClasses = [
    'form-input',
    `form-input--${size}`,
    error ? 'form-input--error' : '',
    leftIcon ? 'form-input--has-left-icon' : '',
    rightIcon ? 'form-input--has-right-icon' : ''
  ].filter(Boolean).join(' ');
  
  const messageClasses = error ? 'form-message--error' : 'form-message--info';
  
  return (
    <div className={formGroupClasses}>
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
        </label>
      )}
      
      <div className="form-input-container">
        {leftIcon && (
          <div className="form-input-icon form-input-icon--left">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={inputClasses}
          disabled={disabled}
          required={required}
          {...props}
        />
        
        {rightIcon && (
          <div className="form-input-icon form-input-icon--right">
            {rightIcon}
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <div className={messageClasses}>
          {error || helperText}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;