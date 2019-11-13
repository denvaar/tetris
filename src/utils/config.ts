const fs = require('fs');
const os = require('os');

interface IConfigService {
  getConfig: () => GameConfig;
  resumePausedGame: () => GameState | null;
  saveState: (state: GameState) => void;
  updateHighScore: (score: number) => void;
}

const ConfigService = (function() {
  let instance: IConfigService;

  function init() {
    return {
      getConfig: (): GameConfig => {
        const defaultConfig = {
          controls: {
            left: 'h',
            right: 'l',
            down: 'j',
            hardDrop: 'space',
            rotate: 'r',
            saveBlock: 's',
          },
          highScore: 0,
          musicEnabled: false,
          soundEffectsEnabled: true,
          pauseDataFile: '/tmp/tetris',
        };
        try {
          return {
            ...defaultConfig,
            ...JSON.parse(fs.readFileSync(`${os.homedir()}/.tetris.json`)),
          };
        } catch (err) {
          return defaultConfig;
        }
      },
      resumePausedGame: (): GameState | null => {
        const config = instance.getConfig();
        try {
          const pausedData = fs.readFileSync(config.pauseDataFile);
          fs.writeFileSync(config.pauseDataFile, '');

          if (pausedData === '') {
            return null;
          }

          return JSON.parse(pausedData);
        } catch (err) {
          return null;
        }
      },
      saveState: (state: GameState): void => {
        state.prevScreen = null;
        fs.writeFileSync(
          instance.getConfig().pauseDataFile,
          JSON.stringify(state),
        );
      },
      updateHighScore: (highScore: number): void => {
        fs.writeFileSync(
          `${os.homedir()}/.tetris.json`,
          JSON.stringify({...instance.getConfig(), highScore}),
        );
      },
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

export default ConfigService;
