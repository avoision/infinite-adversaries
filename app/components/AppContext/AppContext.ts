'use client';

import { createContext, useContext } from 'react';

interface AppContextInt {
  weapon: string;
  addWeapon: (weapon: string) => void;
}

export const AppContext = createContext<AppContextInt>({
  weapon: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addWeapon(weapon){},
})

export const useAppContext = () =>useContext(AppContext)