import React from 'react';
import MenuPlayerComponent from './component/menu-player.component';
import { createRoot } from 'react-dom/client';
import { PlayerProvider } from './context/player.context';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import DraggableCard from './component/draggable-card.component';
import { ActionButton } from './style/action-button.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

window.onload = () => {
  const reactAppWrapper = document.createElement('div');
  document.body.appendChild(reactAppWrapper);
  const root = createRoot(reactAppWrapper);
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <PlayerProvider>
          <div>
            <MenuPlayerComponent />
            <DraggableCard title="Voice Mate GPT - v1.0.7">
              <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'space-evenly' }}>
                <ActionButton>
                  <FontAwesomeIcon icon={faMicrophone} style={{ width: '16px' }} />
                </ActionButton>
                <ActionButton>p</ActionButton>
                <ActionButton />
                <ActionButton />
              </div>
            </DraggableCard>
          </div>
        </PlayerProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};
