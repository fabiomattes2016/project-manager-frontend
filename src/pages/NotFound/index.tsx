import React from 'react';
import { FaBan } from 'react-icons/fa';

import { Container, EntryCard, EntryCardItem } from './styles';
import logo from '../../assets/logo.png';

const NotFound: React.FC = () => {
  return (
    <Container>
      <img src={logo} alt="Project Manager" />

      <EntryCard>
        <EntryCardItem>
          <FaBan size={50} />
          <span>Página não encontrada!!!</span>
        </EntryCardItem>
      </EntryCard>
    </Container>
  );
};

export default NotFound;
