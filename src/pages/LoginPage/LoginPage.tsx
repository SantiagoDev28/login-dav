import { AuthTemplate } from '../../templates/AuthTemplate';
import { LoginForm } from '../../organisms/Login/LoginForm';
import type { LoginFormData } from '../../organisms/Login/LoginForm';
import { useLogin } from '../../hooks/useLogin';
import styles from './LoginPage.module.css';

export const LoginPage = () => {
  
  // Hook que maneja toda la lógica de login
  const { login, isLoading, error, isAuthenticated } = useLogin();
  
  // Handler que se pasa al formulario
  const handleSubmit = async (data: LoginFormData) => {
    await login(data);
  };
  
  // Si está autenticado, mostrar mensaje de éxito
  if (isAuthenticated) {
    return (
      <AuthTemplate>
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>✓</div>
          <h2>¡Inicio de sesión exitoso!</h2>
          <p>Redirigiendo al dashboard...</p>
        </div>
      </AuthTemplate>
    );
  }
  
  // Mostrar formulario de login
  return (
    <AuthTemplate title="Iniciar Sesión">
      <LoginForm 
        onSubmit={handleSubmit}
        isLoading={isLoading}
        errorMessage={error || undefined}
      />
      
      {/* Ayuda para testing */}
      <div className={styles.testCredentials}>
        <p><strong>Credenciales de prueba:</strong></p>
        <p>Email: <code>admin@example.com</code></p>
        <p>Password: <code>123456</code></p>
      </div>
    </AuthTemplate>
  );
}