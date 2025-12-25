import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setNavigationHandler } from '@app/services/graphqlClient';
import type { childrenType } from '@app/types';

const AuthNavigationProvider: React.FC<childrenType> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigationHandler(() => {
      navigate('/login');
    });
  }, [navigate]);

  return <>{children}</>;
};

export default AuthNavigationProvider;
