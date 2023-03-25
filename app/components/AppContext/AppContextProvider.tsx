'use client';
import React, { ReactNode, useState } from 'react';
import { AppContext } from './AppContext';

interface AppContextProps {
  children: ReactNode;
}

const AppContextProvider = ({ children }: AppContextProps) => {
  const [weapon, setWeapon] = useState('');

  const addWeapon = (weapon: string) => {
    setWeapon(weapon);
  };

  return (
    <AppContext.Provider
      value={{
        weapon,
        addWeapon,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
