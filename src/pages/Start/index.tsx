import React, { useCallback } from 'react';
import { FaCode, FaUsers } from 'react-icons/fa';

import { useHistory } from 'react-router-dom';
import { Container, EntryCard, EntryCardItem } from './styles';
import logo from '../../assets/logo.png';

const Start: React.FC = () => {
  const history = useHistory();

  const navigate = useCallback(
    (path: string) => {
      history.push(path);
    },
    [history],
  );

  return (
    <Container>
      <img src={logo} alt="Project Manager" />

      <EntryCard>
        <EntryCardItem onClick={() => navigate('/dev/signin')}>
          <FaCode size={50} />
          <span>Entrar como Dev</span>
        </EntryCardItem>

        <EntryCardItem
          color="#fff"
          background="#111111"
          onClick={() => navigate('/client/signin')}
        >
          <FaUsers size={50} />
          <span>Entrar como Cliente</span>
        </EntryCardItem>
      </EntryCard>
    </Container>
  );
};

export default Start;
