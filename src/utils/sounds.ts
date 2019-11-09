import {ChildProcess} from 'child_process';

const player = require('play-sound')({});

interface PlayableSound {
  playBlockFreezeSound: () => ChildProcess;
  playBackgroundMusic: () => ChildProcess;
  playRowClearSound: () => ChildProcess;
  playTetrisSound: () => ChildProcess;
}

const AudioService = (function() {
  let instance: PlayableSound | null;

  function init() {
    return {
      playBackgroundMusic: () =>
        player.play('./assets/tetris_theme.mp3', (err: Error) => {
          if (err) throw err;
        }),
      playBlockFreezeSound: () =>
        player.play('./assets/freeze_block.wav', (err: Error) => {
          if (err) throw err;
        }),
      playRowClearSound: () =>
        player.play('./assets/row_clear.wav', (err: Error) => {
          if (err) throw err;
        }),
      playTetrisSound: () =>
        player.play('./assets/tetris_sound.wav', (err: Error) => {
          if (err) throw err;
        }),
    };
  }
  return {
    getInstance: function() {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();

export default AudioService;
