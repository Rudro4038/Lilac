import React from 'react';

const GeneralButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  ...props
}) => {
  const baseClasses = `
        font-medium rounded-xl transition-all duration-300 transform
        focus:outline-none 
        active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg hover:shadow-xl
    `;

  const variants = {
    primary: `
            bg-gradient-to-r from-[#400E32] to-[#5A1A42] 
            text-[#F2CD5C] border-2 border-[#F2CD5C]/30
            hover:from-[#5A1A42] hover:to-[#400E32] 
            hover:border-[#F2CD5C] hover:shadow-[#F2CD5C]/25
            focus:ring-[#F2CD5C]/50
        `,
    secondary: `
            bg-gradient-to-r from-[#F2CD5C] to-[#E6B414]
            text-[#400E32] border-2 border-[#400E32]/30
            hover:from-[#E6B414] hover:to-[#F2CD5C]
            hover:border-[#400E32] hover:shadow-[#400E32]/25
            focus:ring-[#400E32]/50
        `,
    outline: `
            bg-transparent border-2 border-[#F2CD5C]
            text-[#F2CD5C] hover:bg-[#F2CD5C] hover:text-[#400E32]
            hover:shadow-[#F2CD5C]/25 focus:ring-[#F2CD5C]/50
        `,
    ghost: `
            bg-transparent text-[#F2CD5C] border-2 border-transparent
            hover:bg-[#F2CD5C]/10 hover:border-[#F2CD5C]/30
            focus:ring-[#F2CD5C]/50
        `,
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const classes = `
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
    `
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <button className={classes} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default GeneralButton;
