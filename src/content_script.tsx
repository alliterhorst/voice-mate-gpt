import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { PlayerProvider } from './context/player.context';
import { OptionProvider } from './context/option.context';
import { theme } from './theme/theme';
import DraggableCardComponent from './component/draggable-card.component';
import ActionMenuComponent from './component/action-menu.component';
import ConfigEnum from './enum/config.enum';
import { SpeechRecognitionProvider } from './context/speech-recognition.context';
import MainService from './service/main.service';

const mainService = new MainService();
window.VoiceMateGPT = mainService.VoiceMateGPT;

function initializeVoiceMateGPT(): void {
  let reactAppWrapper = document.getElementById('voice-mate-gpt-wrapper');
  if (!reactAppWrapper) {
    reactAppWrapper = document.createElement('div');
    reactAppWrapper.id = 'voice-mate-gpt-wrapper';
    document.body.appendChild(reactAppWrapper);
  }

  const root = createRoot(reactAppWrapper);
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <OptionProvider>
          <PlayerProvider>
            <SpeechRecognitionProvider>
              <div>
                <DraggableCardComponent
                  title={`${ConfigEnum.PROJECT_NAME} - ${ConfigEnum.VERSION}`}
                >
                  <ActionMenuComponent />
                </DraggableCardComponent>
              </div>
            </SpeechRecognitionProvider>
          </PlayerProvider>
        </OptionProvider>
      </ThemeProvider>
    </React.StrictMode>,
  );
}

mainService.VoiceMateGPT.DOMManipulationService.whenHydrationCompleted(initializeVoiceMateGPT);
