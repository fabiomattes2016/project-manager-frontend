import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { store } from 'react-notifications-component';
import { AuthContext } from '../../context/auth';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background, Form, FormActions } from './styles';
import api from '../../services/api';
import ICredentialsDev from '../../interfaces/credentialsDev';

const SignInDev: React.FC = () => {
  const history = useHistory();
  const { user, signInDev } = useContext(AuthContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const [model, setModel] = useState<ICredentialsDev>({
    email: '',
    password: '',
  });

  const updateModel = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setModel({
        ...model,
        [e.target.name]: e.target.value,
      });
    },
    [model],
  );

  const onSubmit = useCallback(
    async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        await signInDev(model);

        store.addNotification({
          title: 'Sucesso!',
          message: 'Login efetuado com sucesso!',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate_fadeOut'],
          dismiss: {
            duration: 2000,
          },
        });

        // history.push('/dev/signin');
      } catch (err) {
        if (err.response.status === 401) {
          store.addNotification({
            title: 'Erro!',
            message: 'Credenciais inválidas!',
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate_fadeOut'],
            dismiss: {
              duration: 2000,
            },
          });
        }

        if (err.response.status === 500) {
          store.addNotification({
            title: 'Erro!',
            message: 'Ocorreu um erro interno!',
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate_fadeOut'],
            dismiss: {
              duration: 2000,
            },
          });
        }
      }
    },
    [model, signInDev],
  );

  return (
    <Container>
      <Content>
        <Form onSubmit={onSubmit}>
          <h1>Login como DEV</h1>
          <Input
            type="email"
            placeholder="Seu e-mail"
            icon={FaEnvelope}
            name="email"
            value={model.email}
            onChange={updateModel}
          />
          <Input
            type="password"
            isPassword
            placeholder="Sua senha"
            icon={FaLock}
            name="password"
            value={model.password}
            onChange={updateModel}
          />
          <Button type="submit">Entrar</Button>
          <FormActions>
            <Link to="/dev/signup">Faça seu cadastro</Link>
            <Link to="/">Voltar</Link>
          </FormActions>
        </Form>
      </Content>
      <Background />
    </Container>
  );
};

export default SignInDev;
