import React, { lazy, useContext } from 'react';

import { Routes } from '@/enums/routes';
import { AppContext } from '@/providers/AppProvider';

const Preload = lazy(() => import('@/pages/Preload'));
const MainMenu = lazy(() => import('@/pages/MainMenu'));
const Game = lazy(() => import('@/pages/Game'));
const GameOver = lazy(() => import('@/pages/GameOver'));

export const AppRoutes = () => {
  const { route } = useContext(AppContext);

  switch (route) {
    case Routes.Preload:
      return <Preload />;
    case Routes.MainMenu:
      return <MainMenu />;
    case Routes.Game:
      return <Game />;
    case Routes.GameOver:
      return <GameOver />;
    default:
      return <React.Fragment />;
  }
};
