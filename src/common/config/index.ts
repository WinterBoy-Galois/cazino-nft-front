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
  toastAutoCloseDuration: 5000,
  toastHideProgressbar: true,
  toastPosition: toast.POSITION.BOTTOM_LEFT,
  apiBasePath: env('REACT_APP_API_BASE_PATH'),
  apiBasePathWS: env('REACT_APP_API_BASE_PATH_WS'),
  reCaptchaSiteKey: env('REACT_APP_RECAPTCHA'),
  reduceMotion: /true/i.test(env('REACT_APP_REDUCE_MOTION')),
  blockchainExplorerUrl: env('REACT_APP_BLOCKCHAIN_EXPLORER_URL'),
  diceGameTimeout: 1000,
  diceGameDiamondTransitionTime: 300,
};
