import React from 'react';
import MenuPlayerComponent from './component/menu-player.component';
import { createRoot } from 'react-dom/client';
import { PlayerProvider } from './context/player.context';

window.onload = () => {
  const reactAppWrapper = document.createElement('div');
  document.body.appendChild(reactAppWrapper);
  const root = createRoot(reactAppWrapper);
  root.render(
    <React.StrictMode>
      <PlayerProvider>
        <MenuPlayerComponent />
      </PlayerProvider>
    </React.StrictMode>
  );
};
