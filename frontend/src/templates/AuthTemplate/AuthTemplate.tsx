import type { ReactNode } from 'react';
import styles from './AuthTemplate.module.css';

type AuthTemplateProps = {
  children: ReactNode;
  title?: string;
}

export const AuthTemplate = ({ children, title }: AuthTemplateProps) => {
  return (
    <div className={styles.authTemplate}>
      <div className={styles.container}>
        {title && (
          <div className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
          </div>
        )}
        
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}