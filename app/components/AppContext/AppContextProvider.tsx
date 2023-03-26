'use client';
import React, { ReactNode, useState } from 'react';
import { AppContext } from './AppContext';

interface AppContextProps {
  children: ReactNode;
}

const AppContextProvider = ({ children }: AppContextProps) => {
  const [weapon, setWeapon] = useState('');
  const [getCharacterHealth, setCharacterHealth] = useState(100);
  const [getFatalOutcome, setFatalOutcome] = useState<string[]>([]);

  const addWeapon = (weapon: string) => {
    setWeapon(weapon);
  };

  const setHealth = (health: number) => {
    setCharacterHealth(health);
  };

  const setFate = (fate: string[]) => {
    setFatalOutcome(fate);
  };

  return (
    <AppContext.Provider
      value={{
        weapon,
        addWeapon,
        health: getCharacterHealth,
        setHealth,
        getFate: getFatalOutcome,
        setFate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
