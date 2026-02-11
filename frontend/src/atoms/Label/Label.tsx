import type { ReactNode } from 'react';
import styles from './Label.module.css';

// Props del componente
type LabelProps = {
  children: ReactNode;    // OBLIGATORIO - El texto del label
  htmlFor?: string;       // OPCIONAL - ID del input asociado
}

// El componente
export const Label = ({ children, htmlFor }: LabelProps) => {
  return (
    <label 
      htmlFor={htmlFor}      // Puede ser undefined 
      className={styles.label}
    >
      {children}
    </label>
  );
}