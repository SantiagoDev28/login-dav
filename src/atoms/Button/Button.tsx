import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

// Extendemos las props nativas del button + añadimos variant y children
type ButtonProps = {
  variant?: 'primary' | 'secondary';  // Tipo visual del botón
  children: ReactNode;                 // Texto/contenido del botón
} & ButtonHTMLAttributes<HTMLButtonElement>;  // Todas las props del <button>

// El componente
export const Button = ({ 
  variant = 'primary',   // Por defecto será primary
  children,
  className = '',
  disabled = false,      // Por defecto NO está deshabilitado
  type = 'button',       // Por defecto tipo "button" (no "submit")
  ...props 
}: ButtonProps) => {
  
  // Construimos las clases CSS
  const buttonClassName = `${styles.button} ${styles[variant]} ${className}`.trim();
  
  return (
    <button 
      className={buttonClassName}
      disabled={disabled}
      type={type}
      {...props}  // Resto de props (onClick, onFocus, etc.)
    >
      {children}
    </button>
  );
}