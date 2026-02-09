import { ReactNode, HTMLAttributes } from "react";
import styles from "./Text.module.css";

// Extendemos con HTMLAttributes para permitir props HTML nativas
type TextProps = {
  children: ReactNode;
  variant?: "default" | "error" | "success";
  as?: "p" | "span" | "small";
} & HTMLAttributes<HTMLElement>; // Ahora acepta id, className, onClick, etc.

export const Text = ({
  children,
  variant = "default",
  as = "p",
  className = "", // Extraemos className para combinarlo
  ...props // Resto de props HTML (id, style, onClick, etc.)
}: TextProps) => {
  const Tag = as;

  // Combinamos estilos del módulo + className externa
  const textClassName = `${styles.text} ${styles[variant]} ${className}`.trim();

  return (
    <Tag
      className={textClassName}
      {...props} // Pasamos todas las props HTML (incluye id)
    >
      {children}
    </Tag>
  );
};
