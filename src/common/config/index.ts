import { toast } from 'react-toastify';

import { env } from '../util/environment.util';

export const appConfig = {
  avatarUrls: [
    `${env(`REACT_APP_API_BASE_PATH`)}/ava/m1.svg`,
    `${env(`REACT_APP_API_BASE_PATH`)}/ava/m2.svg`,
    `${env(`REACT_APP_API_BASE_PATH`)}/ava/m3.svg`,
    `${env(`REACT_APP_API_BASE_PATH`)}/ava/m4.svg`,
    `${env(`REACT_APP_API_BASE_PATH`)}/ava/m5.svg`,
    `${env(`REACT_APP_API_BASE_PATH`)}/ava/m6.svg`,
    `${env(`REACT_APP_API_BASE_PATH`)}/ava/m7.svg`,
    `${env(`REACT_APP_API_BASE_PATH`)}/ava/m8.svg`,
    `${env(`REACT_APP_API_BASE_PATH`)}/ava/m9.svg`,
    `${env(`REACT_APP_API_BASE_PATH`)}/ava/m10.svg`,
    `${env(`REACT_APP_API_BASE_PATH`)}/ava/m11.svg`,
    `${env(`REACT_APP_API_BASE_PATH`)}/ava/m12.svg`,
  ],
  bitcoinFractionDigits: 8,
  multiplierFractionDigits: 4,
  toastAutoCloseDuration: 1000,
  toastHideProgressbar: true,
  toastPosition: toast.POSITION.BOTTOM_LEFT,
  apiBasePath: env('REACT_APP_API_BASE_PATH'),
  apiBasePathWS: env('REACT_APP_API_BASE_PATH_WS'),
  reCaptchaSiteKey: env('REACT_APP_RECAPTCHA'),
  reduceMotion: /true/i.test(env('REACT_APP_REDUCE_MOTION')),
  blockchainExplorerUrl: env('REACT_APP_BLOCKCHAIN_EXPLORER_URL'),
  goalsGameTimeout: 3000,
  goalsGameTransitionTime: 300,
  clamsGameTimeout: 1000,
  clamsGameTransitionTime: 300,
  diceGameTimeout: 1000,
  diceGameDiamondTransitionTime: 300,
  mineGameTimeout: 3000,
  mineGameDiamondTransitionTime: 300,
  defaultBetAmount: isNaN(parseFloat(env('REACT_APP_BET_DEFAULT_AMOUNT')))
    ? 0
    : parseFloat(env('REACT_APP_BET_DEFAULT_AMOUNT')),
  toastShowTime: parseInt(env('REACT_APP_TOAST_SHOW_TIME')),
  diceMultiplierPrecision: parseInt(env('REACT_APP_DICE_MULTIPLIER_PRECISION')),
  clamsMultiplierPrecision: parseInt(env('REACT_APP_CLAMS_MULTIPLIER_PRECISION')),
  goalsMultiplierPrecision: parseInt(env('REACT_APP_GOALS_MULTIPLIER_PRECISION')),
  minesMultiplierPrecision: parseInt(env('REACT_APP_MINES_MULTIPLIER_PRECISION')),
};
