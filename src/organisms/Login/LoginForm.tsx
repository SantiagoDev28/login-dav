import { useState } from 'react';
import { FormField } from '../../molecules/FormField';
import { LoginActions } from '../../molecules/LoginActions';
import styles from './LoginForm.module.css';

// Modelo de datos del formulario
export type LoginFormData = {
  email: string;
  password: string;
}

// Modelo de errores de validación
type LoginFormErrors = {
  email?: string;
  password?: string;
}

// Props del organismo
type LoginFormProps = {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
  errorMessage?: string;
}

// El componente
export const LoginForm = ({ 
  onSubmit, 
  isLoading = false,
  errorMessage 
}: LoginFormProps) => {
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<LoginFormErrors>({});
  
  // Usamos React.ChangeEvent directamente
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof LoginFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const validate = (): boolean => {
    const newErrors: LoginFormErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Usamos React.FormEvent directamente
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <FormField 
        label="Correo electrónico"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="tu@email.com"
        disabled={isLoading}
        autoComplete="email"
        required
      />
      
      <FormField 
        label="Contraseña"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="••••••••"
        disabled={isLoading}
        autoComplete="current-password"
        required
      />
      
      <LoginActions 
        isLoading={isLoading}
        onSubmit={() => {}}
        errorMessage={errorMessage}
      />
    </form>
  );
}