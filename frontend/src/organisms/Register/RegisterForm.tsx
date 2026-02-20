import React, { useState } from 'react';
import type { IAuthRepository } from '../../domain/auth/repositories';
import { useRegister } from '../../application/use-cases/auth/register/use-register.hook';
import { FormField } from '../../molecules/FormField';
import { LoginActions } from '../../molecules/LoginActions';
import styles from './RegisterForm.module.css'

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
}

type Props = {
  authRepository: IAuthRepository;
}

export const RegisterForm = ({ authRepository }: Props) => {
  const { register, isLoading, error } = useRegister(authRepository);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({ name, email, password });
  };

  return (
    <form onSubmit={onSubmit} className={styles.loginForm}>
      <FormField
        label="Nombre"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre"
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email@ejemplo.com"
      />

      <FormField
        label="Contraseña"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />

      <LoginActions
        isLoading={isLoading}
        onSubmit={() => {}}
        errorMessage={error}
        submitLabel="Registrarse"
        loadingLabel="Registrando..."
      />

      <div className={styles.registerLink}>
        <p>¿Ya tienes una cuenta? <a href="#/login">Inicia sesión</a></p>
      </div>
    </form>
  );
};

export default RegisterForm;
