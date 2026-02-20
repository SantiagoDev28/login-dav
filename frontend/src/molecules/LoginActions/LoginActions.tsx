import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import styles from './LoginActions.module.css';

// Props del componente
type LoginActionsProps = {
  isLoading: boolean;           // Obligatorio - Estado de carga
  onSubmit: () => void;         // Obligatorio - Callback al hacer submit
  errorMessage?: string;        // Opcional - Mensaje de error general
  submitLabel?: string;         // Opcional - Texto del botón cuando no está cargando
  loadingLabel?: string;        // Opcional - Texto del botón cuando está cargando
}

// El componente
export const LoginActions = ({ 
  isLoading, 
  onSubmit,
  errorMessage 
  , submitLabel = 'Iniciar sesión', loadingLabel = 'Iniciando sesión...'
}: LoginActionsProps) => {
  
  return (
    <div className={styles.loginActions}>
      {/* Mensaje de error general - Solo se muestra si existe */}
      {errorMessage && (
        <Text variant="error" as="span">
          {errorMessage}
        </Text>
      )}
      
      {/* Botón de submit */}
      <Button
        type="submit"              // Es un botón de formulario
        onClick={onSubmit}         // Ejecuta el callback
        disabled={isLoading}       // Deshabilitado durante carga
        className={styles.submitButton}
      >
        {isLoading ? loadingLabel : submitLabel}
      </Button>
    </div>
  );
}