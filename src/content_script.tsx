import React from 'react';
import { createRoot } from 'react-dom/client';
import { PlayerProvider } from './context/player.context';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import DraggableCardComponent from './component/draggable-card.component';
import ActionMenuComponent from './component/action-menu.component';
import { ConfigEnum } from './enum/config.enum';

window.onload = () => {
  const reactAppWrapper = document.createElement('div');
  document.body.appendChild(reactAppWrapper);
  const root = createRoot(reactAppWrapper);
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <PlayerProvider>
          <div>
            <DraggableCardComponent title={`${ConfigEnum.PROJECT_NAME} - ${ConfigEnum.VERSION}`}>
              <ActionMenuComponent />
            </DraggableCardComponent>
          </div>
        </PlayerProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};
