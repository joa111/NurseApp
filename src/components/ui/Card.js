import React from 'react';

const Card = ({ 
  children, 
  variant = 'default',
  size = 'md',
  elevation = 'sm',
  hoverable = true,
  loading = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  // Build CSS classes
  const baseClasses = 'card';
  const variantClass = variant !== 'default' ? `card--${variant}` : '';
  const sizeClass = size !== 'md' ? `card--${size}` : '';
  const elevationClass = elevation !== 'sm' ? `card--${elevation}` : '';
  const hoverableClass = hoverable ? 'card--hoverable' : '';
  const loadingClass = loading ? 'card--loading' : '';
  const disabledClass = disabled ? 'card--disabled' : '';
  
  const classes = [
    baseClasses,
    variantClass,
    sizeClass,
    elevationClass,
    hoverableClass,
    loadingClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Card sub-components
const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`card__header ${className}`} {...props}>
    {children}
  </div>
);

const CardBody = ({ children, className = '', ...props }) => (
  <div className={`card__body ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`card__footer ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`card__title ${className}`} {...props}>
    {children}
  </h3>
);

const CardSubtitle = ({ children, className = '', ...props }) => (
  <p className={`card__subtitle ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`card__content ${className}`} {...props}>
    {children}
  </div>
);

const CardActions = ({ 
  children, 
  align = 'right',
  className = '', 
  ...props 
}) => {
  const alignClass = align !== 'right' ? `card__actions--${align}` : '';
  const classes = [
    'card__actions',
    alignClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const CardMedia = ({ 
  src, 
  alt, 
  size = 'md',
  className = '', 
  ...props 
}) => {
  const sizeClass = size !== 'md' ? `card__media--${size}` : '';
  const classes = [
    'card__media',
    sizeClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <img 
      src={src} 
      alt={alt} 
      className={classes} 
      {...props} 
    />
  );
};

const CardBadge = ({ 
  children, 
  variant = 'default',
  className = '', 
  ...props 
}) => {
  const variantClass = variant !== 'default' ? `card__badge--${variant}` : '';
  const classes = [
    'card__badge',
    variantClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

// Attach sub-components to main Card component
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Content = CardContent;
Card.Actions = CardActions;
Card.Media = CardMedia;
Card.Badge = CardBadge;

export default Card;