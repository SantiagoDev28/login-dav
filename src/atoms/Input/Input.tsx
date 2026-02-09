import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

// Extendemos las props nativas del input HTML
// Esto significa: "Acepta TODAS las props de un <input> + las que yo defina"
type InputProps = InputHTMLAttributes<HTMLInputElement>;

// 🧩 El componente
export const Input = ({ className = '', ...props }: InputProps) => {
  // Combinamos estilos del módulo + estilos externos (si vienen)
  const inputClassName = `${styles.input} ${className}`.trim();
  
  return (
    <input 
      className={inputClassName}
      {...props}  // Pasamos TODAS las props restantes al input
    />
  );
}