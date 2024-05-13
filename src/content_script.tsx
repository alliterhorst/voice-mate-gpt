import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { PlayerProvider } from './context/player.context';
import { OptionProvider } from './context/option.context';
import { theme } from './theme/theme';
import DraggableCardComponent from './component/draggable-card.component';
import ActionMenuComponent from './component/action-menu.component';
import ConfigEnum from './enum/config.enum';

window.onload = () => {
  const reactAppWrapper = document.createElement('div');
  document.body.appendChild(reactAppWrapper);
  const root = createRoot(reactAppWrapper);
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <OptionProvider>
          <PlayerProvider>
            <div>
              <DraggableCardComponent title={`${ConfigEnum.PROJECT_NAME} - ${ConfigEnum.VERSION}`}>
                <ActionMenuComponent />
              </DraggableCardComponent>
            </div>
          </PlayerProvider>
        </OptionProvider>
      </ThemeProvider>
    </React.StrictMode>,
  );
};
