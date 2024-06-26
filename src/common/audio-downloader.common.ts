/* eslint-disable @typescript-eslint/no-explicit-any */
const download = (): void => {
  const audioElement = document.querySelector('audio') as HTMLAudioElement;

  if (audioElement) {
    // Adicionar listener para quando o áudio começar a tocar
    audioElement.addEventListener('play', (): void => {
      console.log('play event triggered');

      // Aguardar um pequeno atraso para garantir que o stream esteja ativo
      setTimeout(() => {
        const stream = (audioElement as any).captureStream();
        console.log('Stream captured:', stream);

        // Verificar se o stream possui tracks de áudio
        const audioTracks = stream.getAudioTracks();
        if (audioTracks.length === 0) {
          console.error('No audio tracks available in the stream');
          return;
        }
        console.log('Audio tracks:', audioTracks);

        // Verificar se MediaRecorder está disponível
        if (!window.MediaRecorder) {
          console.error('MediaRecorder is not supported in this browser.');
          return;
        }

        // Verificar se a trilha de áudio está ativa
        const audioTrack = audioTracks[0];
        if (audioTrack.readyState !== 'live') {
          console.error('Audio track is not live:', audioTrack.readyState);
          return;
        }

        const mediaRecorder = new MediaRecorder(stream);
        const chunks: BlobPart[] = [];

        mediaRecorder.ondataavailable = (event: BlobEvent): void => {
          console.log('Data available', event);
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorder.onstop = (): void => {
          console.log('Recording stopped');
          const blob = new Blob(chunks, { type: 'audio/wav' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'recorded_audio.wav';
          document.body.appendChild(link);
          link.click();
          console.log('link:', link);
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url); // Libera o objeto URL
        };

        console.log('Recording started');
        try {
          mediaRecorder.start();
        } catch (error) {
          console.error('Failed to start MediaRecorder:', error);
        }

        audioElement.addEventListener('ended', (): void => {
          console.log('Recording ended');
          mediaRecorder.stop();
        });

        audioElement.addEventListener('pause', (): void => {
          console.log('Recording paused');
          mediaRecorder.stop();
        });
      }, 100); // Aguardar 1 segundo para garantir que o stream esteja ativo
    });

    // Iniciar a reprodução do áudio
    console.log('Playing audio');
    audioElement.play();
  } else {
    console.error('Nenhum elemento de áudio encontrado.');
  }
};

// Chame a função de download para iniciar o monitoramento
download();

// Abaixo como reproduzir audio do gpt, o primeiro index 0 vira o ultimo elemento encontrado, já o segundo permanece o mesmo, porém deve ter 4 ocorrências de botões
// document.querySelectorAll('.relative.flex.w-full.min-w-0.flex-col.agent-turn:last-of-type')[0].querySelectorAll('button.text-token-text-secondary')[0].click()

/*
  -- Algoritmo para pegar o texto do chat, neste retorno é possível remover as tags <pre> que contém os blocos de código

  document.querySelectorAll('.relative.flex.w-full.min-w-0.flex-col.agent-turn:last-of-type')[7].querySelector('.items-start').querySelector('.markdown').children.filter((el) => el.tagName !== 'PRE').map((el) => el.innerText).join('\n')
*/
