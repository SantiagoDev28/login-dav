import React from 'react';
import { AuthTemplate } from '../../templates/AuthTemplate';
import { AuthHttpRepository } from '../../infrastructure/repositories';
import RegisterForm from '../../organisms/Register/RegisterForm';
import styles from './RegisterPage.module.css';

const authRepo = new AuthHttpRepository();

export const RegisterPage = () => {
  return (
    <AuthTemplate title="Registro">
      <RegisterForm authRepository={authRepo} />

      <div className={styles.testCredentials}>
        <p><strong>Nota:</strong> Usa un email válido y una contraseña de al menos 6 caracteres.</p>
      </div>
    </AuthTemplate>
  );
};

export default RegisterPage;
