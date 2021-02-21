import React, { ChangeEvent, useState, useCallback } from 'react';
import { store } from 'react-notifications-component';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import IDevForm from '../../interfaces/devForm';
import api from '../../services/api';

import { Background, Container, Content, Form, FormActions } from './styles';

const SignUpDev: React.FC = () => {
  const history = useHistory();

  const [model, setModel] = useState<IDevForm>({
    name: '',
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
        await api.post('/users', model);

        store.addNotification({
          title: 'Sucesso!',
          message: 'Usuário cadastrado!',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate_fadeOut'],
          dismiss: {
            duration: 2000,
          },
        });

        history.push('/dev/signin');
      } catch (err) {
        if (err.response.status === 302) {
          store.addNotification({
            title: 'Erro!',
            message: 'Este usuário já se encontra cadastrado!',
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
    [model, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <Form onSubmit={onSubmit}>
          <h1>Cadastro de DEV</h1>
          <Input
            type="text"
            placeholder="Seu nome"
            icon={FaUser}
            name="name"
            value={model.name}
            onChange={updateModel}
          />
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
          <Button type="submit">Cadastrar</Button>
          <FormActions>
            <Link to="/dev/signin">Já tenho conta</Link>
            <Link to="/">Voltar</Link>
          </FormActions>
        </Form>
      </Content>
    </Container>
  );
};

export default SignUpDev;
