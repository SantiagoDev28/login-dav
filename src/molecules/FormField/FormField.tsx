import type { InputHTMLAttributes } from "react";
import { Label } from "../../atoms/Label";
import { Input } from "../../atoms/Input";
import { Text } from "../../atoms/Text";
import styles from "./FormField.module.css";

// Props de FormField
type FormFieldProps = {
  label: string; // Obligatorio - Texto del label
  name: string; // Obligatorio - ID/name del input
  error?: string; // Opcional - Mensaje de error
} & InputHTMLAttributes<HTMLInputElement>; // todas las props del input

// El componente
export const FormField = ({
  label,
  name,
  error,
  className = "",
  ...inputProps // Todas las demás props (value, onChange, type, etc.)
}: FormFieldProps) => {
  // Clase del contenedor
  const containerClassName = `${styles.formField} ${className}`.trim();

  return (
    <div className={containerClassName}>
      {/* Label - Asociado al input mediante htmlFor */}
      <Label htmlFor={name}>{label}</Label>

      {/* Input - Recibe TODAS las props restantes */}
      <Input
        id={name} // Conecta con el Label
        name={name} // Para formularios
        aria-invalid={!!error} // Accesibilidad: indica si hay error
        aria-describedby={error ? `${name}-error` : undefined}
        {...inputProps} // value, onChange, type, placeholder, etc.
      />

      {/* Mensaje de error - Solo se muestra si existe */}
      {error && (
        <Text
          variant="error"
          as="small"
          id={`${name}-error`} // Para aria-describedby
        >
          {error}
        </Text>
      )}
    </div>
  );
};
