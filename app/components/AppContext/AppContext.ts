/* eslint @typescript-eslint/no-empty-function: 0 */
'use client';

import { createContext, useContext } from 'react';

interface AppContextInt {
  weapon: string;
  addWeapon: (weapon: string) => void;
  health: number;
  setHealth: (health: number) => void;
  getFate: string[];
  setFate: (fate: string[]) => void;
}

export const AppContext = createContext<AppContextInt>({
  weapon: '',
  addWeapon(weapon) {},
  health: 0,
  setHealth(health) {},
  getFate: [],
  setFate(fate) {},
});

export const useAppContext = () => useContext(AppContext);
