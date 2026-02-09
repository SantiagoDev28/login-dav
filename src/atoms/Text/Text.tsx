// 📦 Importamos ReactNode para tipar children
import { ReactNode } from 'react';
import styles from './Text.module.css';

// Definimos los tipos que recibira nuestro componente
type TextProps = {
  children: ReactNode;                              // Lo que va dentro del componente
  variant?: 'default' | 'error' | 'success';       // Estilos: default | error | success
  as?: 'p' | 'span' | 'small';                     // Etiqueta HTML a usar
}

// El componente
export const Text = ({ 
  children, 
  variant = 'default',  // Valor por defecto si no se pasa
  as = 'p'              // Por defecto será un <p>
}: TextProps) => {
  
  // Elegimos qué etiqueta HTML renderizar
  const Tag = as; // 'p' | 'span' | 'small'
  
  // Construimos la clase CSS según la variante
  const className = `${styles.text} ${styles[variant]}`;
  
  // Renderizamos
  return <Tag className={className}>{children}</Tag>;
}