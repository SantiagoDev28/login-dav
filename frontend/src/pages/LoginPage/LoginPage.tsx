import { AuthTemplate } from '../../templates/AuthTemplate';
import { LoginForm } from '../../organisms/Login/LoginForm';
import type { LoginFormData } from '../../organisms/Login/LoginForm';
import { useLogin } from '../../application/use-cases/auth/login';
import { AuthHttpRepository } from '../../infrastructure/repositories';
import styles from './LoginPage.module.css';

// 🔌 Crear instancia del repositorio
const authRepository = new AuthHttpRepository();

export const LoginPage = () => {
  // Hook con inyección de dependencia
  const { login, isLoading, error, isAuthenticated } = useLogin(authRepository);
  
  const handleSubmit = async (data: LoginFormData) => {
    await login(data);
  };
  
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
  
  return (
    <AuthTemplate title="Iniciar Sesión">
      <LoginForm 
        onSubmit={handleSubmit}
        isLoading={isLoading}
        errorMessage={error || undefined}
      />
      
      <div className={styles.testCredentials}>
        <p><strong>Credenciales de prueba:</strong></p>
        <p>Email: <code>admin@example.com</code></p>
        <p>Password: <code>123456</code></p>
      </div>
    </AuthTemplate>
  );
}